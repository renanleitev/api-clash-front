import styled, { createGlobalStyle } from 'styled-components';
import { injectStyle } from 'react-toastify/dist/inject-style';
import * as colors from './colors';

injectStyle();

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: Roboto;
        color: ${colors.primaryWhiteColor};
        background-image: url('https://developer.clashroyale.com/front-bg-small.563aa8.jpg');
    }
    html, body, #root {
        height: 100%;
    }
    button {
        cursor: pointer;
        background: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
    }
    a {
        text-decoration: none;
        color: ${colors.primaryWhiteColor};
    }
    a:hover{
        color: ${colors.infoColor};
    }
    ul {
        list-style: none;
    }
    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        margin-top: 70px;
        background-color: ${colors.sucessColor};
        color: white;
    }
    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        margin-top: 50px;
        background-color: ${colors.errorColor};
        color: white;
    }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  h1,
  h2 {
    text-align: center;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
