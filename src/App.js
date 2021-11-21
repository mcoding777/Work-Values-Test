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
  const [gender, setGender] = useState("");
  
  function changeUser(name, gender) {
    setName(name);
    setGender(gender);
  }

  console.log(name);
  console.log(gender);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main changeuser={changeUser} />} />
        <Route path="/example" element={<Example />} />
        <Route path="/test/1" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
