import styled from 'styled-components';

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: ${props => props.long ? "100%" : "100vh"};
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${props => props.testPage ? "50px" : "0"};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled.p`
  color: #ff6fa5;
  font-size: 0.8rem;
`;

export const Explanation = styled.p`
  line-height: 150%;

  font-size: 1rem;
  font-weight: ${props => props.resultPage || "bold"};
  text-align: ${props => props.resultPage && "left"};

  margin: ${props => props.resultPage ? "10px" : "30px"} 0;
`;