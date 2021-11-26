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
  const buttonname = props.name;

  const navigate = useNavigate();
  const params = useParams();

  // console.log(navigate);
  // console.log(params);

  function handleClick() {
    if (buttonname === "start") {
      console.log("검사시작 버튼을 클릭했습니다 ^^");
    } else if (buttonname === "next") {
      nextpage(+1);
      console.log("다음 버튼을 클릭했습니다 ^^");
    } else if (buttonname === "prev") {
      navigate(-1);
      console.log("이전 버튼을 클릭했습니다 ^^");
    }
  }

  return (
    <button type="button" onClick={handleClick} name={props.name} 
      className={props.classname}>{props.text}</button>
  );
}