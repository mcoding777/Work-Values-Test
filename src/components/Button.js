import styled from "styled-components";

export function Button(props) {

  const buttonname = props.name;
  const nextbutton = props.nextbutton;

  return (
    <ButtonStyle 
      type={props.type}>
        {props.text}
    </ButtonStyle>
  );
}

// styled-components
const ButtonStyle = styled.button`
    all: unset;

    height: 40px;

    font-weight: bold;

    background-color: #ec5990;
    border-radius: 10px;

    padding: 10px 30px;

    cursor: pointer;
`;