import React, { 
  useState, 
  useEffect, 
  useHistory,
  useParams, } from "react";
import { CheckBox } from "./CheckBox";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import "../css/Test.css";
import axios from 'axios';
import {
  Link, Routes, Route,
} from 'react-router-dom';

export function Test() {
  const [checked, setChecked] = useState(true);

  // 페이지 관련 변수
  const [page, setPage] = useState(0);
  const [startindex, setStartindex] = useState(0);

  // 호출한 API 상태 관리하는 변수
  const [result, setResult] = useState([]);

  // CheckBox 컴포넌트 CSS 변수
  const cb_style = {height:100, paddingTop:20};
  const rb_style = {margin:"35px auto"};

  async function asyncCall() {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const res = response.data.RESULT;
      setResult([...res]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => asyncCall(), []);
  useEffect(() => setPage(Math.ceil(result.length / 5)), [result]);

  // CheckBox 컴포넌트 5개를 만들어낼 map 함수
  function checkmap(Array) {
    const data = Array.map((item, index) => {
      return (
        <CheckBox cb={cb_style} rb={rb_style} 
          name={index}
          answer01={item["answer01"]} 
          answer02={item["answer02"]} />
      )
    })
    return data;
  }

  // 페이지에 따라서 map 함수 호출
  function handleMap() {
    let lastpage;
    if (startindex < result.length) {
      if (startindex + 5 > result.length) {
        lastpage = result.length
      } else {
        lastpage = startindex + 5;
      }}
    const data = checkmap(result.slice(startindex, lastpage))
    return data;
  }

  function handleClick() {
    
  }

  return (
    <div className="container">
      <Progressbar text="검사진행" percent="0" />
      { handleMap?.(result.length) }
      <div className="buttonbox">
        <Link to="/example">
          <Button text="이전" />
        </Link>
        <Link to={checked ? "/finish" : "/test/2"} onClick={handleClick}>
          <Button text="다음" />
        </Link>
      </div>
    </div>
  );
}