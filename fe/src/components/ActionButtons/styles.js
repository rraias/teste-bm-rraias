import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;

    button {
    border: 0;
    font-size: 16px;

    &[disabled] {
      text-decoration: line-through;
    }
  }

    a {
      text-decoration: none;
      color: black;
        }
`;
