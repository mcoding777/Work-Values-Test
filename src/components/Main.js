import React, { useState } from "react";
import { Button } from './Button';
import "../css/Main.css";
import {
  Link,
} from 'react-router-dom';

// 검사 시작 페이지
export function Main(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  function getGender(event) {
    setGender(event.target.value);
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="container" style={{marginTop:"15%"}}>
      <div className="title">
        <h1>직업가치관검사</h1>
      </div>
      <div className="name">
        <p>이름</p>
        <input onChange={handleChange} />
      </div>
      <div className="gender">
        <p>성별</p>
        <div><input type="radio" name="radio" value="male" onClick={getGender} />남자</div>
        <div><input type="radio" name="radio" value="female" onClick={getGender} />여자</div>
      </div>
      <div className="buttonContainer">
        <Link to={name && gender ? "/example" : "/"}>
          <Button checked={name && gender ? true : false} text="검사시작" />
        </Link>
      </div>
    </div>
  );
}