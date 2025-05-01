import React from "react";

interface Props {}

function Dropdown({
  options,
  isEmpty = false,
  width = "fit-content",
  onChange = () => {},
}) {
  return (
    <select
      onChange={onChange}
      style={{
        width: width,
      }}
    >
      {isEmpty ? <option style={{ display: "none" }}></option> : <></>}
      {options.map((item) => (
        <option value={item.value}>{item.name}</option>
      ))}
    </select>
  );
}

export default Dropdown;
