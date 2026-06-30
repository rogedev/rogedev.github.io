import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";
import GlobalStyle from "./GlobalStyle";
import { themes, lightTheme } from "./theme";

const Main = styled.main`
  max-width: 83rem;
  padding: 1em 1em 2em;
  margin: 0 auto;

  @media (min-width: 350px) {
    padding: 1em 1.5em 4em;
  }

  @media (min-width: 520px) {
    padding: 2rem 2em 6rem;
  }
`;

const StyledTitle = styled.h1`
  margin: 0.3em 0;

  @media (min-width: 350px) {
    margin: 0.5em 0 0.2em;
  }

  @media (min-width: 520px) {
    margin: 0.667em 0;
  }
`;

const TitleLink = styled(Link)`
  text-transform: lowercase;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  border: none;

  &:hover {
    color: ${(props) => props.theme.accent};
  }
`;

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Layout = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  // Sync with the pre-hydration choice on mount (avoids SSR mismatch).
  useEffect(() => {
    setThemeName(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    setThemeName((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
        document.documentElement.style.backgroundColor =
          themes[next].background;
      }
      return next;
    });
  };

  const theme = themes[themeName] || lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <GlobalStyle />

        <Helmet>
          <html lang="en" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Rubik:700&display=swap"
            rel="stylesheet"
          />
          <title>Rogelio Rivas</title>
          <meta
            name="description"
            content="Personal portfolio of Rogelio Rivas — Backend Engineer"
          />
          <meta property="og:title" content="Rogelio Rivas" />
          <meta
            property="og:description"
            content="Backend Engineer — AWS serverless & distributed systems"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://rogedev.github.io" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Rogelio Rivas" />
        </Helmet>

        <header>
          <StyledTitle>
            <TitleLink to="/">Rogelio Rivas</TitleLink>
          </StyledTitle>
          <Nav>
            <ThemeToggle theme={themeName} toggleTheme={toggleTheme} />
          </Nav>
        </header>

        {children}
      </Main>
    </ThemeProvider>
  );
};

export default Layout;
