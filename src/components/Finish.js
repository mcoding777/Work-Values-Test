import React, { useState, useEffect } from "react";
import "../css/Finish.css";
import { Button } from './Button';
import axios from 'axios';
import {
  Link,
} from 'react-router-dom';

// 검사 예시 페이지

export function Finish(props) {
  console.log("Finish 컴포넌트가 렌더링 됐습니다.");

  const username = localStorage.getItem('user_name');
  const usergender = localStorage.getItem('user_gender');
  const resultList = JSON.parse(localStorage.getItem('total'));

  // 최종 결과(항목별 점수)를 개체화한 변수
  const [objectvalue, setObjectValue] = useState([]);

  // 결과값 받아오면서 생긴 변수들
  const [maxvalue, setMaxValue] = useState([]);
  const [minvalue, setMinValue] = useState([]);
  let maxvalue_join = maxvalue.join('');
  let minvalue_join = minvalue.join('');

  console.log("username은", username);
  console.log("maxvalue는", maxvalue);
  console.log("minvalue는", minvalue);

  if (maxvalue && maxvalue.length >= 2) {
    maxvalue_join = maxvalue.join('와(과)');
  } else if (minvalue && minvalue.length >= 2) {
    minvalue_join = minvalue.join('와(과)');
  }

  // 객체를 value 기준으로 오름차순 정렬해서 배열로 반환하는 함수
  // 반환 값 [['B1', '1'], ['B2', '2'], ['B3', '3'], ...]
  function objectSort(ob) {
    let ob_list = [];
    for (let i in ob) {
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
    for (let j in ob) {
      ob_string = ob_string + `${ob[j][0]}=${ob[j][1]} `;
    }
    return ob_string;
  }

  // 가공한 결과 값을 활용해서 POST 요청하는 함수
  useEffect(() => {
    const sorted_object = objectSort(resultList);
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
        "name": username,
        "gender": `${usergender === "female" ? "100324" : "100323"}`,
        "grade": "",
        "startDtm": 1550466291034,
        "answers": string_object
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
            let score_object;
            score_list.forEach((num, index)=>{
              const data = num.split('=');
              score_object = {...score_object, [score_value[index]] : Number(data[1])};
              console.log("가공된 데이터는", score_object);
            })
            
            console.log("가공된 데이터는", score_object);

            const score_object_key = Object.keys(score_object).slice(0,-1); // 끝에 undefined 없애기
            const score_object_value = Object.values(score_object).slice(0,-1); // 끝에 null 없애기
            setObjectValue([...score_object_value]);

            const max = Math.max(...score_object_value);
            const min = Math.min(...score_object_value);

            console.log("key는", score_object_key);
            console.log("value는", score_object_value);
            console.log("max는", max);
            console.log("min은", min);

            for (let x in score_object_value) {
              if (score_object_value[x] === min) {
                setMinValue([...minvalue, score_object_key[x]]);
              } else if (score_object_value[x] === max) {
                setMaxValue([...maxvalue, score_object_key[x]]);
              }
            }

            console.log("max_value는", maxvalue);
            console.log("min_value", minvalue);

          })
          .catch((error) => {
            console.log(error, "GET 에러입니다 ㅡㅡ");
          })
      }).catch((error) => {
        console.log(error, "POST 에러입니다 ㅡㅡ");
      });
  }, []);

  return (
    <div className="container" style={{marginTop:"20%"}}>
        <h2>검사가 완료되었습니다.</h2>
      <div className="explanation">
        <p>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,</p>
        <p>중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
        <br />
        <br />
        <p>검사 결과 {username}님은 상대적으로 {maxvalue_join}를(을) 중요하다고 생각하며,</p>
        <p>{minvalue_join}를(을) 덜 중요하게 생각한다고 나왔습니다.</p>
      </div>
      <div className="buttonContainer">
        <Link to="/result">
          <Button classname="btn" text="결과 보기" />
        </Link>
      </div>
    </div>
  );
}