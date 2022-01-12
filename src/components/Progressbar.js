import styled from "styled-components";

export function Progressbar(props) {
  return (
  <div>
    <Percent>
      <h2>{props.text}</h2>
      <h2>{props.percent}%</h2>
    </Percent>
    <ProgressbarBox>
      <ProgressbarGauge />
    </ProgressbarBox>
  </div>);
  }

// styled-components
const Percent = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProgressbarBox = styled.div`
  width: 700px;
  height: 30px;

  border-radius: 10px;

  background-color: white;

  overflow: hidden;

  margin: 10px 0;
`;

const ProgressbarGauge = styled.div`
  width: ${props => props.percent ? props.percent + "%" : "200px"};
  height: 100%;

  background-color: #ec5990;

`;