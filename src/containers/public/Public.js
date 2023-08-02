import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Player,
  SidebarLeft,
  SidebarRight,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const Public = () => {
  const [isShowRightSideBar, setIsShowRightSideBar] = useState(true); // Lưu trữ giá trị handle việc ẩn hiện right sidebar
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const { curSongId } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  const handleScrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(actions.zeroScrollTop(true));
    } else {
      dispatch(actions.zeroScrollTop(false));
    }
  };

  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300 font-Inter">
      <div className="w-full h-full flex flex-auto">
        <div className="min-[1024px]:w-[240px] w-[70px] h-full flex-none">
          <SidebarLeft />
        </div>

        <div className="flex-auto relative flex flex-col">
          {/* Nếu isLoading là true thì chạy component <Loading /> */}
          {isLoading && (
            <div className="absolute top-0 bottom-0 z-20 left-0 right-0 bg-main-200 flex items-center justify-center">
              <Loading />
            </div>
          )}

          <div
            className={`fixed h-[70px] ${
              scrollTop ? "bg-transparent" : "bg-main-300"
            } top-0 left-[240px] ${
              isShowRightSideBar ? "1400:right-[329px] right-0" : "right-0"
            } px-[59px] z-30 flex items-center`}
          >
            <Header />
          </div>

          <div className="flex-auto w-full">
            <Scrollbars
              onScroll={handleScrollTop}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <Outlet />
              <div className="h-[120px] w-full"></div>
            </Scrollbars>
          </div>
        </div>

        {isShowRightSideBar && (
          <div className="w-[329px] bg-main-400 absolute right-0 top-0 bottom-0 z-40 1400:flex h-screen flex-none border">
            <SidebarRight />
          </div>
        )}
      </div>

      {curSongId && (
        <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
          <Player setIsShowRightSideBar={setIsShowRightSideBar} />
        </div>
      )}
    </div>
  );
};

export default Public;
