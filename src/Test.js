import { useState, useEffect } from "react";
import { CheckBox } from "./components/CheckBox";
import { Button } from './components/Button';
import { Progressbar } from './components/Progressbar';
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Article, Form } from './components/Styled';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { changeUserSelect } from './components/ReduxAction';

export function Test() {

  // 라우터 네비게이트
  const navigate = useNavigate();

  // 페이지 관련 변수
  const [result, setResult] = useState([]); // API로 불러온 결과
  const page = Math.ceil(result.length / 5); // 전체 페이지
  const [pagenumber, setPageNumber] = useState(0); // 현재 페이지
  const currentQ = result.slice(pagenumber*5, (pagenumber+1)*5) // 현재 문항 번호
  const percent = Math.floor((pagenumber+1)/page*100) // 검사 진행률
  
  // 리덕스 관련
  const dispatch = useDispatch();

  // useForm (양식 컨텍스트에 연결)
  const methods = useForm();
  const onSubmit = (data) => { 
    dispatch(
      changeUserSelect(
        data, 
      )
    );
    navigate(`/test/${pagenumber+1}`)
  };

  // 심리검사 항목 API 호출 함수
  const QuestionCall = async () => {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const res = response.data.RESULT;
      setResult([...res]);
    }
    catch (error) {
      console.error("error", error);
    }
  };

  // CheckBox 컴포넌트 5개를 만들어낼 map 함수
  const questions = checkmap(currentQ);

  function checkmap(array) {
    const data = array.map((item, index) => {
      const name = "B" + String(index+(pagenumber*5)+1);
      const sessionTotal = JSON.parse(sessionStorage.getItem('checked'));
      const checked = sessionTotal?.[name];

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
          checked={checked} 
           />
      )
    })
    return data;
  }

  // API 호출(한번만)
  useEffect(() => { QuestionCall() }, []);

  return (
    <Article testPage={true}>
      <Progressbar 
        text="검사 진행률" 
        percent={percent} 
        testPage={true} />
      <FormProvider {...methods} >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          { questions }
          <ButtonBox>
            <Button 
              type="button" 
              text="이전" />
            <Button 
              type="submit" 
              text={pagenumber !== 5 ? "다음" : "제출"} />
          </ButtonBox>
        </Form>
      </FormProvider>
    </Article>
  );
}

// styled-components
const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;

    width: 700px;

    margin-bottom: 50px;
`;