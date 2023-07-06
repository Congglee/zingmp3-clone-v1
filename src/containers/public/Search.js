import React from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
  return (
    <div>
      <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pb-1 pl-[60px]">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center">
          <span className="px-4 hover:text-main-500 font-semibold cursor-pointer uppercase">
            Tất cả
          </span>
          <span className="px-4 hover:text-main-500 font-semibold cursor-pointer uppercase">
            BÀI HÁT
          </span>
          <span className="px-4 hover:text-main-500 font-semibold cursor-pointer uppercase">
            PLAYLIST/ALBUM
          </span>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
