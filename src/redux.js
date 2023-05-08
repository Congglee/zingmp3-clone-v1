import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

/*
  redux.js export một hàm reduxConfig để tạo Redux store. Nó import rootReducer từ ./store/reducers/rootReducer, các hàm createStore và applyMiddleware từ thư viện redux và middleware thunk. Hàm reduxConfig tạo store bằng cách sử dụng hàm createStore và chuyển vào rootReducer và applyMiddleware(thunk) làm đối số. Sau đó nó trả về store.
*/

const reduxConfig = () => {
  /*
  createStore(reducer, [preloadedState], [enhancer]): Tạo một Redux store chứa state tree hoàn chỉnh của app. Nên chỉ có một store duy nhất trong app.
  - reducer: Một hàm reducer trả về state tree tiếp theo, dựa trên state trê hiện tại và một action để xử lý.
  
  - [preloadedState]: State ban đầu. Nếu đã tạo reducer bằng combineReducers, đây phải là một đối tượng đơn giản có cùng hình dạng với các key được truyền cho nó. Nếu không, có thể tự do chuyển bất kỳ thứ gì mà reducer có thể hiểu được.
  
  - [enhancer]: Trình tăng cường store. Có thể tùy chọn chỉ định nó để cải thiện store với các khả năng của bên thứ ba như middleware, tính bền vững (persist), v.v. Công cụ cải thiện store duy nhất đi kèm với Redux là applyMiddleware().
  */

  const store = createStore(rootReducer, applyMiddleware(thunk));

  // persistStore: Khởi tạo một persisted store dùng để lưu trữ lâu dài. Hàm này nhận một Redux store và một đối tượng cấu hình (config object), có thể bao gồm các tùy chọn như hệ thống lưu trữ sẽ sử dụng, phương thức tuần tự hóa (serialization method) và state reconciler.
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxConfig;
