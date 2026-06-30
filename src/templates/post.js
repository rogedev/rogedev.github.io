import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Layout";

const Meta = styled.div`
  font-size: 1.3rem;
  color: ${(props) => props.theme.muted};
  margin-bottom: 1.5em;
`;

const Body = styled.div`
  line-height: 1.7;
`;

const PostTemplate = ({ data, children }) => {
  const { frontmatter } = data.mdx;

  return (
    <Layout>
      <article>
        <h1>{frontmatter.title}</h1>
        <Meta>{frontmatter.date}</Meta>
        <Body>{children}</Body>
      </article>
      <p>
        <Link to="/blog/">← back to blog</Link>
      </p>
    </Layout>
  );
};

export default PostTemplate;

export const Head = ({ data }) => (
  <title>{data.mdx.frontmatter.title} — Rogelio Rivas</title>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        lede
      }
    }
  }
`;
