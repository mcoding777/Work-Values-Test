import React, 
{ useState, 
  useEffect, 
  useCallback,
  useRef,
  forwardRef, } from "react";
import "../css/CheckBox.css";

export function CheckBox(props) {
  console.log("CheckBox 컴포넌트가 실행됐습니다.");

  /*
  function handleChecked(event) {
    setInput((cur) => {
      const newcur = {
      ...cur,
      name: event.target.name,
      select: event.target.value,}
      return newcur;
    });
  }
  */

  // useCallback(함수, [변경 인지할 값])
  function handleChecked(event) {
    console.log("선택한 항목이 바뀌었습니다!");
    props.updateResult({
      name: event.target.name,
      select: event.target.value});
  }

  return (
    <div className="checkbox" style={props.cb}>
      <p>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
      <div className="radiobox" style={props.rb}>
        <label title={props.value01}>
          <div><input type="radio" 
          name={props.name} 
          value={1}
          onClick={handleChecked} />{props.answer01}</div>
        </label>
        <label title={props.value02}>
          <div><input type="radio" 
          name={props.name} 
          value={2} 
          onClick={handleChecked} />{props.answer02}</div>
        </label>
      </div>
    </div>
  );
}
