import appReducer from "./appReducer";
import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Config cho tất cả các reducer
const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// Config cho riêng music reducer
const musicConfig = {
  ...commonConfig,
  key: "music",
  whitelist: ["curSongId", "curSongData", "curAlbumId", "recentSongs"],
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
