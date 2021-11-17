import './index.css';

function Main() {
  return (
    <div className="container">
      <div className="title">
        <h1>직업가치관검사</h1>
      </div>
      <div className="name">
        <p>이름</p>
        <input />
      </div>
      <div className="gender">
        <p>성별</p>
        <div><input type="radio" name="radio" />남자</div>
        <div><input type="radio" name="radio" />여자</div>
      </div>
      <div><button className="btn">검사 시작</button></div>
    </div>
  )
}


function App() {
  return (
    <Main />
  );
}

export default App;
