import React, { 
  useState, 
  useEffect, 
  useParams, } from "react";
import { CheckBox } from "./CheckBox";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import "../css/Test.css";
import {
  Link, Routes, Route,
} from 'react-router-dom';

export function Test(props) {
  console.log("Test 컴포넌트가 렌더링 됐습니다.");

  // 5가지 항목을 모두 선택했는지 체크해줄 변수
  const [checked, setChecked] = useState(true);

  // CheckBox 컴포넌트 CSS 변수
  const cb_style = {height:100, paddingTop:20};
  const rb_style = {margin:"35px auto"};

  // App에서 넘어온 페이지네이션 정보
  const pagenumber = props.pagenumber; 
  const currentradio = props.currentradio;
  const percent = props.percent;
  const questions = checkmap(currentradio);

  console.log(pagenumber);
  console.log(currentradio);
  console.log(percent);

  // CheckBox 컴포넌트 5개를 만들어낼 map 함수
  function checkmap(Array) {
    const data = Array.map((item, index) => {
      return (
        <CheckBox cb={cb_style} rb={rb_style} 
          key={index}
          name={"B" + String(index+(pagenumber*5)+1)}
          answer01={item["answer01"]} 
          answer02={item["answer02"]}
          value01={item["answer03"]} 
          value02={item["answer04"]} 
          updateResult={handleUpdate}
           />
      )
    })
    return data;
  }

  // 페이지에 따라서 map 함수 호출
  /*
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
  */

  // 선택한 항목 값을 모아주는 변수, 함수
  const [result, setResult] = useState({});

  function handleUpdate(update) {
    setResult((cur) => {
        const newcur = {...cur}
        const name = update.name;
        const select = update.select;
        newcur[name] = select;
        return newcur;
    })
  }

  // useEffect(() => console.log(result), [result]);

  return (
    <div className="container">
      <Progressbar text="검사진행" percent={percent} />
      { questions }
      <div className="buttonbox">
        <Link to="/example">
          <Button text="이전" />
        </Link>
        <Link to={checked ? "/test/"+String(pagenumber+1) : "/test/"+String(pagenumber)}>
          <Button text="다음" />
        </Link>
      </div>
    </div>
  );
}