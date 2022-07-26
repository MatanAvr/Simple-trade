import React from "react";

const Dropdown = (props) => {
  //{ label, value, options, onChange }
  return (
    <label>
      {props.label}
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option key={Math.random()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
