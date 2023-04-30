import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // useSelector(selector: Function, equalityFn?: Function): Một hook để truy cập state của Redux store. Hook này lấy một hàm selector làm đối số. Selector được gọi với state store.

  // Hook này lấy hàm so sánh đẳng thức tùy chọn làm tham số thứ hai cho phép bạn tùy chỉnh cách so sánh state đã chọn để xác định xem component có cần được re-render hay không.
  const { test, homeData } = useSelector((state) => state.app);
  console.log(test, homeData);

  return (
    <>
      <div className="">App</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
