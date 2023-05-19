import actionTypes from "./actionTypes";
import * as apis from "../../apis";

// Hàm tạo action setCurSongId
export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});
