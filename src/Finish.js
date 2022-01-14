import { useState, useEffect } from "react";
import { Button } from './components/Button';
import { Article } from './components/Styled';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { useSelector } from "react-redux";
import styled from "styled-components";

// 검사 예시 페이지

export function Finish() {
  // 리덕스에서 유저 이름, 성별 가져오기
  const reduxtState = useSelector(state => state);
  const username = reduxtState?.user_name;
  const usergender = reduxtState?.user_gender;

  // 세션 스토리지에서 유저가 선택한 값 가져오기
  const total = JSON.parse(sessionStorage.getItem('checked'));

  // 최종 결과(항목별 점수)를 개체화한 변수
  const [objectvalue, setObjectValue] = useState([]);

  // 결과값 받아오면서 생긴 변수들
  const [maxvalue, setMaxValue] = useState([]);
  const [minvalue, setMinValue] = useState([]);
  let maxvalue_join = maxvalue.join('');
  let minvalue_join = minvalue.join('');

  if (maxvalue && maxvalue.length >= 2) {
    maxvalue_join = maxvalue.join('와(과)');}
  if (minvalue && minvalue.length >= 2) {
    minvalue_join = minvalue.join('와(과)');}

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
    const sorted_object = objectSort(total);
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
            const score_value = ["능력발휘", "자율성", "보수", "안정성", "사회적인정", "사회봉사", "자기계발", "창의성"]
            const score_list = score.split(' ');
            let score_object;
            score_list.forEach((num, index)=>{
              const data = num.split('=');
              score_object = {...score_object, [score_value[index]] : Number(data[1])};
            })

            console.log("가공된 데이터는", score_object);

            localStorage.setItem('result', JSON.stringify(
              score_object
              ))

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
                setMinValue([...minvalue, score_object_key[x]]);}
              if (score_object_value[x] === max) {
                setMaxValue([...maxvalue, score_object_key[x]]);}
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
    <Article>
        <FinishText>검사가 완료되었습니다.</FinishText>
      <Explanation>
        검사 결과 {username}님은 상대적으로 {maxvalue_join}를(을) 중요하다고 생각하며,
        <br />
        {minvalue_join}를(을) 덜 중요하게 생각한다고 나왔습니다.
        <br />
        <br />
        더 자세한 결과는 아래 '결과 보기'를 눌러주세요 :)
      </Explanation>
      <Link to="/result">
        <Button type="button" text="결과 보기" />
      </Link>
    </Article>
  );
}

// styled-components
const FinishText = styled.h2`
  color: #ec5990;
`;
const Explanation = styled.p`
  line-height: 120%;

  font-size: 1rem;
  font-weight: bold;

  margin: 30px 0;
`;