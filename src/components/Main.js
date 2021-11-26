import React, { useState, useRef } from "react";
import { Button } from './Button';
import "../css/Main.css";
import {
  Link,
} from 'react-router-dom';

// 검사 시작 페이지

export function Main(props) {
  console.log("Main 컴포넌트가 렌더링 됐습니다.");

  // 이름과 성별 state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  // input에 들어온 이름으로 바꾸는 함수
  function handleChange(event) {
    setName(event.target.value);
    console.log("이름 바꿨당");
  }

  function getGender(event) {
    setGender(event.target.value);
    console.log("성별 바꿨당");
  }

  function handleClick() {
    if (name && gender) {
      props.state(name, gender);
    }
  }

  return (
    <div className="container" style={{marginTop:"15%"}}>
      <div className="title">
        <h1>직업가치관검사</h1>
      </div>
      <div className="name">
        <p>이름</p>
        <input type="text" onChange={handleChange} />
      </div>
      <div className="gender">
        <p>성별</p>
        <div><input type="radio" name="radio" value="male" onClick={getGender} />남자</div>
        <div><input type="radio" name="radio" value="female" onClick={getGender} />여자</div>
      </div>
      <div className="buttonContainer">
        <Link to={name && gender ? "/example" : "/"}>
          <Button 
            classname={name && gender ? "btn_click" : "btn"} 
            text="검사시작"
            onClick={handleClick} />
        </Link>
      </div>
    </div>
  );
}

// 검사 시작 버튼은 이름과 성별이 true 일 때 활성화