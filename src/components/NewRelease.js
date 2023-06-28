import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActived, setIsActived] = useState(0);
  const [songs, setSongs] = useState([]);

  //  useEffect được thực thị khi isActived, newRelease bị thay đổi (dùng cho việc hiển thị danh sách bài hát VN hay quốc tế khi người dùng click vào button)
  useEffect(() => {
    // Nếu isActived tồn tại (người dùng có click vào button) thì đặt lại songs trong mảng newRelease

    isActived
      ? setSongs(newRelease?.items?.others) // Nếu isActived là true (isActived === 1) songs trong newRelease sẽ là của Việt Nam
      : setSongs(newRelease?.items?.vPop); // Nếu isActived là false (isActived === 0) songs trong newRelease sẽ là của Quốc tế
  }, [isActived, newRelease]);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newRelease?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>

      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${
            isActived === 0 && "bg-main-500 text-white"
          }`}
        >
          VIỆT NAM
        </button>

        <button
          type="button"
          onClick={() => setIsActived(1)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${
            isActived === 1 && "bg-main-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        {songs?.map((item) => (
          <div key={item.encodeId} className="w-[45%] min-[1024px]:w-[30%]">
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              sid={item.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
