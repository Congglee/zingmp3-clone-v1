import appReducer from "./appReducer";
import { combineReducers } from "redux";

// Định nghĩa một hàm reducer gốc được gọi là rootReducer.
//  Hàm reducer gốc import appReducer từ tệp appReducer.js và sử dụng hàm combineReducers từ thư viện redux để kết hợp tất cả các reducer trong ứng dụng thành một bộ reducer duy nhất.
// Trong trường hợp này, chỉ có một reducer (appReducer) nên nó là bộ duy nhất được kết hợp.
const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
