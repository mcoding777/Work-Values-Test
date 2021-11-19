import React, { useState } from "react";
import {
  Link,
} from 'react-router-dom';

// 검사 진행 페이지
export function Test() {
  const [checked, setChecked] = useState(false);
  const [percent, setPercent] = useState(0);
  return (
    <div className="ex_container">
      <div className="ex_gauge">
        <div className="ex_percent">
          <h2>검사진행</h2>
          <h2>{percent}%</h2>
        </div>
        <div className="ex_progressbar"></div>
      </div>
      <div className="checkbox">
        <p>아래 두 개의 가치 중에서 자신에게 더 중요한 가치를 선택하세요.</p>
        <div className="ex_radiobox">
          <div><input type="radio" name="radio" />answer01</div>
          <div><input type="radio" name="radio" />answer02</div>
        </div>
      </div>
      <div className="buttonbox">
        <Link to={checked ? "/example" : "/test"}>
        <button className="prev_btn">이전</button>
        </Link>
        <Link to={checked ? "/example" : "/test"}>
        <button className="next_btn">다음</button>
        </Link>
      </div>
    </div>
  );
}