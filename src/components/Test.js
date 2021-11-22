import React, { useState } from "react";
import { CheckBox5 } from "./CheckBox5";
import { Button } from './Button';
import "../css/Test.css";
import {
  Link, Routes, Route,
} from 'react-router-dom';


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
          <Button text="이전" />
        </Link>
        <Link to={checked ? "/finish" : "/test/1"}>
          <Button text="다음" />
        </Link>
      </div>
    </div>
  );
}