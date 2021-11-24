import React, { useState, useEffect, useCallback } from "react";
import "../css/CheckBox.css";

export function CheckBox(props) {
  const [input, setInput] = useState({
    name : "",
    select : "",
  });

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

  const handleChecked = useCallback((event) => {
    setInput((cur) => {
      const newcur = {
      ...cur,
      name: event.target.name,
      select: event.target.value,}
      return newcur;
    })
  }, [props.name])
  // useCallback(함수, [변경 인지할 값])

  useEffect(() => {props.onClick(input)}, [input]);
  // 위의 코드에서 {props.onClick(input)} 부분이 문제 있음

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
