import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;

  h1 {
    margin-bottom: 16px;
  }

  .priority {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    gap: 12px;

    strong {
      width: 60px;
      text-align: center;
      border: 1px solid black;
    }

    .high{
      background: ${({ theme }) => theme.colors.priority.high}
    }

    .medium {
      background: ${({ theme }) => theme.colors.priority.medium}
    }

    .low {
      background: ${({ theme }) => theme.colors.priority.low}
    }
  }

  a {
    margin-top: 32px;
    font-size: 24px;
    text-decoration: none;
    color: #000;
    padding: 8px 12px;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 44px;
    margin-top: 22px;
  }

`;

export const Task = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0px 32px;
  width: 100%;
  height: 70px;
  background: ${({ theme, priority, stage }) => (stage === 'done'
    ? theme.colors.success[300] : theme.colors.priority[priority])};
  border-radius: 20px;
  gap: 16px;

  h4 {
    max-width: 100px;
    width: 100%;
  }

  small {
    width: 50%;
    max-width: 800px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .execution {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 18px;
  }

  p {
    max-width: 100px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    }

    & + & {
      margin-top: 26px;
    }

    button {
        font-size: 22px;
        border: none;
        background: transparent;
        color: ${({ theme }) => theme.colors.primary[800]}
    }

`;
