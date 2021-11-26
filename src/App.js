import React, { useState, useEffect, useRef } from "react";
import { Main } from './components/Main';
import { Example } from './components/Example';
import { Test } from './components/Test';
import { Finish } from './components/Finish';
import { Result } from './components/Result';
import axios from 'axios';
import {
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  console.log("App 컴포넌트가 렌더링 됐습니다.");

  const nameRef = useRef("");
  const genderRef = useRef("");

  // 이름과 성별 바꾸는 함수
  function changeUser(name, gender) {
    nameRef.current = name;
    genderRef.current = gender;
    console.log("App 컴포넌트에서 이름과 성별 바뀜");
  }
  
  // 페이지 관련 변수
  const [result, setResult] = useState([]);
  const page = Math.ceil(result.length / 5);
  const [pagenumber, setPageNumber] = useState(0);
  const currentradio = result.slice(pagenumber*5, (pagenumber+1)*5)
  const percent = Math.floor((pagenumber+1)/page*100)

  // 호출한 API 상태 관리하는 변수
  async function asyncCall() {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const res = response.data.RESULT;
      setResult([...res]);
    } catch (error) {
      console.error(error);
    }
  }

  // API 호출(한번만)
  useEffect(() => asyncCall(), []);

  // 반응 후크 사용 효과는 '결과'가 누락된 종속성을 가지고 있습니다. 종속 배열을 포함하거나 제거합니다. 'setCurrentRadio'의 현재 값이 '결과' 반응 후크/철저한 deps의 현재 값이 필요한 경우 여러 사용상태 변수를 사용감소로 대체할 수도 있습니다.

  function changPage(page) {
    console.log("페이지를 변경합니다",page);
    setPageNumber(page);
  }

  /* 선택한 항목을 기준으로 POST 요청
  axios({
    method: "post",
    url: "https://inspct.career.go.kr/openapi/test/report",
    data: {
      "apikey": "fbc9e4d5e474e6e35b5de6d43988d70d",
      "qestrnSeq": "6",
      "trgetSe": "100209",
      "name": "홍길동",
      "gender": "100323",
      "grade": "",
      "startDtm": 1550466291034,
      "answers": "B1=1 B2=3 B3=6 B4=8 B5=9 B6=11 B7=14 B8=15 B9=18 B10=19 B11=21 B12=24 B13=26 B14=28 B15=29 B16=32 B17=33 B18=36 B19=38 B20=40 B21=42 B22=43 B23=45 B24=47 B25=50 B26=52 B27=54 B28=56"
    },
  }).then((response) => {
      console.log(response.data);
  });
  */

  /* POST로 받은 URL에서 데이터 추출
  axios.get('https://www.career.go.kr/inspct/api/psycho/report?seq=NTU3MzEwMTk')
  .then((response) => {
    console.log("이것은 결과값을 get한 데이터입니다", response.data);
  })
  .catch((error) => {
    console.log(error);
  })
  */

  return (
    <>
      <Routes>
        <Route path="/" element={<Main state={changeUser} />} />
        <Route path="/example" element={<Example />} />
        <Route path={"/test/:id"} element={<Test 
          pagenumber={pagenumber} 
          changpage={changPage} 
          currentradio={currentradio} 
          percent={percent}
           />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
