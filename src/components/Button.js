import React, { useEffect, useState, forwardRef } from "react";
import "../css/Button.css";
import {
  useNavigate, useParams,
} from 'react-router-dom';

// 버튼

export function Button(props) {
  console.log("Button 컴포넌트가 렌더링 됐습니다.");

  /*
  const history = useNavigate();
  const params = useParams();

  function handleNav() {
    if (props.text === "다음") {
      history(`/test/${parseInt(params)}`);
    } else if (props.text === "이전") {
      history(-1);
    }
  }
  */

  function handleNav() {
    console.log("검사시작 버튼 클릭했다!");
    if (typeof props.onClick === "function") {props.onClick();}
  }

  return (
    <button type="button" onClick={handleNav} 
      className={props.classname}>{props.text}</button>
  );
}