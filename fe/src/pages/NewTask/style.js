import styled from 'styled-components';

export default styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  width: 100%;

  h1 {
    margin-bottom: 20px;
  }

  .priority, .stage, .expires-in{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    gap: 12px;

    input[type="date"] {
      width: 60%;
    }
  }
`;
