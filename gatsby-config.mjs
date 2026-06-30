import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  siteMetadata: {
    title: "Rogelio Rivas",
    description: "Personal portfolio of Rogelio Rivas — Backend Engineer",
    siteUrl: "https://rogedev.github.io",
    author: "Rogelio Rivas",
  },
  // If deploying to a project repo (user.github.io/<repo>) set this to '/<repo>'.
  // For a root user site (rogedev.github.io) leave it commented out.
  // pathPrefix: '/rogedev-portfolio',
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "pages", path: `${__dirname}/src/pages/` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "posts", path: `${__dirname}/src/content/posts` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "projects", path: `${__dirname}/src/content/projects` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "books",
        path: `${__dirname}/src/content/books`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          { resolve: "gatsby-remark-autolink-headers" },
          { resolve: "gatsby-remark-prismjs", options: {} },
        ],
      },
    },
  ],
};

export default config;
