import React, { useEffect, useState } from "react";
import "../css/Button.css";

// 버튼
export function Button(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => setName(props.name), [props.name]);
  useEffect(() => setGender(props.gender), [props.gender]);

  return (
    <button className={props.checked ? "btn_click" : "btn"}>{props.text}</button>
  );
}