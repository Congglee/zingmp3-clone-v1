import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { AudioLoading, Lists } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultis/icons";

const { BsFillPlayFill } = icons;

const Album = () => {
  const location = useLocation();
  // console.log(location); // {pathname: '/album/Nhac-Chua-Buon-HIEUTHUHAI-Da-LAB-AMEE-Juky-San/ZWZBFW9C', search: '', hash: '', state: {playAlbum: true}, key: '5nw5fljc'}

  const { pid } = useParams();
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({});

  const dispatch = useDispatch();

  // useEffect thực thi khi pid thay đổi (dùng cho việc call api cho chi tiết danh sách playlist)
  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid));
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));

      const response = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false));
      if (response.data.err === 0) {
        setPlaylistData(response.data.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  // useEffect thực thi khi pid và playlistData thay đổi (dùng cho việc kiểm tra người dùng có click vào nút play khi hover vào playlist không)
  useEffect(() => {
    // Nếu playAlbum trong state tồn tại (người dùng có click vào button play khi hover vào playlist)
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1; // Lấy ra bài hát ngẫu nhiên
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  return (
    <>
      <div className="w-full h-[90px]"></div>
      <div className="flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center">
        <div className="flex-none w-1/4 flex flex-col items-center gap-2">
          <div className="w-full relative overflow-hidden">
            <img
              src={playlistData?.thumbnailM}
              alt="thumbnail"
              className={`w-full object-contain ${
                isPlaying
                  ? `rounded-full animate-rotate-center`
                  : `rounded-md animate-rotate-center-pause`
              } shadow-md`}
            />
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 text-white flex items-center justify-center ${
                isPlaying && `rounded-full`
              }`}
            >
              <span className="p-3 border border-white rounded-full">
                {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-[20px] font-bold text-gray-800">
              {playlistData?.title}
            </h3>
            <span className="flex gap-2 items-center text-gray-500 text-xs">
              <span>Cập nhật: </span>
              <span>
                {moment
                  .unix(playlistData?.contentLastUpdate)
                  .format("DD/MM/YYYY")}
              </span>
            </span>
            <span className="flex gap-2 items-center text-gray-500 text-xs">
              {playlistData?.artistsNames}
            </span>
            <span className="flex gap-2 items-center text-gray-500 text-xs">
              {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
            </span>
          </div>
        </div>

        <Scrollbars style={{ width: "100%", height: "80%" }}>
          <div className="flex-auto mb-40">
            <span className="text-sm">
              <span className="text-gray-600">Lời tựa </span>
              <span>{playlistData?.sortDescription}</span>
            </span>

            <Lists totalDuration={playlistData?.song?.totalDuration} />
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default Album;
