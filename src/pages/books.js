import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import BookListing from "../components/BookListing";

const BooksPage = ({ data }) => {
  const books = data.allMdx ? data.allMdx.edges : [];
  return (
    <Layout>
      <h1>books</h1>
      <p>Some books I&apos;ve read and enjoyed.</p>
      <BookListing books={books} />
    </Layout>
  );
};

export default BooksPage;

export const Head = () => <title>Books — Rogelio Rivas</title>;

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { type: { eq: "book" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author
            link
            date
          }
        }
      }
    }
  }
`;
