import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";

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

var intervalId;
const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio()); // Lưu trữ source để phát nhạc
  const [curSecond, setCurSecond] = useState(0);
  const dispatch = useDispatch();

  // Lưu trữ một tham chiếu tới một đối tượng DOM bằng useRef hook
  const thumbRef = useRef(); // thumbRef === <div ref={thumbRef} className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"></div>

  // useEffect được thực thị khi curSongId thay đổi (gọi api để lấy ra thông tin bài hát và source của bài hát đó)
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
        // Dừng audio đang phát
        audio.pause();

        // set cho audio hiện tại bằng source trong res2.data.data["128"]
        // do api cung cấp trả về là đối tượng có key là 128 nên sẽ phải sử dụng bracket notation để truy cập
        setAudio(new Audio(res2.data.data["128"]));
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  // useEffect được thực thi khi isPlaying bị thay đổi (dùng cho việc làm cho thanh progress bar thumbRef và số giây chạy theo thời lượng bài hát đang phát)
  useEffect(() => {
    // Nếu isPlaying là true (nhạc đang được phát)
    if (isPlaying) {
      // gán intervalId bằng setInterval cho chạy một lần mỗi 0.2s
      intervalId = setInterval(() => {
        // Mỗi lần chạy thì tính số phần trăm percent để lấy ra giá trị của thuộc tính right trong CSS làm cho thanh progress bar thumbRef chạy
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;

        // Đặt lại thời gian hiện tại bằng audio.currentTime
        setCurSecond(Math.round(audio.currentTime));
      }, 200);
    } else {
      intervalId && clearInterval(intervalId);
    }
    // console.log(intervalId);
  }, [isPlaying]);

  // useEffect được thực thi khi audio bị thay đổi (dùng cho việc load source audio để phát nhạc mỗi khi audio bị thay đổi)
  useEffect(() => {
    // Load source audio
    audio.load();

    // Nếu isPlaying là true chạy audio hiện tại
    if (isPlaying) audio.play();
  }, [audio]);

  const handleTogglePlayMusic = () => {
    // Nếu audio bài hát là true (đang phát) mà người dùng click vào
    if (isPlaying) {
      // Dừng audio lại
      audio.pause();

      // Đổi icon toggle play music
      dispatch(actions.play(false));
    } else {
      // Nếu audio bài hát là false (đang dừng) mà người dùng click vào

      // Chạy audio bài hát
      audio.play();

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

        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSecond * 1000).format("mm:ss")}</span>
          <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>

      <div className="w-[30%] flex-auto border border-red-500">Volume</div>
    </div>
  );
};

export default Player;
