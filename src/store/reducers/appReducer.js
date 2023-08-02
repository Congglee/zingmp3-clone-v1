import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  chill: {}, // state lưu playlist chill 😀
  positiveEnergy: {},
  remixDance: {},
  moodMeltSlowly: {},
  top100: {},
  trendingArtist: {},
  newMusic: [],
  isLoading: false, // state lưu giá trị true hoặc false cho loading data
  newRelease: {},
  weekChart: [],
  albumHot: {},
  chart: {},
  rank: [],
  singers: null,
  scrollTop: true, // state lưu giá trị ẩn hiện thanh header khi lăn chuột
  currentWidth: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
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
        remixDance:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        moodMeltSlowly:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        trendingArtist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
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
        singers:
          action.homeData?.find(
            (item) => item.sectionType === "newReleaseChart"
          )?.items || [],
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    case actionTypes.ZERO_SCROLLTOP:
      return {
        ...state,
        scrollTop: action.flag,
      };

    case actionTypes.CURRENT_WIDTH:
      return {
        ...state,
        currentWidth: action.w,
      };

    default:
      return state;
  }
};

export default appReducer;
