import styled from 'styled-components';

export const ModaOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalWindow = styled.div`
  max-width: calc(100vw - 96px);
  max-height: calc(100vh - 48px); 

  padding-bottom: 60px;
  margin-bottom: 40px;
  margin-top: 40px;
`;
