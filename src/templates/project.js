import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import ProjectLinks from "../components/ProjectLinks";

const ProjectTemplate = ({ data, children }) => {
  const { title, status, link, npm, date, tags } = data.mdx.frontmatter;
  const lang = tags && tags.length > 0 ? tags.join(", ") : null;

  return (
    <Layout>
      <article>
        <h1>
          {title}
          {status ? ` (${status})` : ""}
        </h1>
        <ProjectLinks
          link={link}
          repo={link}
          npm={npm}
          date={date}
          lang={lang}
        />
        {children}
      </article>
      <p>
        <Link to="/projects/">← back to projects</Link>
      </p>
    </Layout>
  );
};

export default ProjectTemplate;

export const Head = ({ data }) => (
  <title>{data.mdx.frontmatter.title} — Rogelio Rivas</title>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        status
        link
        npm
        date
        tags
      }
    }
  }
`;
