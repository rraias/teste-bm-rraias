import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center
`;

export const Container = styled.div`
  max-width: 450px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > h1 {
    font-size: 22px;
    color: #000;
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    border: none;
    font-size: 18px;
    background: transparent;
    color: ${({ theme }) => (theme.colors.danger[500])};

  }

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 18px;
    margin-right: 24px;
    color: ${({ theme }) => (theme.colors.primary[400])};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
