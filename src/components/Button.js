import styled from "styled-components";

export function Button(props) {

  const buttonname = props.name;
  const nextbutton = props.nextbutton;

  function handleClick() {
    if (buttonname === "next") {
      props.nextpage();
    } else if (buttonname === "prev") {
      props.prevpage();
    } else if (buttonname === "repage") {
      props.repage();
    }
  }

  return (
    <ButtonStyle 
      type="button" 
      onClick={handleClick} 
      name={props.name} 
      className={props.classname}>
        {props.text}
    </ButtonStyle>
  );
}

// styled-components
const ButtonStyle = styled.button`
    width: 130px;
    height: 40px;

    font-size: 17px;
    font-weight: bold;

    color: #6558f5;

    background-color: white;
    border-color: #d3dae0;
    border-width: 3px;
    border-style: solid;
    border-radius: 5px;

    cursor: pointer;

    &.activity {
      width: 130px;
      height: 40px;

      font-size: 17px;
      font-weight: bold;

      color: white;

      background-color: #6558f5;
      border-color: #d3dae0;
      border-width: 3px;
      border-style: solid;
      border-radius: 5px;

      cursor: pointer;
    }
`;