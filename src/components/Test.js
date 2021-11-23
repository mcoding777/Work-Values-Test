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
  const [percent, setPercent] = useState(0);
  const [page, setPage] = useState(0);
  const [currentpage, setCurrentpage] = useState(0);

  // 호출한 API 상태 관리하는 변수
  const [result, setResult] = useState([]);
  let answer01 = "";
  let answer02 = "";

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

  // CheckBox 컴포넌트 5개를 만들어낼 함수
  function checkmap(Array) {
    Array.map((item, index) => {
      return (
        <CheckBox cb={cb_style} rb={rb_style} 
          key={item.index}
          answer01={item["answer01"]} 
          answer02={item["answer02"]} />
      )
    })
  }

  return (
    <div className="container">
      <Progressbar text="검사진행" percent="0" />
      <CheckBox cb={cb_style} rb={rb_style} name="0" answer01={answer01} answer02={answer02} />
      <CheckBox cb={cb_style} rb={rb_style} name="1" answer01={answer01} answer02={answer02} />
      <CheckBox cb={cb_style} rb={rb_style} name="2" answer01={answer01} answer02={answer02} />
      <CheckBox cb={cb_style} rb={rb_style} name="3" answer01={answer01} answer02={answer02} />
      <CheckBox cb={cb_style} rb={rb_style} name="4" answer01={answer01} answer02={answer02} />
      <div className="buttonbox">
        <Link to="/example">
          <Button text="이전" />
        </Link>
        <Link to={checked ? "/finish" : "/test/2"}>
          <Button text="다음" />
        </Link>
      </div>
    </div>
  );
}