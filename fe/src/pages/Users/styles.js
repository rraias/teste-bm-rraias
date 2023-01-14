import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
  align-items: center;
  justify-content: left;
  gap: 20px;
  margin-bottom: 24px;

  .user {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 300px;

    p {
    margin-bottom: 4px;
  }

  span {
    font-weight: 800;
  }

  button {
    border: none;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.danger[300]}
  }
  }




`;
