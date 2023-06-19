import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";

const SongItem = ({ thumbnail, title, artists, sid, releaseDate }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="w-[45%] min-[1024px]:w-[30%] flex-auto flex p-[10px] gap-[10px] hover:bg-main-200 rounded-md cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
      }}
    >
      <img
        src={thumbnail}
        alt="thumbnail"
        className="w-[60px] h-[60px] object-cover rounded-md"
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-gray-700">{artists}</span>
        <span className="text-xs text-gray-700">
          {moment(releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItem);
