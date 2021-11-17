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
        <h2>검사 예시</h2>
        <progress value="20" max="100" />
        <div className="progressbar"></div>
      </div>
    </div>
  )
}


function App() {
  return (
    <Example />
  );
}

export default App;
