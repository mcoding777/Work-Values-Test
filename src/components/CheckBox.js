import React from "react";
import "../css/CheckBox.css";

export function CheckBox(props) {

  function handleChecked() {
    props.onClick();
  }

  return (
    <div className="checkbox" style={props.cb}>
      <p>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
      <div className="radiobox" style={props.rb}>
        <div><input type="radio" 
          name={props.name} 
          onClick={handleChecked} />{props.answer01}</div>
        <div><input type="radio" 
          name={props.name} 
          onClick={handleChecked} />{props.answer02}</div>
      </div>
    </div>
  );
}
