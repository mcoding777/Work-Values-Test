import React from "react";

export function CheckBox(props) {
  return (
    <div className="checkbox">
      <p>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
      <div className="radiobox">
        <div><input type="radio" name={props.name} />answer01</div>
        <div><input type="radio" name={props.name} />answer02</div>
      </div>
    </div>
  );
}
