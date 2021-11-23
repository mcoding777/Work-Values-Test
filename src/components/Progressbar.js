import React from "react";
import "../css/Progressbar.css";

export function Progressbar(props) {
  return <div className="gauge">
    <div className="percent">
      <h2>{props.text}</h2>
      <h2>{props.percent}%</h2>
    </div>
    <div className="progressbar"></div>
  </div>;
}
