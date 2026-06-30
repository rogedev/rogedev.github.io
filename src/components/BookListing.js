import React from "react";
import styled from "styled-components";

const StyledBookListing = styled.ul`
  list-style: none;
  margin-top: 0.5em;
  margin-left: 0;
`;

const StyledBookItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
  line-height: 1.5em;
`;

const Title = styled.span`
  font-style: italic;
`;

const Author = styled.span`
  color: ${(props) => props.theme.muted};
`;

const BookListing = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books listed yet — reading list coming soon.</p>;
  }

  return (
    <StyledBookListing>
      {books.map(({ node }) => {
        const { title, author, link } = node.frontmatter;
        const titleEl = <Title>{title}</Title>;
        return (
          <StyledBookItem key={node.id}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                {titleEl}
              </a>
            ) : (
              titleEl
            )}
            {author && <Author> — {author}</Author>}
          </StyledBookItem>
        );
      })}
    </StyledBookListing>
  );
};

export default BookListing;
