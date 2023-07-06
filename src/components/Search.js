import React, { useState } from "react";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import path from "../ultis/path";

const { FiSearch } = icons;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full flex items-center">
      <span className="h-10 pl-4 bg-[#dde4e4] flex items-center justify-center rounded-l-[20px] text-gray-500">
        <FiSearch size={20} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#dde4e4] w-full px-4 py-2 rounded-r-[20px] h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
