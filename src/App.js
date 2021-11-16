function Main() {
  return (
    <>
      <div>
        <h1>직업가치관검사</h1>
      </div>
      <div>
        <p>이름</p>
        <input />
      </div>
      <div>
        <p>성별</p>
          <div><input type="radio" />남자</div>
          <div><input type="radio" />여자</div>
      </div>
      <button>검사 시작</button>
    </>
  )
}


function App() {
  return (
    <Main />
  );
}

export default App;
