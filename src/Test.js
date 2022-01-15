import { useState, useEffect } from "react";
import { CheckBox } from "./components/CheckBox";
import { Button } from './components/Button';
import { Progressbar } from './components/Progressbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const currentQ = result.slice(currentPage*5, (currentPage+1)*5) // 현재 문항 번호
  const percent = Math.floor((currentPage+1)/page*100) // 검사 진행률
  
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
    moveNextPage();
  };

  // CheckBox에서 선택한 항목
  const sessionTotal = JSON.parse(sessionStorage.getItem('checked')) || {};
  const [userSelect, setUserSelect] = useState(sessionTotal);
  console.log("userSelect", userSelect);
  
  // CheckBox에서 선택한 항목 가져오기
  const getSelect = (name, value) => {
    sessionTotal[name] = value;
    sessionStorage.setItem('checked', JSON.stringify(sessionTotal));
    setUserSelect((cur) => {
        const newcur = {...cur}
        newcur[name] = value;
        return newcur;
    })
  };

  // 이전 버튼 클릭 시 동작
  const movePrevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage-1);
    }
    navigate(-1);
  };

  // 다음 버튼 클릭 시 동작
  const moveNextPage = () => {
    if (currentPage !== 5) {
      setCurrentPage(currentPage+1);
      navigate(`/test/${currentPage+1}`);
    }
    else {
      navigate("/finish");
    }
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
  
  // CheckBox 컴포넌트 5개를 만들어낼 함수
  const renderQ = currentQ.map((item, index) => {
        const name = "B" + String(index+(currentPage*5)+1);
        const checked = userSelect?.[name];

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
            defaultChecked={checked}
            getSelect={(n, v) => getSelect(n, v)} 
            />
        )
      });

  // API 호출(한번만)
  useEffect(() => { QuestionCall() }, []);

  // 페이지가 바뀔 때마다 마우스 스크롤 위로!
  useEffect(() => { window.scrollTo({top: 0, behavior:"smooth"}) }, [currentPage]);

  return (
    <Article long={true}>
      <Progressbar 
        text="검사 진행률" 
        percent={percent} 
        testPage={true} />
      <FormProvider {...methods} >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          { renderQ }
          <ButtonBox>
            <Button 
              type="button" 
              text="이전" 
              movePrevPage={movePrevPage} />
            <Button 
              type="submit" 
              text={currentPage !== 5 ? "다음" : "제출"} />
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