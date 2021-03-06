import { useEffect, useState } from "react";
import { Article, FlexBox, Explanation } from './components/Styled';
import { Button } from './components/Button';
import { ResultChart } from './chart/ResultChart';
import UserTable from './chart/UserTable';
import JobTable from './chart/JobTable';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { changeUserInfo, changeUserSelect } from './components/ReduxAction';

export function Result() {

  // 리덕스 관련
  const dispatch = useDispatch();

  // 결과에 따른 최고 가치관
  const result = JSON.parse(sessionStorage.getItem('result'));
  const firstValue = getTopValue();
  const secondValue = getTopValue();
  // console.log("firstValue", firstValue);
  // console.log("secondValue", secondValue);

  // 학력별 직업 정보
  const [schoolJob, setSchoolJob] = useState({});
  const [majorJob, setMajorJob] = useState({});
        
  // console.log("schoolJob", schoolJob);
  // console.log("majorJob", majorJob);

  // 직업 정보를 가져오기 위한 최고 가치관 구하는 함수
  function getTopValue() {
    const resultValueArray = Object?.values(result)
    const maxValue = Math.max(...resultValueArray);
    let topValue = resultValueArray.findIndex(item => item === maxValue);
    result[topValue] = 0;

    return topValue + 1; // 가치관은 1부터 시작한다
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
        .then(res => res.data.forEach((item) => school[item[2]].push(item[1])))
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

  // 메인화면으로 돌아갈 때 함수
  function handleReStart() {
    dispatch(changeUserInfo("", ""));
    dispatch(changeUserSelect({}));
    sessionStorage.clear();
  }

  // 추천 직업 받아오기
  useEffect(() => { jobCall() }, []);

  return (
    <Article long={true}>
      <Title>직업가치관검사 결과표</Title>
      <UserTable />
      <FlexBox>
        <TableTitle>직업가치관 결과</TableTitle>
        <Explanation resultPage={true}>
          여러분이 상대적으로 어떤 가치관을 중요하게 여기고<br />
          어떤 가치관을 덜 중요하게 여기는지 확인해보세요.
        </Explanation>
        <ResultChart />
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
      <LinkBox to="/" onClick={handleReStart}>
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