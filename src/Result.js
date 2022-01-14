import React, { useEffect } from "react";
import { Article, Explanation } from './components/Styled';
import { Button } from './components/Button';
import { BarChart } from './components/Chart';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import styled from "styled-components";
import { getTodayDate } from './functions/getTodayDate';
import { useSelector } from "react-redux";

export function Result() {

  // 유저 이름, 성별, 결과 값 가져오기
  const reduxtState = useSelector(state => state);
  const username = reduxtState?.user_name;
  const usergender = reduxtState?.user_gender;
  const result = JSON.parse(sessionStorage.getItem('result'));
  const maxValue = JSON.parse(sessionStorage.getItem('maxValue'));

  console.log("maxValue", maxValue);

  // 날짜 구하기
  const TodayDate = getTodayDate();

  // 학력별 직업 정보 가져오는 함수
  async function schoolCall() {
    try {
      const response = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${maxValue?.[0]}` + `${maxValue[1] ? "&no2=" + maxValue[1] : null}`);
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
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
        <br />
        중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
        </Explanation>
      <UserTable>
        <div>이름</div>
        <div>성별</div>
        <div>검사일</div>
        <div>{username}</div>
        <div>{usergender}</div>
        <div>{TodayDate}</div>
      </UserTable>
      <TableTitle>직업가치관 결과</TableTitle>
      <BarChart values={result} />
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

  margin: 50px 0;
`;

const UserTable = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50%;

    border: 1px solid gray;

    width: 700px;
    height: 80px;

    margin-top: 40px;

    & div {
      border: 1px solid gray;
      border-collapse: collapse;
      
      text-align: center;
      line-height: 40px;
    }
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