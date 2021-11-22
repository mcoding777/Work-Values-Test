import React from "react";

export function CheckBox(props) {
  return (
    <div className="checkbox" style={{height:100, paddingTop:20}}>
      <p>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
      <div className="radiobox" style={{margin:"35px auto"}}>
        <div><input type="radio" name={props.name} />{props.answer01}</div>
        <div><input type="radio" name={props.name} />{props.answer02}</div>
      </div>
    </div>
  );
}
