import normalize from "styled-normalize";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body {
    height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    font-size: 16px;
    font-size: 1.6rem;
    font-family: 'Roboto Mono', monospace;
    word-break: break-word;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rubik', sans-serif;
    margin: 0.5em 0;
    color: ${(props) => props.theme.text};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  iframe {
    margin: 0 auto;
    display: block;
    max-width: 100%;
    width: 100%;
  }

  blockquote {
    margin-left: 1em;
    margin-right: 1em;
    color: ${(props) => props.theme.muted};

    @media (min-width: 520px) {
      margin-left: 2em;
      margin-right: 2em;
    }
  }

  figure {
    margin: 0;
  }

  ul {
    padding: 0;
    list-style: square;
    margin-left: 1.2em;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.link};
    border-bottom: 2px solid transparent;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: ${(props) => props.theme.linkHover};
      border-color: ${(props) => props.theme.linkHover};
    }

    &.anchor {
      border: none;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${(props) => props.theme.muted};
    opacity: 0.3;
    margin: 2em 0;
  }
`;

export default GlobalStyle;
