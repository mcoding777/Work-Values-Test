import React, { useState } from "react";
import { Main } from './components/Main';
import { Example } from './components/Example';
import { Test } from './components/Test';
import { Finish } from './components/Finish';
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
        <Route path="/test/:id" element={<Test />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </>
  );
}

export default App;
