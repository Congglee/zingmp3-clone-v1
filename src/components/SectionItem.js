import React, { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../ultis/icons";

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;

const SectionItem = ({
  link,
  title,
  thumbnailM,
  artistsNames,
  data,
  sortDescription,
}) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false); // State lưu trữ giá trị true hoặc false dùng cho việc hover vào playlist
  const imageRef = useRef();

  // Nếu hover chuột vào playlist
  const handleHover = () => {
    setIsHover(true); // set isHover là true

    imageRef.current.classList.remove("animate-scale-down-image"); // Loại bỏ class animate-scale-down-image khỏi thẻ img ref từ imageRef
    imageRef.current.classList.add("animate-scale-up-image"); // Thêm class animate-scale-up-image vào thẻ img từ imageRef
  };

  // Nếu bỏ hover chuột ra khỏi playlist
  const handleLeave = () => {
    setIsHover(false); // set isHover là false
    imageRef.current.classList.remove("animate-scale-up-image");
    imageRef.current.classList.add("animate-scale-down-image");
  };

  return (
    <div
      onClick={() => {
        // chuyển sang trang của phần tử đầu tiên của link
        // kèm thêm một option khi chuyển trang là thêm một object có thuộc tính playAlbum value false vào object state (không click vào button play khi hover vào playlist)
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col gap-3 justify-evenly w-1/5 p-4 text-sm cursor-pointer"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="w-full relative overflow-hidden rounded-lg"
      >
        {isHover && (
          <div className="absolute top-0 bottom-0 z-40 left-0 right-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3">
            <span>
              <AiOutlineHeart size={25} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation(); // chống hiện tượng nổi bọt (khi phần tử con và phần tử cha đều có sự kiện click)
                // * Nếu không có đoạn trên thì sự kiện click sẽ chỉ nhận của phần tử cha
                navigate(link?.split(".")[0], { state: { playAlbum: true } });
              }}
              className="p-1 border border-white rounded-full"
            >
              <BsFillPlayFill size={35} />
            </span>
            <span>
              <BsThreeDots size={25} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avatar"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <span className="flex flex-col">
        <span className="font-semibold">
          {title?.length > 30 ? title.slice(0, 30) + " ..." : title}
        </span>
        {data?.sectionId === "h100" ? (
          <span>{artistsNames}</span>
        ) : (
          <span>
            {sortDescription?.length >= 40
              ? `${sortDescription?.slice(0, 40)}...`
              : sortDescription}
          </span>
        )}
      </span>
    </div>
  );
};

export default memo(SectionItem);
