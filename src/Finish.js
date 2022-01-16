import { useState, useEffect } from "react";
import { Button } from './components/Button';
import { Article, Explanation } from './components/Styled';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { objectToString } from './functions/objectToString';

// 검사 예시 페이지

export function Finish() {
  // 리덕스에서 유저 이름, 성별, 선택 값 가져오기
  const reduxtState = useSelector(state => state);
  const username = reduxtState?.user_name;
  const usergender = reduxtState?.user_gender;
  const total = reduxtState?.user_select;

  // 가공한 결과 값을 활용해서 POST 요청하는 함수
  useEffect(() => {
    const string_total = objectToString(total); // B1=2 B2=4... 형태로 변경
    console.log("string_total", string_total);

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
        "answers": string_total
      },
       }) // Post 요청 결과 값이 주소로 옴 ㅡㅡ
       .then((response) => {
          const url = response.data.RESULT.url;
          console.log("data", url);

          const url_seq = url.split('=')[1];
          console.log("url_seq", url_seq);

          // url_seq로 결과 값 Get 요청
          axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${url_seq}`)
          .then((response) => {
            console.log("response.data", response.data);

            const score = (response.data.result.wonScore).trim();
            console.log("score", score);

            // score 가공 : 상대적으로 중요시 하는 가치와 덜 중요한 가치 뽑기
            const score_list = score.split(' ');
            let score_object;
            score_list.forEach((num, index) => {
              const data = num.split('=')[1];
              score_object = {
                ...score_object, 
                [index] : Number(data)
              };
            });
            console.log("score_object", score_object);
            sessionStorage.setItem('result', JSON.stringify(score_object))
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
        검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
        <br />
        중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
        <br />
        <br />
        결과가 궁금하다면 아래 '결과 보기'를 눌러주세요 :)
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