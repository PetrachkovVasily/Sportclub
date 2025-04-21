import React from "react";

interface Props {}

function Dropdown({ options }) {
  return (
    <select>
      {options.map((item) => (
        <option value={item.value}>{item.name}</option>
      ))}
    </select>
  );
}

export default Dropdown;
