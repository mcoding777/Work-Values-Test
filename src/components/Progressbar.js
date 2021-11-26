import React from "react";
import "../css/Progressbar.css";

export function Progressbar(props) {
  console.log("Progressbar 컴포넌트가 실행됐습니다.");
  
  return (
  <div className="gauge">
    <div className="percent">
      <h2>{props.text}</h2>
      <h2>{props.percent}%</h2>
    </div>
    <div className="progressbar_before" style={{width:props.percent+"%"}}></div>
    <div className="progressbar"></div>
  </div>);
  }
