import actionTypes from "../actions/actionTypes";

const initState = {
  homeData: [],
  test: "Hello World",
};

// Định nghĩa một hàm reducer được gọi là appReducer.
// Reducer có hai tham số: state và action.
// State ban đầu của reducer được định nghĩa là một đối tượng có hai thuộc tính: homeData và test.
// Reducer cũng import đối tượng actionTypes từ tệp actionTypes.js.
// Hàm reducer sử dụng câu lệnh switch để kiểm tra type hành action và trong trường hợp này, khi type action là GET_HOME, nó chỉ trả về state hiện tại.

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return state;

    default:
      return state;
  }
};

export default appReducer;
