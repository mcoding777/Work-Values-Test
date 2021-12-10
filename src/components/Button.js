import React from "react";
import "../css/Button.css";

// 버튼

export function Button(props) {
  console.log("Button 컴포넌트가 렌더링 됐습니다.");
    
  const nextpage = props.nextpage;
  const prevpage = props.prevpage;
  const repage = props.repage;
  const buttonname = props.name;
  const nextbutton = props.nextbutton;

  function handleClick() {
    if (buttonname === "next") {
      nextpage();
      console.log("다음 버튼을 클릭했습니다");
    } else if (buttonname === "prev") {
      prevpage();
      console.log("이전 버튼을 클릭했습니다");
    } else if (buttonname === "repage") {
      console.log("다시검사 버튼을 클릭했습니다");
      repage();
    }
  }

  return (
    <button type="button" onClick={handleClick} name={props.name} 
      className={props.classname}>{props.text}</button>
  );
}