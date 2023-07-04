import actionTypes from "../actions/actionTypes";

// State khởi tạo ban đầu trong redux store
const initState = {
  curSongId: null, // state lưu id của bài hát hiện tại
  curSongData: null, // state lưu data của bài hát hiện tại
  isPlaying: false, // state lưu trạng thái của bài hát hiện tại (đang phát hay không phát)
  atAlbum: false,
  songs: null,
  curAlbumId: null, // state lưu id của album hiện tại
  recentSongs: [],
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };

    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };

    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };

    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };

    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };

    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.pid || null,
      };

    case actionTypes.SET_RECENT:
      let songs = state.recentSongs;
      if (action.data) {
        // Nếu action.data = true (nếu từ react có dispatch một actions.data)
        if (state.recentSongs?.some((i) => i.sid === action.data.sid)) {
          // Nếu recentSongs trong state có sid của item nào trong mảng === sid của action.data từ react app dispatch đến
          songs = songs.filter((i) => i.sid !== action.data.sid); // set lại songs bằng một mảng có các phần tử có sid khác với sid của action.data
        }
        if (songs.length > 19) {
          // Nếu độ dài của mảng songs lớn hơn 19 (chỉ lưu 20 bài hát trong localeStorage)

          // self = songs
          songs = songs.filter((i, index, self) => index !== self.length - 1); // set lại mảng songs chứa các phần tử có index khác với độ dài của mảng songs ==> index = 20 !== self.length = 19
        }
        songs = [action.data, ...songs]; // data tử action gửi từ dispatch được đưa lên đầu mảng
      }
      return {
        ...state,
        recentSongs: songs,
      };

    default:
      return state;
  }
};

export default musicReducer;
