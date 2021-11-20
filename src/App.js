import './index.css';
import React, { useState } from "react";
import { Main } from './components/Main';
import { Example } from './components/Example';
import { Test } from './components/Test';
import {
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  const [name, setName] = useState("");
  
  function changeName(change) {
    {setName(change)};
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Main changename={changeName} />} />
        <Route path="/example" element={<Example />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
