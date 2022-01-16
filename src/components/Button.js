import styled from "styled-components";

export function Button(props) {

  return (
    <ButtonDiv>
      <ButtonStyle 
        type={props.type}
        onClick={props?.movePrevPage && props.movePrevPage}>
          {props.text}
      </ButtonStyle>
    </ButtonDiv>
  );
}

// styled-components
const ButtonDiv = styled.div`
  text-align: center;
`;

const ButtonStyle = styled.button`
    all: unset;

    width: 100px;
    height: 40px;

    font-weight: bold;

    background-color: #ec5990;
    border-radius: 10px;

    padding: 10px 30px;

    cursor: pointer;
`;