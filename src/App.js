import './index.css';
import React, {useState} from "react";

function Main() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  function getGender(event) {
    {setGender(event.target.value)}
  }

  return (
    <div className="container">
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


function App() {
  return (
    <Main />
  );
}

export default App;
