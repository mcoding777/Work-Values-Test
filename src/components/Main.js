import { useState, } from "react";
import { Button } from './Button';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

// 검사 시작 페이지

export function Main() {
  // useForm
  const { register, formState: { errors }, handleSubmit } = useForm();
  const registerParams = { required: true };
  const onSubmit = data => console.log(data);

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
      <UserBox onSubmit={handleSubmit(onSubmit)}>
        <ItemText>이름</ItemText>
        <input 
          value={name} 
          type="text" 
          onChange={handleChange} 
          {...register("user_name", { required: true })} />
        {errors.user_name?.type === 'required' && <p>이름을 입력해주세요</p>}
        <ItemText>성별</ItemText>
        <label>
          <input 
            type="radio" 
            name="radio" 
            value="male" 
            onClick={getGender} 
            {...register("user_gender", { required: true })} />
          남자
        </label>
        <label>
          <input 
            type="radio" 
            name="radio" 
            value="female" 
            onClick={getGender}
            {...register("user_gender", { required: true })} />
          여자
        </label>
        {errors.user_name?.type === 'user_gender' && <p>성별을 선택해주세요</p>}
      </UserBox>
      <Link to={name && gender ? "/example" : "/"}>
        <Button 
          text="검사시작"
          type="submit" />
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

const UserBox = styled.form`
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

    width: 100%;
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