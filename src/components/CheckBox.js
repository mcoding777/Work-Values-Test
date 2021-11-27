import React, 
{ useState, 
  useEffect, 
  useCallback,
  useRef,
  forwardRef, } from "react";
import "../css/CheckBox.css";

export function CheckBox(props) {
  console.log("CheckBox 컴포넌트가 렌더링 됐습니다.");

  // 항목 1에 대한 정보
  const title01 = props.value01;
  const value01 = props.answerscore01;
  const answer01 = props.answer01;

  // 항목 2에 대한 정보
  const title02 = props.value02;
  const value02 = props.answerscore02;
  const answer02 = props.answer02;

  // 공통 정보
  const name = props.name;
  const checked = props.checked;

  console.log("checked는", checked);

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
        <label title={title01}>
          <div><input type="radio" 
          name={name} 
          value={value01}
          onClick={handleChecked} 
          checked={checked === value01 ? "checked" : false} 
          />{answer01}</div>
        </label>
        <label title={title02}>
          <div><input type="radio" 
          name={name} 
          value={value02} 
          onClick={handleChecked} 
          checked={checked === value02 ? "checked" : false}
          />{answer02}</div>
        </label>
      </div>
    </div>
  );
}
