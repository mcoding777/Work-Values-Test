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

  const nextpage = props.nextpage;
  const prevpage = props.prevpage;
  const nextbutton = props.nextbutton;

  function handleClick() {
    console.log("버튼 이벤트가 시작됐습니다 ^^");
  }

  return (
    <button type="button" onClick={handleClick} 
      className={props.classname}>{props.text}</button>
  );
}