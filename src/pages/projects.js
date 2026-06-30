import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import ProjectListingSection from "../components/ProjectListingSection";

const ProjectsPage = ({ data }) => {
  const projects = data.allMdx ? data.allMdx.edges : [];

  return (
    <Layout>
      <h1>projects</h1>
      <ProjectListingSection projects={projects} />
    </Layout>
  );
};

export default ProjectsPage;

export const Head = () => <title>Projects — Rogelio Rivas</title>;

export const query = graphql`
  query {
    allMdx(
      filter: {
        fields: { type: { eq: "project" } }
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
            link
            npm
            tags
            status
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
