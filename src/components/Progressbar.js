import styled from "styled-components";
import { FlexBox } from "./Styled";

export function Progressbar({text, percent, testPage}) {
  return (
    <FlexBox testPage={testPage}>
      <Percent>
        <h2>{text}</h2>
        <h2>{percent}%</h2>
      </Percent>
      <ProgressbarBox>
        <ProgressbarGauge percent={percent} />
      </ProgressbarBox>
    </FlexBox>
    );
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
  width: ${props => String(props.percent) + "%"};
  height: 100%;

  background-color: #ec5990;

`;