import React from "react";

interface Props {}

function Counter({ value, header, onChange = () => {} }) {
  return (
    <div className="flex gap-[6px] items-center">
      <h3 className="text-[14px] font-semibold text-[#505050] ">{header}:</h3>
      <input
        className="w-[42px] h-auto text-[14px] font-semibold text-[#505050] "
        value={value}
        type="number"
        min={1}
        onChange={(e) => {
          onChange(+e.target.value);
        }}
      />
    </div>
  );
}

export default Counter;
