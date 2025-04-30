import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import slider from "../../assets/sliders-svgrepo-com 1.svg";

interface Props {}

function SearchBar({ onFilter }) {
  const [filters, setFilters] = useState({
    query: "",
    status: "",
    city: "",
    country: "",
    category: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className="w-full flex gap-[6px] relative ">
      <button
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="px-[6px] border-[2px] border-[#404040]/12 rounded-[8px] flex items-center justify-center"
      >
        <img src={slider} alt="" />
      </button>
      <div className="w-full flex rounded-[4px]">
        <button className="px-[8px] h-full rounded-[8px] rounded-r-[0px] border-[2px] border-[#404040]/12">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search"
          value={filters.query}
          onChange={(e) => handleChange("query", e.target.value)}
          className="w-full border-[2px] border-l-0 border-[#404040]/12 px-2 py-1 rounded-r-[8px]"
        />
      </div>

      {/* Выпадающее меню с фильтрами */}
      {showAdvanced && (
        <div className=" flex flex-col gap-[8px] rounded-[4px] shadow-lg border-[2px] border-[#404040]/18 bg-white  absolute top-[42px] p-[12px] z-25">
          {/* Статус */}
          <div className="border-[2px] bg-white border-[#505050]/12 rounded-[4px] text-[14px] ">
            <Dropdown
              options={[
                { option: "public", name: "public" },
                { option: "private", name: "private" },
              ]}
              width="100%"
            />
          </div>

          <div className="border-[2px]  bg-white border-[#505050]/12 rounded-[4px] text-[14px] ">
            <Dropdown
              options={[
                { option: "running", name: "running" },
                { option: "workout", name: "workout" },
              ]}
              isEmpty={true}
              width="100%"
            />
          </div>
          {/* Город */}
          <input
            type="text"
            placeholder="City"
            value={filters.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
          />

          {/* Страна */}
          <input
            type="text"
            placeholder="Country"
            value={filters.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full border-[2px]  bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
          />

          {/* <button className="w-[64px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[12px] mt-[8px]">
            submit
          </button> */}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
