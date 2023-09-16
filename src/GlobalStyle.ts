import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  html {
    font-size: 62.5%; /* 1rem이 10px로 설정됨 */
  }
`;

export default GlobalStyle;