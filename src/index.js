import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reduxConfig from "./redux";
import { BrowserRouter } from "react-router-dom";

// Hàm reduxConfig được gọi để tạo store và Provider component từ thư viện react-redux được sử dụng để cung cấp store cho App component.
// Cuối cùng hiển thị App component bên trong Provider component với store được truyền dưới dạng props
const store = reduxConfig();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
