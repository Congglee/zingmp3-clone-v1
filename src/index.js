import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reduxConfig from "./redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// Hàm reduxConfig được gọi để tạo store và Provider component từ thư viện react-redux được sử dụng để cung cấp store cho App component.
// Cuối cùng hiển thị App component bên trong Provider component với store được truyền dưới dạng props
const { store, persistor } = reduxConfig();

// PersistGate: delays quá trình rendering của app cho đến khi persisted state đc truy xuất và lưu vào redux

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
