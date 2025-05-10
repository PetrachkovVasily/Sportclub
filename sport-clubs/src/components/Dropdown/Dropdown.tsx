import React from "react";

interface Props {}

function Dropdown({
  options,
  isEmpty = false,
  width = "fit-content",
  onChange = () => {},
  value = "",
}) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      style={{
        width: width,
      }}
    >
      {isEmpty ? <option style={{ display: "none" }}></option> : <></>}
      {options?.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
