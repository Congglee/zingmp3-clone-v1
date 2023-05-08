import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getArrSlider } from "../ultis/fn";

const Slider = () => {
  // useSelector(selector: Function, equalityFn?: Function): Một hook để truy cập state của Redux store. Hook này lấy một hàm selector làm đối số. Selector được gọi với state store.

  // Hook này lấy hàm so sánh đẳng thức tùy chọn làm tham số thứ hai cho phép bạn tùy chỉnh cách so sánh state đã chọn để xác định xem component có cần được re-render hay không.
  // useSelector((state) => {
  //   console.log(state.app);
  // });
  const { banner } = useSelector((state) => state.app);

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);

      for (let i = 0; i < sliderEls.length; i++) {
        // Delete classnames (CSS)
        sliderEls[i].classList.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i].classList.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i].classList.remove("animate-slide-left2", "order-2", "z-10");

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
          sliderEls[item].classList.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          sliderEls[item].classList.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item].classList.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });

      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;

      // console.log(list);
    }, 2000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden px-[59px]">
      <div className="flex gap-8 w-full pt-8">
        {banner?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            alt=""
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
