import React, { useEffect } from "react";
import { Article, Explanation } from './components/Styled';
import { Button } from './components/Button';
import { ResultChart } from './chart/ResultChart';
import UserTable from './chart/UserTable';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import styled from "styled-components";
import { getTodayDate } from './functions/getTodayDate';
import { useSelector } from "react-redux";

export function Result() {

  // 가치별 인덱스
  const valueIndex = {
    0: "능력발휘", 
    1: "자율성", 
    2: "보수", 
    3: "안정성", 
    4: "사회적인정", 
    5: "사회봉사", 
    6: "자기계발", 
    7: "창의성"
  };

  // 유저 이름, 성별, 결과 값 가져오기
  const reduxtState = useSelector(state => state);
  const username = "임미선" //reduxtState?.user_name;
  const usergender = "여자" //reduxtState?.user_gender;
  const result = JSON.parse(sessionStorage.getItem('result'));
  const [firstValue, secondValue] = getTopValue();
  console.log("firstValue", firstValue);
  console.log("secondValue", secondValue);

  // 날짜 구하기
  const TodayDate = getTodayDate();

  // 직업 정보를 가져오기위한 최고 가치관 2개 구하는 함수
  function getTopValue() {
    const maxValue = Math.max(...Object.values(result));
    const maxValueArray = [];

    for (let i in result) {
      result[i] === maxValue && maxValueArray.push(Number(i));
    }

    return [(maxValueArray?.[0] + 1), (maxValueArray?.[1] + 1)];
  };

  // 학력별 직업 정보 가져오는 함수
  async function schoolCall() {
    try {
      const response = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstValue}&no2=${secondValue}`);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  }

  // 추천 직업 받아오기
  useEffect(() => { schoolCall() }, []);

  return (
    <Article long={true}>
        <Title>직업가치관검사 결과표</Title>
        <Explanation>

        </Explanation>
      <UserTable name={username} gender={usergender} date={TodayDate} />
      <TableTitle>직업가치관 결과</TableTitle>
      <ResultChart values={result} />
      <div className="values">
        <TableTitle>나의 가치관과 관련이 높은 직업 (학력별)</TableTitle>
        <JobTable>
          <div>분야</div>
          <div>직업명</div>
          <div>고졸</div>
          <div>고졸내용</div>
          <div>전문대졸</div>
          <div>전문대졸내용</div>
          <div>대졸</div>
          <div>대졸내용</div>
          <div>대학원졸</div>
          <div>대학원졸내용</div>
      </JobTable>
      <TableTitle>나의 가치관과 관련이 높은 직업 (전공별)</TableTitle>
        <JobTable>
          <div>계열무관</div>
          <div>계열무관내용</div>
          <div>인문</div>
          <div>인문내용</div>
          <div>사회</div>
          <div>사회내용</div>
          <div>교육</div>
          <div>교육내용</div>
          <div>공학</div>
          <div>공학내용</div>
          <div>자연</div>
          <div>자연내용</div>
          <div>의학</div>
          <div>의학내용</div>
          <div>예체능</div>
          <div>예체능내용</div>
      </JobTable>
      </div>
      <LinkBox to="/" onClick={() => { sessionStorage.clear(); }}>
        <Button text="다시 검사" type="button" />
      </LinkBox>
    </Article>
  );
}

// styled-components
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;

  border-bottom: 5px solid #ec5990;

  margin: 50px 0 30px 0;
`;

const TableTitle = styled.p`
  width: 800px;

  text-align: left;

  font-weight: bold;
  font-size: 1.5rem;

  margin-top: 50px;
  margin-bottom: 10px;
`;

const JobTable = styled.div`
  width: 700px;
  height: 400px;
`;

const LinkBox = styled(Link)`
  margin: 50px 0;
`;