import { css } from '@emotion/react';

export const global = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    list-style-type: none;
  }

  body {
    min-height: 100vh;
    background: green;
    color: black;
  }

  img {
    object-fit: cover;
    // object-position: 0 30%;
    vertical-align: middle;
  }

  button {
    margin: 0;
    font-size: inherit;
    line-height: inherit;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: black;
      background: aliceblue;
    }
  }
`;
