import React, { useState, useEffect, useRef } from "react";
import { CheckBox } from "./CheckBox";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import "../css/Test.css";
import axios from 'axios';
import { Link, } from 'react-router-dom';

export function Test(props) {
  console.log("Test 컴포넌트가 렌더링 됐습니다.");

  // 페이지 관련 변수
  const [result, setResult] = useState([]);
  const page = Math.ceil(result.length / 5);
  const [pagenumber, setPageNumber] = useState(0);
  const currentQ = result.slice(pagenumber*5, (pagenumber+1)*5)
  const percent = Math.floor((pagenumber+1)/page*100)

  console.log("현재 Test 컴포넌트에서 pagenumber는 ",pagenumber);

  // 5개 항목에 대한 다음 버튼 활성화/비활성화
  const isOn = useRef(false);

  // 선택한 항목 값을 모아주는 변수, 함수
  const [total, setTotal] = useState({});
  const sessionTotal = JSON.parse(sessionStorage.getItem('total')) || {};
  console.log("sessionTotal은", sessionTotal);

  // 심리검사 항목 API 호출 함수
  async function QuestionCall() {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const res = response.data.RESULT;
      setResult([...res]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleUpdate(update) {
    const name = update.name;
    const select = update.select;
    sessionTotal[name] = select;
    sessionStorage.setItem('total', JSON.stringify(sessionTotal));
    setTotal((cur) => {
        const newcur = {...cur}
        newcur[name] = select;
        return newcur;
    })
  }

  console.log("현재 선택한 항목은", total);

  // CheckBox 컴포넌트 5개를 만들어낼 map 함수
  const questions = checkmap(currentQ);

  function checkmap(array) {
    const data = array.map((item, index) => {
      const name = "B" + String(index+(pagenumber*5)+1);

      const checked = sessionTotal?.[name];
      console.log("checked는", checked);

      return (
        <CheckBox 
          key={index}
          name={name}
          answer01={item["answer01"]} 
          answer02={item["answer02"]} 
          answerscore01={item["answerScore01"]} 
          answerscore02={item["answerScore02"]} 
          value01={item["answer03"]} 
          value02={item["answer04"]} 
          updateResult={handleUpdate} 
          checked={checked}
           />
      )
    })
    return data;
  }

  function nextPage() {
    if (pagenumber !== 5) {
      if (isOn.current) {setPageNumber(pagenumber+1);}
      else {alert("선택하지 않은 항목이 있습니다.")}
    }
  }

  function prevPage() {
    if (pagenumber !== 0) {setPageNumber(pagenumber-1);}
  }

  if (Object.keys(sessionTotal).length >= ((pagenumber+1)*5)) {
    console.log("5개의 항목을 모두 선택했습니다!!!!!!!! 굿");
    isOn.current = true;
  } else {
    isOn.current = false;
  }

  // API 호출(한번만)
  useEffect(() => {
    QuestionCall()
  }, []);

  return (
    <div className="container">
      <Progressbar text="검사진행" percent={percent} />
      { questions }
      <div className="buttonbox">
        <Link to={pagenumber !== 0 ? "/test/"+String(pagenumber-1) : "/Example/"}>
          <Button classname="btn" text="이전" prevpage={prevPage} name="prev"  />
        </Link>
        <Link to={pagenumber !== 5 ? "/test/"+String(pagenumber+1) : "/Finish/"}>
          <Button classname="btn" 
            text={pagenumber !== 5 ? "다음" : "제출"} 
            nextpage={nextPage} 
            name={pagenumber !== 5 ? "next" : "submit"}  />
        </Link>
      </div>
    </div>
  );
}