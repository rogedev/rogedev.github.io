import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const DateSpan = styled.span`
  display: none;
  color: ${(props) => props.theme.muted};
  margin-left: 0.5em;

  @media (min-width: 520px) {
    display: inline;
  }
`;

const StyledBlogListing = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const StyledBlogItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
`;

const StyledBlogLink = styled(Link)``;

const BlogListing = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No posts yet — writing is in progress.</p>;
  }

  const postLinks = posts.map((post) => (
    <StyledBlogItem key={post.node.fields.slug}>
      <StyledBlogLink to={`/blog/${post.node.fields.slug}/`}>
        {post.node.frontmatter.title}
      </StyledBlogLink>
      {post.node.frontmatter.date && (
        <DateSpan>({post.node.frontmatter.date})</DateSpan>
      )}
    </StyledBlogItem>
  ));

  return <StyledBlogListing>{postLinks}</StyledBlogListing>;
};

export default BlogListing;
