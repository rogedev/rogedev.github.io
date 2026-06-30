import path from "path";

// Explicitly declare the MDX frontmatter schema so optional fields (status,
// npm, tags, author, ...) always exist on the GraphQL type, even when no
// current node uses them. Without this, Gatsby infers the schema from data and
// queries for an absent field fail with "Cannot query field ... on MdxFrontmatter".
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      title: String
      date: Date @dateformat
      publish: Boolean
      lede: String
      link: String
      npm: String
      status: String
      tags: [String]
      author: String
    }
  `);
};

// Map the gatsby-source-filesystem instance name to a content "type".
const SOURCE_TO_TYPE = {
  posts: "post",
  projects: "project",
  books: "book",
};

export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type !== "Mdx") return;

  const fileNode = getNode(node.parent);
  if (!fileNode) return;

  const type = SOURCE_TO_TYPE[fileNode.sourceInstanceName];
  if (!type) return;

  // content/<type>/<slug>/index.mdx  ->  slug = <slug>
  const slug = fileNode.relativeDirectory.split("/").pop();

  createNodeField({ node, name: "type", value: type });
  createNodeField({ node, name: "slug", value: slug });
};

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
            type
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX content", result.errors);
    return;
  }

  const postTemplate = path.resolve("./src/templates/post.js");
  const projectTemplate = path.resolve("./src/templates/project.js");

  result.data.allMdx.nodes.forEach((node) => {
    if (!node.fields || !node.fields.type) return;

    if (node.fields.type === "post") {
      createPage({
        path: `/blog/${node.fields.slug}/`,
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id },
      });
    }

    if (node.fields.type === "project") {
      createPage({
        path: `/projects/${node.fields.slug}/`,
        component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id },
      });
    }
  });
};
