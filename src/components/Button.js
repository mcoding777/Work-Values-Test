import React, { useEffect, useState } from "react";
import "../css/Button.css";

// 버튼
export function Button(props) {
  return (
    <button className={props.checked ? "btn_click" : "btn"}>{props.text}</button>
  );
}