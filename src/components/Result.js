import React from "react";
import "../css/Result.css";
import { Button } from './Button';
import {
  Link,
} from 'react-router-dom';

export function Result(props) {
  console.log("Result 컴포넌트가 렌더링 됐습니다.");

  const username = props.username;
  const usergender = props.usergender;
  const 

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
        <div>엘리스</div>
        <div>남</div>
        <div>2021.01.01</div>
      </div>
      <p className="graphtitle">직업가치관결과</p>
      <div className="graph">
          <div><span>능력<br/>발휘</span></div>
          <div><span>자율성</span></div>
          <div><span>보수</span></div>
          <div><span>안정성</span></div>
          <div><span>사회적<br/>인정</span></div>
          <div><span>사회<br/>봉사</span></div>
          <div><span>자기<br/>계발</span></div>
          <div><span>창의성</span></div>
      </div>
      <div className="buttonContainer">
        <Link to="/example">
          <Button text="결과 보기" classname="btn" />
        </Link>
      </div>
    </div>
  );
}