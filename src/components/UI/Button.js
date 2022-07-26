import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let cssClass;
  if (props.type === "logout") {
    cssClass = classes.logout;
  } else if (props.type === "icon") {
    cssClass = classes.icon;
  } else if (props.type === "navActive") {
    cssClass = classes.navActive;
  } else {
    cssClass = classes.regular;
  }

  return (
    <>
      <button
        type="button"
        className={cssClass}
        onClick={props.onClick}
        value={props.value ? props.value : ""}
      >
        {props.title}
        {props.children ? props.children : ""}
      </button>
    </>
  );
};

export default Button;
