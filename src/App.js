import React from "react";
import { Main } from './components/Main';
import { Example } from './components/Example';
import { Test } from './components/Test';
import { Finish } from './components/Finish';
import { Result } from './components/Result';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

function App() {
  console.log("App 컴포넌트가 렌더링 됐습니다.");
  
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/example" element={<Example />} />
        <Route path={"/test/:id"} element={<Test />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;

// styled-components
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {   
    text-align: center;
  }
`;