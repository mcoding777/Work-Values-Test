import React, 
{ useState, 
  useRef, 
  useCallback, } from "react";
import { Button } from './Button';
import { Progressbar } from './Progressbar';
import { CheckBox } from "./CheckBox";
import "../css/Example.css";
import {
  Link,
} from 'react-router-dom';

// 검사 예시 페이지

export function Example() {
  console.log("Example 컴포넌트가 렌더링 됐습니다.");

  const [checked, setChecked] = useState(false);
  const radioRef = useRef();

  function handleChecked() {
    console.log("검사시작 버튼이 이제 활성화된다!!");
    setChecked(true);
  }

  return (
    <div className="container" style={{marginTop:"10%"}}>
      <Progressbar text="검사예시" percent="0" />
      <div className="explanation">
        <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
        <p>가치의 뜻을 잘 모르겠다면 문항에 마우스 커서를 올려서 설명을 확인해보세요.</p>
      </div>
      <CheckBox updateResult={handleChecked} ref={radioRef}
        name="ex" 
        answer01="능력발휘" 
        answer02="자율성" 
        value01="직업을 통해 자신의 능력을 발휘하는 것입니다." 
        value02="일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다."
      />
      <div className="buttonContainer">
        <Link to={checked ? "/test/1" : "/example"}>
          <Button classname={checked ? "btn_click" : "btn"} 
          text="검사시작" name="start" />
        </Link>
      </div>
    </div>
  );
}
