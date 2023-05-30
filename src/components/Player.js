import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import LoadingSong from "./LoadingSong";

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
  TbRepeatOnce,
  BsMusicNoteList,
  SlVolume1,
  SlVolumeOff,
  SlVolume2,
} = icons;

var intervalId;
const Player = ({ setIsShowRightSideBar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null); // Lưu thông tin bài hát
  const [audio, setAudio] = useState(new Audio()); // Lưu trữ source để phát nhạc
  const [curSeconds, setCurSeconds] = useState(0); // Lưu thời gian hiện tại của audio trong progressbar
  const [isShuffle, setIsShuffle] = useState(false); // Lưu trữ giá trị để handle việc bật tắt button shuffle
  const [repeatMode, setRepeatMode] = useState(0); // Lưu trữ giá trị để handle việc bật tắt button repeat
  const [isLoadedSource, setIsLoadedSource] = useState(true); // Lưu trữ giá trị để handle hiển thị loading icon khi source đang nạp
  const [volume, setVolume] = useState(100); // Handle volume audio
  const dispatch = useDispatch();

  // Lưu trữ một tham chiếu tới một đối tượng DOM bằng useRef hook
  const thumbRef = useRef(); // thumbRef === <div ref={thumbRef} className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"></div>
  const trackRef = useRef();

  // useEffect được thực thị khi curSongId thay đổi (gọi api để lấy ra thông tin bài hát và source của bài hát đó)
  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false); // isLoadedSource === false khi việc gọi api đang chạy
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true); // Giá trị true === true khi việc gọi api đã hoàn thành
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
      } else {
        audio.pause();

        // Trường hợp link, source nhạc bị lỗi (cần tài khoản vip, pri, ...)
        setAudio(new Audio()); // Đặt lại audio là rỗng
        dispatch(actions.play(false)); // Đổi lại button play là false

        toast.warn(res2.data.msg); // Hiển thị cảnh báo bằng thư viện toast
        setCurSeconds(0); // Đặt thời gian progressbar về lại 0
        thumbRef.current.style.cssText = `right: 100%`; // Set progressbar đang chạy về lại điểm ban đầu
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  // useEffect được thực thi khi audio bị thay đổi (dùng cho việc load source audio để phát nhạc mỗi khi audio bị thay đổi, làm cho thanh progress bar thumbRef và số giây chạy theo thời lượng bài hát đang phát)
  useEffect(() => {
    // Nếu intervalId có tồn tại sau mỗi lần audio thay đổi thì sẽ xóa đi
    intervalId && clearInterval(intervalId);

    audio.pause();
    // Load source audio
    audio.load();

    // Nếu isPlaying là true chạy audio hiện tại
    if (isPlaying && thumbRef.current) {
      audio.play();

      // gán intervalId bằng setInterval cho chạy một lần mỗi 0.2s
      intervalId = setInterval(() => {
        // console.log(audio.currentTime);

        // Mỗi lần chạy thì tính số phần trăm percent để lấy ra giá trị của thuộc tính right trong CSS làm cho thanh progress bar thumbRef chạy
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;

        // Đặt lại thời gian hiện tại bằng audio.currentTime
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  // useEffect được thực thi khi audio, isShuffle, repeatMode bị thay đổi (dùng cho việc phát nhạc khi người dùng click vào một trong hai button shuffle, repeat hoặc cả hai)
  useEffect(() => {
    const handleEnded = () => {
      // Nếu isShuffle là true
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        // Nếu repeatMode === 1 thì gọi hàm handleRepeatOne (phát lại một bài hát) còn khác thì gọi hàm handleNextSong (phát lại playlist)
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        // Trường hợp người dùng không click vào button nào cả
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    // Thêm sự kiện ended cho audio, chỉ khi audio kết thúc mới thực thi hàm handleEnded
    audio.addEventListener("ended", handleEnded);

    // Loại bỏ sự kiện ended khi người dùng tắt hoặc out website
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  // useEffect được thực thị khi volume bị thay đổi (dùng cho việc điều chỉnh volume của audio)
  useEffect(() => {
    // audio.volume = 0 -> 1
    audio.volume = volume / 100;
  }, [volume]);

  // Xử lý button play music
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

  // Xử lý việc click vào thanh progress bar (tua bài hát)
  const handleClickProgressbar = (e) => {
    // console.log(e);
    // console.log(trackRef);

    const trackRect = trackRef.current.getBoundingClientRect(); // Lấy ra tọa độ của phần tử DOM mà trackRef tham chiếu tới

    // Tính ra số phần trăm khi người dùng click progressbar
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;

    // Set lại thumbRef (progressbar màu xanh)
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;

    // Set lại thời gian hiện tại của audio
    audio.currentTime = (percent * songInfo.duration) / 100;

    // Set lại thời gian của thanh progressbar
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  // Xử lý người dùng click vào button next song
  const handleNextSong = () => {
    // Nếu songs được lấy ra từ redux store tồn tại === true
    if (songs) {
      let currentSongIndex; // index của current song
      songs?.forEach((item, index) => {
        // Nếu encodeId của encodeId của các bài hát trong songs === với id của bài hát hiện tại => currentSongIndex = index
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      // Gửi 1 actions đến redux reducer id của bài hát hiện tại có index + 1 (bài hát nằm kế tiếp bài hát hiện tại)
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  // Xử lý người dùng click vào button previous song
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      // Gửi 1 actions đến redux reducer id của bài hát hiện tại có index - 1 (bài hát nằm trước bài hát hiện tại)
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  // Xử lý người dùng click vào button repeat one
  const handleRepeatOne = () => {
    audio.play();
  };

  // Xử lý người dùng click vào button shuffle
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;

    // Gửi 1 actions đến redux reducer id của bài hát được random
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
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

      <div className="w-[40%] flex-auto flex items-center justify-center gap-2 flex-col py-2">
        <div className="flex gap-8 justify-center items-center">
          <span
            className={`cursor-pointer ${
              isShuffle ? "text-purple-600" : "text-black"
            }`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border cursor-pointer border-gray-700 hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {/* Nếu isLoadedSoruce có giá trị là false sẽ khởi chạy component LoadingSong */}
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
            onClick={handleNextSong}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && "text-purple-600"}`}
            title="Bật phát lại tất cả"
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>

        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            className="w-3/5 h-[3px] hover:h-[8px] rounded-l-full cursor-pointer rounded-r-full relative bg-[rgba(0,0,0,0.1)]"
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>

      <div className="w-[30%] flex-auto flex items-center justify-end gap-4 ">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <SlVolume2 />
            ) : +volume === 0 ? (
              <SlVolumeOff />
            ) : (
              <SlVolume1 />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          onClick={() => setIsShowRightSideBar((prev) => !prev)}
          className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100"
        >
          <BsMusicNoteList size={20} />
        </span>
      </div>
    </div>
  );
};

export default Player;
