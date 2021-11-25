import React, { useEffect, useState } from "react";
import "../css/Button.css";
import {
  useNavigate, useParams,
} from 'react-router-dom';

// 버튼
export function Button(props) {
  const history = useNavigate();
  const params = useParams();

  function handleNav() {
    if (props.text === "다음") {
      history(`/test/${parseInt(params)}`);
    } else if (props.text === "이전") {
      history(-1);
    }
  }

  return (
    <button onClick={handleNav} className={props.checked ? "btn_click" : "btn"}>{props.text}</button>
  );
}