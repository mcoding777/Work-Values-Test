import React from "react";
import { Main } from './Main';
import { Example } from './Example';
import { Test } from './Test';
import { Finish } from './Finish';
import { Result } from './Result';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

function App() {

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/example" element={<Example />} />
        <Route path="/test" element={<Test />} />
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

    margin: 0;
    padding: 0;

    color: white;

    text-decoration: none;
  }

  html {
    font-size: 18px;
  }

  body {   
    text-align: center;

    background: radial-gradient( circle, #23324d, #0e172e, #081229 );
  }

  h1 {
    font-weight: bold;
    font-size: 2rem;
  }
`;