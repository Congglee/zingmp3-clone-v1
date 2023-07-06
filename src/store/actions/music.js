import actionTypes from "./actionTypes";
import * as apis from "../../apis";

// Hàm tạo action setCurSongId
// Xử lý thay đổi bài hát dựa vào id + phát bài hát đó
export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});

// Xử lý button toggle player music
export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

// Xử lý việc kiểm tra nhạc được phát có nằm trong album không
export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

// Xử lý việc kiểm tra nhạc được phát có nằm trong album/playlist không
export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

// Xử lý việc set lại data của bài hát hiện tại
export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});

// Xử lý việc set lại id của album hiện tại
export const setCurAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});

// Xử lý việc set lại data cho recentSongs
export const setRecent = (data) => ({
  type: actionTypes.SET_RECENT,
  data,
});

// Xử lý việc gọi api cho tìm kiếm
export const search = (keyword) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyword);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};
