import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// File này export một hàm reduxConfig để tạo Redux store. Nó import rootReducer từ ./store/reducers/rootReducer, các hàm createStore và applyMiddleware từ thư viện redux và middleware thunk. Hàm reduxConfig tạo store bằng cách sử dụng hàm createStore và chuyển vào rootReducer và applyMiddleware(thunk) làm đối số. Sau đó nó trả về store.

const reduxConfig = () => {
  // createStore(reducer, [preloadedState], [enhancer]): Tạo một Redux store chứa cây state hoàn chỉnh của ứng dụng. Chỉ nên có một store duy nhất trong ứng dụng.
  // - reducer: Một hàm reducer trả về cây state tiếp theo, dựa trên cây state hiện tại và một action để xử lý.

  // - [preloadedState]: State ban đầu. Nếu bạn đã tạo reducer bằng combineReducers, đây phải là một đối tượng đơn giản có cùng hình dạng với các key được truyền cho nó. Nếu không, bạn có thể tự do chuyển bất kỳ thứ gì mà trình rút gọn của bạn có thể hiểu được.

  // - [enhancer]: Trình tăng cường store. Bạn có thể tùy chọn chỉ định nó để cải thiện store với các khả năng của bên thứ ba như middleware, tính bền vững, v.v. Công cụ cải thiện store duy nhất đi kèm với Redux là applyMiddleware().
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default reduxConfig;
