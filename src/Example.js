import { Button } from './components/Button';
import { Progressbar } from './components/Progressbar';
import { Article, ErrorText, Form } from './components/Styled'; 
import { CheckBox } from "./components/CheckBox";
import styled from "styled-components";
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// 검사 예시 페이지

export function Example() {
  // 라우터 네비게이트
  const navigate = useNavigate();

  // useForm (양식 컨텍스트에 연결)
  const methods = useForm();
  const onSubmit = () => { navigate("/test/0"); }

  return (
    <Article>
      <Progressbar text="진행률 예시" percent="20" />
      <Explanation>
        <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
        <p>가치의 뜻을 잘 모르겠다면 설명을 확인해보세요.</p>
      </Explanation>
      <FormProvider {...methods} >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <CheckBox 
            name="ex" 
            answer01="능력발휘" 
            answer02="자율성" 
            value01="직업을 통해 자신의 능력을 발휘하는 것입니다." 
            value02="일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다." 
            checked={false} 
          />
          <Button 
            text="검사시작" 
            type="submit" />
          {methods.formState.errors?.ex && 
            <ErrorText>선택하지않은 항목이 있습니다.</ErrorText>}
        </Form>
      </FormProvider>
    </Article>
  );
}

// styled-components
const Explanation = styled.div`
  font-size: 1rem;
  color: #293845;

  margin: 30px 0;
`;