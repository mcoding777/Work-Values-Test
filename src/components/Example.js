import React, { useState } from "react";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import { CheckBox } from "./CheckBox";
import "../css/Example.css";
import {
  Link,
} from 'react-router-dom';


// 검사 예시 페이지
export function Example() {
  const [checked, setChecked] = useState(false);

  function handleClick() {setChecked(true);}

  return (
    <div className="container" style={{marginTop:"10%"}}>
      <Progressbar text="검사예시" percent="0" />
      <div className="explanation">
        <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
        <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
      </div>
      <CheckBox onClick={handleClick} name="ex" answer01="능력발휘" answer02="자율성" />
      <div className="buttonContainer">
        <Link to={checked ? "/test/1" : "/example"}>
          <Button checked={checked} text="검사시작" />
        </Link>
      </div>
    </div>
  );
}
