import React from "react";
export { default as wrapRootElement } from "./src/components/RootWrapper";

// Sets the initial theme before hydration to avoid a flash of the wrong theme.
const setInitialTheme = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.backgroundColor = theme === 'dark' ? '#0d0d0d' : '#ffffff';
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="set-initial-theme"
      dangerouslySetInnerHTML={{ __html: setInitialTheme }}
    />,
  ]);
};
