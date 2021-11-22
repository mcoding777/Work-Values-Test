import React, { useState } from "react";
import {
  Link,
} from 'react-router-dom';
import "../css/Example.css";

// 검사 예시 페이지
export function Example() {
  const [checked, setChecked] = useState(false);

  function handleClick(event) {
    if (event.target.checked) {
      { setChecked(true); }
    }
  }
  return (
    <div className="ex_container">
      <div className="ex_gauge">
        <div className="ex_percent">
          <h2>검사예시</h2>
          <h2>0%</h2>
        </div>
        <div className="ex_progressbar"></div>
      </div>
      <div className="ex_explanation">
        <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
        <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
      </div>
      <div className="ex_checkbox">
        <p>아래 두 개의 가치 중에서 자신에게 더 중요한 가치를 선택하세요.</p>
        <div className="ex_radiobox">
          <div><input type="radio" name="radio" onClick={handleClick} />능력발휘</div>
          <div><input type="radio" name="radio" onClick={handleClick} />자율성</div>
        </div>
      </div>
      <Link to={checked ? "/test/1" : "/example"}>
        <button className={checked ? "ex_go_btn_check" : "ex_go_btn"}>검사 시작</button>
      </Link>
    </div>
  );
}