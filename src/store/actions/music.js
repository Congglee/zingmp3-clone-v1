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

// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetDetailPlaylist(pid);
//     if (response.data.err === 0) {
//       dispatch({
//         type: actionTypes.PLAYLIST,
//         songs: response.data?.data?.song?.items,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAYLIST,
//       songs: null,
//     });
//   }
// };
