import React, { useState, useEffect, useRef, forwardRef } from "react";
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
    console.log("이름은", nameRef);
    console.log("성별은", genderRef);
  }

  // 객체를 value 기준으로 오름차순 정렬해서 배열로 반환하는 함수
  // 반환 값 [['B1', '1'], ['B2', '2'], ['B3', '3'], ...]
  function objectSort(ob) {
    let ob_list = [];
    for (var i in ob) {
      ob_list.push([i, ob[i]]);
    }
    ob_list = ob_list.sort((a, b) => {
      return a[1] - b[1]
    })
    return ob_list;
  }

  // 배열을 string으로 반환하는 함수
  // 반환 값 "B1=1 B2=3 B3=6..."
  function objectString(ob) {
    let ob_string = "";
    for (var i in ob) {
      ob_string = ob_string + `${ob[i][0]}=${ob[i][1]} `;
    }
    return ob_string;
  }

  // 가공한 결과 값을 활용해서 POST 요청
  const resultList = (ob) => {
    const sorted_object = objectSort(ob);
    console.log("전체 항목을 정렬했습니다", sorted_object);
    const string_object = objectString(sorted_object);
    console.log("전체 항목을 문자로 바꿨습니다", string_object);

    axios({
      method: "post",
      url: "https://inspct.career.go.kr/openapi/test/report",
      data: {
        "apikey": "fbc9e4d5e474e6e35b5de6d43988d70d",
        "qestrnSeq": "6",
        "trgetSe": "100209",
        "name": nameRef.current,
        "gender": `${genderRef.current === "female" ? "100324" : "100323"}`,
        "grade": "",
        "startDtm": 1550466291034,
        "answers": string_object
      },
    }).then((response) => {
        console.log("response.data 입니다", response.data.RESULT);
    });

  }

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
        <Route path="/" element={<Main changeuser={changeUser} />} />
        <Route path="/example" element={<Example />} />
        <Route path={"/test/:id"} element={<Test resultlist={resultList} />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
