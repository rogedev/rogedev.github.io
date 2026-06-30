import React from "react";
import { MDXProvider } from "@mdx-js/react";

// Open external links in a new tab
const Anchor = ({ href = "", children, ...props }) => {
  const isExternalLink = /^https?:\/\//i.test(href);

  if (isExternalLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

const mdxComponents = { a: Anchor };

const RootWrapper = ({ element }) => (
  <MDXProvider components={mdxComponents}>{element}</MDXProvider>
);

export default RootWrapper;
