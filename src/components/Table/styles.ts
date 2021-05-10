import styled from 'styled-components';

export const TextField = styled.input`
  height: 32px;
  width: 250px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  :hover {
    cursor: pointer;
  }
`;
export const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: lightblue;
  height: 34px;
  width: 55px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerForm = styled.div`
    padding-top:50px; 
    border-top: 1px solid black

`;