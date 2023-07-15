import React from "react";
import icons from "../ultis/icons";
import { Search } from "./index";
import { useNavigate, useParams } from "react-router-dom";

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

const Header = () => {
  const navigate = useNavigate();
  const { singer } = useParams();

  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 cursor-pointer">
          <span onClick={() => navigate(-1)}>
            <HiArrowNarrowLeft size={24} color={singer ? "#ccc" : "black"} />
          </span>
          <span onClick={() => navigate(1)}>
            <HiArrowNarrowRight size={24} color={singer ? "#ccc" : "black"} />
          </span>
        </div>

        <div className="w-1/2">
          <Search />
        </div>
      </div>

      <div>Login</div>
    </div>
  );
};

export default Header;
