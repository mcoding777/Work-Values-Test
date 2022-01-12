import React, { useState, } from "react";
import { Button } from './Button';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';

// 검사 시작 페이지

export function Main() {
  console.log("Main 컴포넌트가 렌더링 됐습니다.");

  // 이름과 성별 state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  // input에 들어온 이름으로 바꾸는 함수
  function handleChange(event) {
    setName(event.target.value);
    sessionStorage.setItem("user_name", event.target.value);
  }

  function getGender(event) {
    setGender(event.target.value);
    sessionStorage.setItem("user_gender", event.target.value);
  }

  return (
    <Container>
      <h1>직업 가치관 검사</h1>
      <UserBox>
        <ItemText>이름</ItemText>
        <input value={name} type="text" onChange={handleChange} />
        <ItemText>성별</ItemText>
        <label>
          <input type="radio" name="radio" value="male" onClick={getGender} />
          남자
        </label>
        <label>
          <input type="radio" name="radio" value="female" onClick={getGender} />
          여자
        </label>
      </UserBox>
      <Link to={name && gender ? "/example" : "/"}>
        <Button 
          classname={name && gender ? "activity" : null} 
          text="검사시작"
          name="main" />
      </Link>
    </Container>
  );
}

// styled-components

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

const UserBox = styled.div`
  margin : 30px 0;

  width: 200px;

  display: flex;
  flex-direction: column;

  & input[type="text"] {
    all: unset;

    border-color: #d3dae0;
    border-radius: 5px;

    background-color: white;

    color: black;

    height: 50px;

    margin-top: 2px;
    margin-bottom: 30px;
  };
    
  & label {
    font-weight: 500;

    text-align: left;

    padding: 2px;
  
    & input[type="radio"] {
      -webkit-appearance:none;
      -moz-appearance:none;
      -ms-appearance:none;
      -o-appearance:none;

      width: 13px;
      height: 13px;

      border-radius: 13px;
      background: #ffffff;

      margin-right: 5px;

        &:checked::before {
          content:'';

          display:block;

          width: 75%;
          height: 75%;

          margin: 13% auto;

          border-radius: 100%;

          background: #ec5990;
        };
    };
  
  };
`;

const ItemText = styled.p`
  text-align: left;

  font-weight: bold;
`;