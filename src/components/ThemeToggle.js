import React from "react";
import styled from "styled-components";

const ToggleButton = styled.button`
  background: none;
  border: 2px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  border-radius: 4px;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
  font-size: 1.4rem;
  padding: 0.3em 0.6em;
  line-height: 1;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.accent};
    border-color: ${(props) => props.theme.accent};
  }
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";
  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀ light" : "☾ dark"}
    </ToggleButton>
  );
};

export default ThemeToggle;
