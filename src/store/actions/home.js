import actionTypes from "./actionTypes";
import * as apis from "../../apis";

// Một action bình thường sẽ chỉ trả về 1 object có type để gọi đến reducer xử lý công việc của action đó
// Để action có thể trả về 1 promise hay một hàm dispatch dùng cho việc gọi api thì sẽ sử dụng thư viện redux-thunk

// getHome(): hàm khởi tạo action, có nghĩa là tạo một đối tượng action để có thể gửi đến Redux store để cập nhật state của app, hàm trả về một hàm nhận phương thức dispatch làm đối số của nó.
export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();
    // Nếu response.data.err === 0 (gọi api thành công)
    if (response?.data.err === 0) {
      // handle when success

      // Sau khi gọi api thành công, dữ liệu response sẽ đc chuyển vào lệnh gọi hàm dispatch với type là actionTypes.GET_HOME và thuộc tính homeData chứa dữ liệu api trả về
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: response.data.data.items,
      });
    } else {
      // handle when fail
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      homeData: null,
    });
  }
};
