import styled from "styled-components";

export function CheckBox(props) {

  // 항목 1에 대한 정보
  const title01 = props.value01;
  const value01 = props.answerscore01;
  const answer01 = props.answer01;

  // 항목 2에 대한 정보
  const title02 = props.value02;
  const value02 = props.answerscore02;
  const answer02 = props.answer02;

  // 공통 정보
  const name = props.name;
  const checked = props.checked;

  function handleChecked(event) {
    props.updateResult({
      name: event.target.name,
      select: event.target.value});
  }

  return (
    <FlexBox>
      <Text>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</Text>
      <RadioBox>
        <label title={title01}>
          <input type="radio" 
            name={name} 
            value={value01}
            onClick={handleChecked} 
            checked={checked === value01} />
          <span>
            {answer01}
          </span> : {title01}
        </label>
        <label title={title02}>
          <input type="radio" 
            name={name} 
            value={value02} 
            onClick={handleChecked} 
            checked={checked === value02} />
          <span>
            {answer02}
          </span> : {title02}
        </label>
      </RadioBox>
    </FlexBox>
  );
}

// styled-components
const FlexBox = styled.div`
    width: 700px;
    height: 250px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;
    border-radius: 10px;

    margin-bottom: 30px;
`;

const Text = styled.p`
    font-weight: bold;
    font-size: 0.8rem;
    color: #081229;
`;

const RadioBox = styled.div`
    display: flex;
    flex-direction: column;

    text-align: left;

    line-height: 30px;

    margin: 30px 0 0 80px;

    width: 600px;

    & label {
      font-size: 0.8rem;
      color: #081229;

      & span {
        font-weight: bold;
        color: #081229;
      };
    };

    & input[type="radio"] {

      -webkit-appearance:none;
      -moz-appearance:none;
      -ms-appearance:none;
      -o-appearance:none;

      width: 13px;
      height: 13px;

      border: 2px solid #081229;
      border-radius: 13px;
      background: #ffffff;

      margin-right: 10px;
      
      &:checked::before {
        content:'';

        display:block;

        width: 75%;
        height:75%;

        margin: 13% auto;

        border-radius: 100%;

        background: #081229;
      };
    };
`;