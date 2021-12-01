import React from "react";
import "../css/Result.css";
import { Button } from './Button';
import {
  Link,
} from 'react-router-dom';

export function Result(props) {
  console.log("Result 컴포넌트가 렌더링 됐습니다.");

  const username = localStorage.getItem('user_name');
  const usergender = localStorage.getItem('user_gender');
  const result = JSON.parse(localStorage.getItem('result'));

  console.log("result는", result);

  // 날짜 구하기
  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '.' + month  + '.' + day;

  return (
    <div className="container" style={{marginTop:"5%"}}>
        <h2 style={{
            borderBottom:"2px solid gray",
            width: 300,
            height: 20,
            margin: "auto",
            color: "black",
            }}>직업가치관검사 결과표</h2>
      <div className="explanation">
        <p>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,</p>
        <p>중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
      </div>
      <div className="usertable">
        <div>이름</div>
        <div>성별</div>
        <div>검사일</div>
        <div>{username}</div>
        <div>{usergender}</div>
        <div>{dateString}</div>
      </div>
      <p className="graphtitle">직업가치관결과</p>
      <div className="graph">
          <div style={{height: `${10 * result["능력발휘"]}%`}}><span>능력<br/>발휘</span></div>
          <div style={{height: `${10 * result["자율성"]}%`}}><span>자율성</span></div>
          <div style={{height: `${10 * result["보수"]}%`}}><span>보수</span></div>
          <div style={{height: `${10 * result["안정성"]}%`}}><span>안정성</span></div>
          <div style={{height: `${10 * result["사회적인정"]}%`}}><span>사회적<br/>인정</span></div>
          <div style={{height: `${10 * result["사회봉사"]}%`}}><span>사회<br/>봉사</span></div>
          <div style={{height: `${10 * result["자기계발"]}%`}}><span>자기<br/>계발</span></div>
          <div style={{height: `${10 * result["창의성"]}%`}}><span>창의성</span></div>
      </div>
      <div className="buttonContainer">
        <Link to="/example">
          <Button text="다시 검사" classname="btn" />
        </Link>
      </div>
    </div>
  );
}