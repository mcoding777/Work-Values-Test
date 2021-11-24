import React from "react";
import "../css/CheckBox.css";

export function CheckBox(props) {

  function handleChecked() {
    props.onClick();
  }

  return (
    <div className="checkbox">
      <p>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p>
      <div className="radiobox">
        <div><input type="radio" 
          name={props.name} 
          onClick={handleChecked} />{props.answer01}</div>
        <div><input type="radio" 
          name={props.name} 
          onClick={handleChecked} />{props.answer02}</div>
      </div>
      <div className="whatvalue">
        <p>능력발휘는 싸랄라ㅏㅏ싸ㅏㅏ싸랄ㄹㄹ</p>
        <p>자율성은 싸라라라라라ㅏ랄ㄹ</p>
      </div>
    </div>
  );
}
