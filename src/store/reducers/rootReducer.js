import appReducer from "./appReducer";
import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Trong Redux, stateReconciler là một đối số tùy chọn mà có thể chuyển đến hàm persistCombineReducers từ thư viện redux-persist. Mục đích của nó là chỉ định cách hợp nhất state được lưu trữ trong lớp lưu trữ liên tục (persist) với state ban đầu của Redux store

/*
  Có ba tùy chọn cho stateReconciler:
    - autoMergeLevel1: Đây là tùy chọn mặc định và nó sẽ hợp nhất nông (shallow merge) state liên tục (persisted state) (cấp 1) với state hiện tại. Nó chỉ hợp nhất các thuộc tính cấp cao nhất và không hợp nhất các đối tượng lồng nhau.

    - autoMergeLevel2: Tùy chọn này sẽ hợp nhất sâu (deep merge) state được duy trì (cấp 2) với state hiện tại. Nó hợp nhất các thuộc tính cấp cao nhất và hợp nhất đệ quy các đối tượng lồng nhau.

    - hardSet: Tùy chọn này sẽ ghi đè toàn bộ state bằng state liên tục (persisted state), bỏ qua state hiện tại.
*/

// Config cho tất cả các reducer
const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// Config cho riêng music reducer
const musicConfig = {
  ...commonConfig,
  key: "music",
  whitelist: ["curSongId"],
};

// Định nghĩa một hàm reducer gốc được gọi là rootReducer.
//  Hàm reducer gốc import appReducer từ tệp appReducer.js và sử dụng hàm combineReducers từ thư viện redux để kết hợp tất cả các reducer trong ứng dụng thành một bộ reducer duy nhất.
const rootReducer = combineReducers({
  app: appReducer,

  // persistReducer(config, reducer): trả về một reducer nâng cao cho riêng persist state
  // - config object: key, storage, whitelist, blacklist, version, stateReconciler, ...
  // - reducer function
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
