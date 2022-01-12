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

    all: unset;

    font-weight: bold;

    background-color: #ec5990;
    border-radius: 5px;

    padding: 10px 30px;

    cursor: pointer;
`;