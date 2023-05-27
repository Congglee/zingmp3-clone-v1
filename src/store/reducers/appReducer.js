import actionTypes from "../actions/actionTypes";

// State ban đầu của app được quản lý bằng redux store
const initState = {
  banner: [],
  chill: {}, // state lưu playlist chill 😀
};

// Định nghĩa một hàm reducer được gọi là appReducer.
// Reducer có hai tham số: state và action.
// Hàm reducer lấy state hiện tại và một action làm đối số của nó
// Reducer cũng import đối tượng actionTypes từ tệp actionTypes.js.

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      // Khi action Types.GET_HOME được dispatched, reducer sẽ cập nhật state bằng spread operator object state
      // Cập nhật thuộc tính banner, ... với homeData đã được chuyển vào trình tạo action

      // * Trang Home sẽ gồm nhiều playlist khác nhau
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        chill:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
      };

    default:
      return state;
  }
};

export default appReducer;
