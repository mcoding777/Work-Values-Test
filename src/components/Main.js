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
    console.log("이름 바꿨당");
  }

  function getGender(event) {
    setGender(event.target.value);
    sessionStorage.setItem("user_gender", event.target.value);
    console.log("성별 바꿨당");
  }

  return (
    <Container>
      <h1>직업가치관검사</h1>
      <NameBox>
        <ItemText>이름</ItemText>
        <input value={name} type="text" onChange={handleChange} />
      </NameBox>
      <GenderBox>
        <ItemText>성별</ItemText>
        <label>
          <input type="radio" name="radio" value="male" onClick={getGender} />
          남자
        </label>
        <label>
          <input type="radio" name="radio" value="female" onClick={getGender} />
          여자
        </label>
      </GenderBox>
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

const NameBox = styled.div`
    margin : 30px 0;

    display: flex;
    flex-direction: column;

    & input {
      all: unset;

      border-color: #d3dae0;
      border-width: 3px;
      border-style: solid;
      border-radius: 5px;
    }
`;

const ItemText = styled.p`
  text-align: left;

  font-weight: bold;
  color: #4b5c6b;
`;

const GenderBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;

  & label {
    font-weight: 500;
  
    & input {
      -webkit-appearance:none;
      -moz-appearance:none;
      -ms-appearance:none;
      -o-appearance:none;

      width: 13px;
      height: 13px;

      border: 2px solid darkgray;
      border-radius: 13px;
      background: #ffffff;

        &:checked::before {
          content:'';

          display:block;

          width: 75%;
          height:75%;

          margin: 13% auto;

          border-radius: 100%;

          background: #6558f5;
        }
    }
  
  }
`;