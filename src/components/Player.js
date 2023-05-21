import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsFillPlayFill,
  BsPauseFill,
  CiShuffle,
} = icons;

const Player = () => {
  // Đối tượng Audio trong JS
  // Lưu trữ một tham chiếu tối đối tượng Audio bằng useRef trong biến audioEl
  const audioEl = useRef(new Audio());
  // console.log(audioEl); // <audio preload="auto"></audio>

  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);

      // res1: thông tin của bài hát
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }

      // res2: link, file nhạc của bài hát
      if (res2.data.err === 0) {
        // Đặt cho source có giá trị của key 128 (link nhạc) trong data
        setSource(res2.data.data["128"]);
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  // console.log(source);
  // Theo dõi sự thay đổi của curSongId và source
  // Khi một trong hai giá trị này thay đổi, useEffect sẽ cập nhật lại src của đối tượng Audio lưu trữ trong audioEl.current
  useEffect(() => {
    // Dừng audio
    audioEl.current.pause();

    // Set lại source cho audio
    audioEl.current.src = source;

    // Load source mới cho audio vừa set
    audioEl.current.load();

    // Nếu isPlaying là true chạy audio hiện tại đang lưu trữ
    if (isPlaying) audioEl.current.play();
  }, [curSongId, source]);

  const handleTogglePlayMusic = () => {
    // Nếu audio bài hát là true (đang phát) mà người dùng click vào
    if (isPlaying) {
      // Dừng audio lại
      audioEl.current.pause();

      // Đổi icon toggle play music
      dispatch(actions.play(false));
    } else {
      // Nếu audio bài hát là false (đang dừng) mà người dùng click vào

      // Chạy audio bài hát
      audioEl.current.play();

      // Đổi icon toggle play music
      dispatch(actions.play(true));
    }
  };

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>

      <div className="w-[40%] flex-auto border flex items-center justify-center gap-2 flex-col border-red-500 py-2">
        <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <CiShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border cursor-pointer border-gray-700 hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>

        <div>progress bar</div>
      </div>

      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
