import actionTypes from "../actions/actionTypes";

// State ban đầu của app được quản lý bằng redux store
const initState = {
  banner: [],
  chill: {}, // state lưu playlist chill 😀
  positiveEnergy: {},
  top100: {},
  trendingArtist: {},
  newMusic: [],
  isLoading: false, // state lưu giá trị true hoặc false cho loading data
  newRelease: {},
  weekChart: [],
  albumHot: {},
  chart: {},
  rank: [],
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
        positiveEnergy:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        trendingArtist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        // newMusic:
        //   {
        //     ...action.homeData?.find((item) => item.sectionId === "hAlbum"),
        //     title: "Nhạc mới",
        //   } || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || [],
        albumHot:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          {},
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          [],
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
