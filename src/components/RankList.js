import React, { memo, useEffect, useState } from "react";
import { List } from "./";

const RankList = ({ data }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);

  // useEffect được thực thi khi isShowFull, data thay đổi (dùng việc người dùng nhấn vào button là xem tất cả hay ẩn bớt)
  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((i, index) => index < 10));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);

  return (
    <div className="w-full">
      {songs?.map((item, index) => (
        <List
          songData={item}
          key={item.encodeId}
          isHideNode
          order={index + 1}
        />
      ))}
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          className="px-6 my-4 py-2 border border-[#0e8080] rounded-l-full rounded-r-full text-main-500 text-sm hover:text-white hover:bg-main-500"
          onClick={() => setIsShowFull((prev) => !prev)}
        >
          {isShowFull ? "Ẩn bớt" : "Xem tất cả"}
        </button>
      </div>
    </div>
  );
};

export default memo(RankList);
