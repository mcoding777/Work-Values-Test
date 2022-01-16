import { useEffect, useState } from "react";
import { Article, FlexBox, Explanation } from './components/Styled';
import { Button } from './components/Button';
import { ResultChart } from './chart/ResultChart';
import UserTable from './chart/UserTable';
import JobTable from './chart/JobTable';
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
  const firstValue = getTopValue();
  const secondValue = getTopValue();
  console.log("firstValue", firstValue);
  console.log("secondValue", secondValue);

  // 날짜 구하기
  const TodayDate = getTodayDate();

  // 학력별 직업 정보
  const [schoolJob, setSchoolJob] = useState({});
  const [majorJob, setMajorJob] = useState({});
        
  console.log("schoolJob", schoolJob);
  console.log("majorJob", majorJob);

  // 직업 정보를 가져오기 위한 최고 가치관 구하는 함수
  function getTopValue() {
    const resultValueArray = Object.values(result)
    const maxValue = Math.max(...resultValueArray);
    let topValue = resultValueArray.findIndex(item => item === maxValue);
    result[topValue] = 0;

    return topValue;
  };

  // 직업 정보 가져오는 함수
  async function jobCall() {
    try {
      const school = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      };
      await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstValue}&no2=${secondValue}`)
        .then(res => (res.data).forEach((item) => school[item[2]].push(item[1])))
        .then(() => setSchoolJob(school));

      const major = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
      };
      await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${firstValue}&no2=${secondValue}`)
        .then(res => (res.data).forEach((item) => major[item[2]].push(item[1])))
        .then(() => setMajorJob(major));

    } catch (error) {
      console.error("error", error);
    }
  }

  // 추천 직업 받아오기
  useEffect(() => { jobCall() }, []);

  return (
    <Article long={true}>
      <Title>직업가치관검사 결과표</Title>
      <UserTable name={username} gender={usergender} date={TodayDate} />
      <FlexBox>
        <TableTitle>직업가치관 결과</TableTitle>
        <Explanation resultPage={true}>
          여러분이 상대적으로 어떤 가치관을 중요하게 여기고<br />
          어떤 가치관을 덜 중요하게 여기는지 확인해보세요.
        </Explanation>
        <ResultChart index={valueIndex} values={result} />
      </FlexBox>
      <FlexBox>
        <TableTitle>나의 가치관과 관련이 높은 직업</TableTitle>
        <Explanation resultPage={true}>
          여러분이 중요하게 생각한 가치관과 관련이 높은 직업을 학력별, 직업별로 분류했습니다.<br />
          어떤 직업군이 있는지 확인해보세요.
        </Explanation>
        <JobTable type="school" jobs={schoolJob} />
        <JobTable type="major" jobs={majorJob} />
      </FlexBox>
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
`;

const LinkBox = styled(Link)`
  margin: 50px 0;
`;