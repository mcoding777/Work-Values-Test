import './index.css';
import React, {useState} from "react";

// 검사 시작 페이지
function Main() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  function getGender(event) {
    {setGender(event.target.value)}
  }

  return (
    <div className="main_container">
      <div className="title">
        <h1>직업가치관검사</h1>
      </div>
      <div className="name">
        <p>이름</p>
        <input onChange={(event) => {setName(event.target.value)}} />
      </div>
      <div className="gender">
        <p>성별</p>
        <div><input type="radio" name="radio" value="male" onClick={getGender} />남자</div>
        <div><input type="radio" name="radio" value="female" onClick={getGender} />여자</div>
      </div>
      <div><button className={name && gender ? "btn_click" : "btn"}>검사 시작</button></div>
    </div>
  )
}

// 검사 예시 페이지
function Example() {
  return (
    <div className="ex_container">
      <div className="gauge">
        <div className="percent">
          <h2>검사예시</h2>
          <h2>0%</h2>
        </div>
        <div className="progressbar"></div>
      </div>
      <div className="explanation">
        <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
        <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
      </div>
      <div className="checkbox">
        <p>아래 두 개의 가치 중에서 자신에게 더 중요한 가치를 선택하세요.</p>
        <div className="radiobox">
          <div><input type="radio" name="radio" />능력발휘</div>
          <div><input type="radio" name="radio" />자율성</div>
        </div>
      </div>
      <button className="go_btn">검사 시작</button>
    </div>
  )
}


function App() {
  return (
    <Example />
  );
}

export default App;
