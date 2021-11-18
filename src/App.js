import './index.css';
import React from "react";
import { Main } from './components/Main';
import { Example } from './components/Example';
import {
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </>
  );
}

export default App;
