import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../ultis/fn";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "./";
import icons from "../ultis/icons";

const { MdArrowBackIosNew, MdArrowForwardIos } = icons;

var intervalId;
const Slider = () => {
  // useSelector(selector: Function, equalityFn?: Function): Một hook để truy cập state của Redux store. Hook này lấy một hàm selector làm đối số. Selector được gọi với state store.

  // Hook này lấy hàm so sánh đẳng thức tùy chọn làm tham số thứ hai cho phép bạn tùy chỉnh cách so sánh state đã chọn để xác định xem component có cần được re-render hay không.
  // useSelector((state) => {
  //   console.log(state.app);
  // });

  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [step, setStep] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2);
  const [isAuto, setIsAuto] = useState(true);

  // Handle slick-slider
  //  firstuseEffect(() => {
  //   const sliderEls = document.getElementsByClassName("slider-item");
  //   let min = 0;
  //   let max = 2;
  //   const intervalId = setInterval(() => {
  //     const list = getArrSlider(min, max, sliderEls.length - 1);
  //     console.log(list);

  //     for (let i = 0; i < sliderEls.length; i++) {
  //       // Delete classnames (CSS)
  //       sliderEls[i]?.classList?.remove(
  //         "animate-slide-right",
  //         "order-last",
  //         "z-20"
  //       );
  //       sliderEls[i]?.classList?.remove(
  //         "animate-slide-left",
  //         "order-first",
  //         "z-10"
  //       );
  //       sliderEls[i]?.classList?.remove(
  //         "animate-slide-left2",
  //         "order-2",
  //         "z-10"
  //       );

  //       // Hide or Show images
  //       if (list.some((item) => item === i)) {
  //         sliderEls[i].style.cssText = "display: block";
  //       } else {
  //         sliderEls[i].style.cssText = "display: none";
  //       }
  //     }

  //     // Add animation by adding classnames
  //     list.forEach((item) => {
  //       if (item === max) {
  //         sliderEls[item]?.classList?.add(
  //           "animate-slide-right",
  //           "order-last",
  //           "z-20"
  //         );
  //       } else if (item === min) {
  //         sliderEls[item]?.classList?.add(
  //           "animate-slide-left",
  //           "order-first",
  //           "z-10"
  //         );
  //       } else {
  //         sliderEls[item]?.classList?.add(
  //           "animate-slide-left2",
  //           "order-2",
  //           "z-10"
  //         );
  //       }
  //     });

  //     min = min === sliderEls.length - 1 ? 0 : min + 1;
  //     max = max === sliderEls.length - 1 ? 0 : max + 1;

  //     // console.log(list);
  //   }, 2000);

  //   return () => {
  //     intervalId && clearInterval(intervalId);
  //   };
  // }, []);

  useEffect(() => {
    // let min = 0;
    // let max = 2;
    // let initialRender = true; // Track if it's the first render

    return () => {
      if (isAuto) {
        intervalId = setInterval(() => {
          handleAnimationBanner(1);
          console.log(handleAnimationBanner(1));
          // initialRender = false; // Update initialRender flag after the first iteration
        }, 4000);
      }

      return () => {
        intervalId && clearInterval(intervalId);
      };
    };
  }, [min, max, isAuto]);

  const handleAnimationBanner = (step) => {
    const sliderEls = document.getElementsByClassName("slider-item");
    const list = getArrSlider(min, max, sliderEls.length - 1);

    for (let i = 0; i < sliderEls.length; i++) {
      // Delete classnames (CSS)
      sliderEls[i]?.classList?.remove(
        "animate-slide-right",
        "order-last",
        "z-20"
      );
      sliderEls[i]?.classList?.remove(
        "animate-slide-left",
        "order-first",
        "z-10"
      );
      sliderEls[i]?.classList?.remove("animate-slide-left2", "order-2", "z-10");

      // Hide or Show images
      if (list.some((item) => item === i)) {
        sliderEls[i].style.cssText = "display: block";
      } else {
        sliderEls[i].style.cssText = "display: none";
      }
    }

    // Add animation by adding classnames
    list.forEach((item) => {
      if (item === max) {
        sliderEls[item]?.classList?.add(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
      } else if (item === min) {
        sliderEls[item]?.classList?.add(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
      } else {
        sliderEls[item]?.classList?.add(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );
      }
    });

    // setMin(initialRender ? 0 : sliderEls.length - 1 ? 0 : min + 1);
    // setMax(initialRender ? 2 : sliderEls.length - 1 ? 0 : max + 1);

    if (step === 1) {
      setMin((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
      setMax((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
    }

    if (step === -1) {
      setMin((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
      setMax((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
    }
  };

  // Xử lý công việc người dùng click vào item banner
  const handleClickBanner = (item) => {
    // Nếu banner có type === 1 (là 1 bài hát)
    if (item?.type === 1) {
      // Gửi 1 actions đến redux reducer id của bài hát trong banner (phát bài hát)
      dispatch(actions.setCurSongId(item.encodeId));

      // Gửi 1 actions đến redux reducer giá trị true set lại state trong store của play (thay đổi toggle player music)
      dispatch(actions.play(true));

      // Gửi 1 actions đến redux reducer giá trị null cho playlist (cho reducer biết bài hát không nằm trong playlist nào để vô hiệu hóa button next & prev)
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
  };

  const handleBack = useCallback(
    (step) => {
      intervalId && clearInterval(intervalId);
      setIsAuto(false);
      handleAnimationBanner(step);
    },
    [min, max]
  );

  return (
    <div className="w-full overflow-hidden px-[59px] relative">
      <Button
        text={<MdArrowBackIosNew size={30} />}
        style="absolute top-1/2 left-[70px] bg-[rgba(255,255,255,0.3)] z-30 text-white p-2 rounded-full"
        handleOnClick={() => handleBack(1)}
      />
      <Button
        text={<MdArrowForwardIos size={30} />}
        style="absolute top-1/2 right-[70px] bg-[rgba(255,255,255,0.3)] z-30 text-white p-2 rounded-full"
        handleOnClick={() => handleBack(-1)}
      />
      <div
        className="flex gap-8 w-full pt-8"
        onMouseLeave={(e) => setIsAuto(true)}
      >
        {banner?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            alt=""
            onClick={() => handleClickBanner(item)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? "block" : "hidden"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
