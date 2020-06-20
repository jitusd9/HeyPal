import { createGlobalStyle } from 'styled-components';
import white from '../src/images/texture-white.png';
import black from '../src/images/texture-black.png';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    ${'' /* align-items: center; */}
    background: url(${black}), url(${white}) ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    ${'' /* transition: background 0.2s; */}
  }
  `