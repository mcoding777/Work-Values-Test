import React, { useState } from "react";
import {
  Link, Routes, Route,
} from 'react-router-dom';
import { CheckBox5 } from "./CheckBox5";
import "../css/Test.css";


// 검사 진행 페이지
export function Test() {
  const [checked, setChecked] = useState(false);
  const [percent, setPercent] = useState(0);
  let data = "";

  function handleCheck() {
    setChecked(true);
  }

  return (
    <div className="container">
      <div className="gauge">
        <div className="percent">
          <h2>검사진행</h2>
          <h2>{percent}%</h2>
        </div>
        <div className="progressbar"></div>
      </div>
      {/* <Routes>
        <Route path="/test/1" element={<CheckBox5 />} />
      </Routes> */}
      <CheckBox5 topic={handleCheck} />
      <div className="buttonbox">
        <Link to="/example">
          <button className="prev_btn">이전</button>
        </Link>
        <Link to={checked ? "/finish" : "/test/1"}>
          <button className="next_btn">다음</button>
        </Link>
      </div>
    </div>
  );
}