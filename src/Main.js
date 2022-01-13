import { Article } from './components/Area';
import { Button } from './components/Button';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo } from './components/ReduxAction';

// 검사 시작 페이지

export function Main() {
  // 라우터 네비게이트
  const navigate = useNavigate();

  // 리덕스 관련
  const dispatch = useDispatch();
  const reduxtState = useSelector(state => state);
  // console.log(reduxtState);

  // 이미 입력한 이름과 성별
  const userName = reduxtState?.user_name;
  const userGender = reduxtState?.user_gender;

  // useForm
  const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const onSubmit = data => {
    dispatch(
      changeUserInfo(
        data.user_name, data.user_gender, 
      )
    );
    navigate("/example");
  };
  // console.log(watch('user_gender'));

  return (
    <Article>
      <h1>직업 가치관 검사</h1>
      <UserBox onSubmit={handleSubmit(onSubmit)}>
        <NameBox>
          <ItemText>이름</ItemText>
          <input 
            type="text" 
            defaultValue={userName} 
            {...register("user_name", { required: true })} />
          {errors.user_name && <ErrorText>이름을 입력해주세요</ErrorText>}
        </NameBox>
        <GenderBox>
          <ItemText>성별</ItemText>
          <label>
            <input 
              type="radio" 
              name="radio" 
              value="male" 
              defaultChecked={userGender === "male"} 
              {...register("user_gender", { required: true })} />
            남자
          </label>
          <label>
            <input 
              type="radio" 
              name="radio" 
              value="female" 
              defaultChecked={userGender === "female"} 
              {...register("user_gender", { required: true })} />
            여자
          </label>
          {errors.user_gender && <ErrorText>성별을 선택해주세요</ErrorText>}
        </GenderBox>
        <Button 
          text="검사시작"
          type="submit" />
      </UserBox>
    </Article>
  );
}

// styled-components

const UserBox = styled.form`
  margin : 30px 0;

  width: 200px;

  display: flex;
  flex-direction: column;
`;

const NameBox = styled.div`
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
  };
`;

const GenderBox = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px 0;

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

const ErrorText = styled.p`
  color: #ff6fa5;
  font-size: 0.8rem;

`;