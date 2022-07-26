import React from "react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  const small = props.size ? true : false;
  let cssClass;

  if (small) {
    cssClass = classes.loaderSmall;
  } else {
    cssClass = classes.loader;
  }
  return <div className={cssClass}></div>;
};

export default LoadingSpinner;
