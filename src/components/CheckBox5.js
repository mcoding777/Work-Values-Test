import React, { useState } from "react";
import { CheckBox } from "./CheckBox";
import axios from 'axios';

export function CheckBox5() {
  const [result, setResult] = useState([]);
  const [answer01, setAnswer01] = useState("");
  const [answer02, setAnswer02] = useState("");

  async function asyncCall() {
    try {
      const response = await axios.get('https://inspct.career.go.kr/openapi/test/questions?apikey=fbc9e4d5e474e6e35b5de6d43988d70d&q=6');
      const res = response.data.RESULT;
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  console.log(asyncCall());

  return (
    <>
      <CheckBox name="0" answer01={answer01} answer02={answer02} />
      <CheckBox name="1" answer01={answer01} answer02={answer02} />
      <CheckBox name="2" answer01={answer01} answer02={answer02} />
      <CheckBox name="3" answer01={answer01} answer02={answer02} />
      <CheckBox name="4" answer01={answer01} answer02={answer02} />
    </>
  );
}
