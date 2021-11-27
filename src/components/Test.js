import React, { 
  useState, 
  useEffect, } from "react";
import { CheckBox } from "./CheckBox";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import "../css/Test.css";
import {
  Link, 
  Routes, 
  Route, 
  useNavigate, 
  useParams,
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
  const changpage = props.changpage;

  console.log("현재 Test 컴포넌트에서 pagenumber는 ",pagenumber);

    // 선택한 항목 값을 모아주는 변수, 함수
    const [total, setTotal] = useState({});

    function handleUpdate(update) {
      setTotal((cur) => {
          const newcur = {...cur}
          const name = update.name;
          const select = update.select;
          newcur[name] = select;
          return newcur;
      })
    }
  
    console.log("현재 선택한 항목은", total);

  // CheckBox 컴포넌트 5개를 만들어낼 map 함수
  function checkmap(Array) {
    const data = Array.map((item, index) => {
      const name = "B" + String(index+(pagenumber*5)+1);
      return (
        <CheckBox cb={cb_style} rb={rb_style} 
          key={index}
          name={name}
          answer01={item["answer01"]} 
          answer02={item["answer02"]} 
          answerscore01={item["answerScore01"]} 
          answerscore02={item["answerScore02"]} 
          value01={item["answer03"]} 
          value02={item["answer04"]} 
          updateResult={handleUpdate} 
           />
      )
    })
    return data;
  }

  // 히스토리
  const navigate = useNavigate();
  const { id } = useParams();

  function nextPage() {
    console.log("다음 페이지로 이동합니다");
    navigate(`${pagenumber !== 5 ? "/test/"+String(pagenumber+1) : "/Finish/"}`, {repale: true, state: total});
    changpage(pagenumber+1);
  }

  function prevPage() {
    console.log("이전 페이지로 이동합니다");
    navigate(`${pagenumber !== 0 ? "/test/"+String(pagenumber-1) : "/Example/"}`,
      {repale: false, state: total});
    changpage(pagenumber-1);
  }

  if (Object.keys(total).length === ((pagenumber+1)*5)) {
    console.log("5개의 항목을 모두 선택했습니다!!!!!!!! 굿");
  }

  return (
    <div className="container">
      <Progressbar text="검사진행" percent={percent} />
      { questions }
      <div className="buttonbox">
        {/* <Link to={pagenumber !== 0 ? "/test/"+String(pagenumber-1) : "/Example/"}> */}
          <Button classname="btn" text="이전" prevpage={prevPage} name="prev"  />
        {/* </Link>
        <Link to={pagenumber !== 5 ? "/test/"+String(pagenumber+1) : "/Finish/"}> */}
          <Button classname="btn" text="다음" nextpage={nextPage} name="next"  />
        {/* </Link> */}
      </div>
    </div>
  );
}