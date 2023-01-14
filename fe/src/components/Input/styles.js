import styled from 'styled-components';

export const InputField = styled.input`
  border: none;
  background: #fff;
  border-radius: 8px;
  height: 32px;
  width: 30%;
  min-width: 200px;
  padding: 0 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  text-align: center;
  font-size: 16px;

`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & + & {
    margin-top: 20px;
  }

  small {
    text-align: center;
    color: ${({ theme }) => theme.colors.danger[400]};
    max-width: 300px;
    width: 100%;
    margin-top: 4px;
  }
`;
