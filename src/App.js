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

  // 결과값 받아오면서 생긴 변수들
  const max_value = useRef([]);
  const min_value = useRef([]);

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

  // 가공한 결과 값을 활용해서 POST 요청하는 함수
  const resultList = (ob) => {
    const sorted_object = objectSort(ob);
    console.log("전체 항목을 정렬했습니다", sorted_object);
    const string_object = objectString(sorted_object);
    console.log("전체 항목을 문자로 바꿨습니다", string_object);

    // Post 요청
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
        "answers": "B1=1 B2=3 B3=6 B4=8 B5=9 B6=11 B7=14 B8=15 B9=18 B10=19 B11=21 B12=24 B13=26 B14=28 B15=29 B16=32 B17=33 B18=36 B19=38 B20=40 B21=42 B22=43 B23=45 B24=47 B25=50 B26=52 B27=54 B28=56" //string_object
      },
       }).then((response) => {
          console.log("response.data 입니다", response.data.RESULT.url);

          const url = response.data.RESULT.url;
          console.log("이것은 추출한 data", url);

          const url_seq = url.split('=')[1];
          console.log("이것은 추출한 url_seq", url_seq);

          // Get 요청
          axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${url_seq}`)
          .then((response) => {
            console.log("이것은 결과값을 get한 데이터입니다", response.data);

            const score = response.data.result.wonScore;
            console.log("이것은 score입니다", score);

            // 받아온 결과 값(score) 가공 : 상대적으로 중요시 하는 가치와 덜 중요한 가치 뽑기
            const score_value = ["능력발휘", "자율성", "보수", "안정성", "사회적 안정", "사회봉사", "자기계발", "창의성"]
            const score_list = score.split(' ');
            const score_new_list = score_list.map((num, index)=>{
              const data = num.split('=');
              let score_object = [];
              score_object = {...score_object, [score_value[index]] : Number(data[1])};
              return score_object
            })
            
            console.log("가공된 데이터는", score_new_list);

            const score_object_key = Object.keys(score_new_list).slice(0,-1); // 끝에 undefined 없애기
            const score_object_value = Object.values(score_new_list).slice(0,-1); // 끝에 null 없애기

            const max = Math.max(...score_object_value);
            const min = Math.min(...score_object_value);

            console.log("key는", score_object_key);
            console.log("value는", score_object_value);
            console.log("max는", max);
            console.log("min은", min);

            for (var i in score_object_value) {
              if (score_object_value[i] === min) {
                min_value.current.push(score_object_key[i]);
              } else if (score_object_value[i] === max) {
                max_value.current.push(score_object_key[i]);
              }
            }

            console.log("max_value는", max_value.current);
            console.log("min_value", min_value.current);

          })
          .catch((error) => {
            console.log(error, "GET 에러입니다 ㅡㅡ");
          })
      }).catch((error) => {
        console.log(error, "POST 에러입니다 ㅡㅡ");
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
        <Route path="/finish" element={<Finish 
          username={nameRef.current} 
          maxvalue={max_value.current}
          min_value={min_value.current}
           />} />
        <Route path="/result" element={<Result />} 
          username={nameRef.current} 
          usergender={genderRef.current}
          maxvalue={max_value.current}
          min_value={min_value.current} />
      </Routes>
    </>
  );
}

export default App;
