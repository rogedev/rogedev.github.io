import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogListing from "../components/BlogListing";

const BlogPage = ({ data }) => {
  const posts = data.allMdx ? data.allMdx.edges : [];

  return (
    <Layout>
      <h1>blog</h1>
      <BlogListing posts={posts} />
    </Layout>
  );
};

export default BlogPage;

export const Head = () => <title>Blog — Rogelio Rivas</title>;

export const query = graphql`
  query {
    allMdx(
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { publish: { eq: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            lede
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
