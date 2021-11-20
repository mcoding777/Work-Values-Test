import React, { useState } from "react";
import axios from 'axios';
import {
  Link,
} from 'react-router-dom';
import { CheckBox } from "./CheckBox";


// 검사 진행 페이지
export function Test() {
  const [checked, setChecked] = useState(false);
  const [percent, setPercent] = useState(0);
  let data = "";
  
  async function asyncCall() {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const result = response.data.RESULT[0];
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  asyncCall()

  return (
    <div className="ex_container">
      <div className="ex_gauge">
        <div className="ex_percent">
          <h2>검사진행</h2>
          <h2>{percent}%</h2>
        </div>
        <div className="ex_progressbar"></div>
      </div>
      <CheckBox name="1"/>
      <CheckBox name="2" />
      <CheckBox name="3" />
      <CheckBox name="4" />
      <CheckBox name="5" />
      <div className="buttonbox">
        <Link to="/example">
        <button className="prev_btn">이전</button>
        </Link>
        <Link to={checked ? "/example" : "/test"}>
        <button className="next_btn">다음</button>
        </Link>
      </div>
    </div>
  );
}