import React from "react";
import styled from "styled-components";

const StyledProjectLinksList = styled.ul`
  list-style: none;
  font-size: 1.8rem;
  margin-left: 0;
  padding: 0;
`;

const StyledProjectLink = styled.li`
  display: inline;
  line-height: 1.5em;

  &:after {
    content: " | ";
  }

  &:last-child {
    &:after {
      content: "";
    }
  }
`;

const ProjectLinks = ({ link, repo, npm, date, lang }) => {
  if (!link && !repo && !npm) return null;

  // getUTCFullYear avoids a local-timezone off-by-one for ISO dates like "2024-01-01".
  const year = date ? new Date(date).getUTCFullYear() : null;
  // Avoid a redundant "Repo" link when the displayed URL is already the repo.
  const showRepo = repo && repo !== link;

  return (
    <StyledProjectLinksList>
      {link && (
        <StyledProjectLink>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link.length > 40 ? "Link" : link}
          </a>
        </StyledProjectLink>
      )}

      {year && <StyledProjectLink>{year}</StyledProjectLink>}

      {lang && <StyledProjectLink>{lang}</StyledProjectLink>}

      {showRepo && (
        <StyledProjectLink>
          <a href={repo} target="_blank" rel="noopener noreferrer">
            Repo
          </a>
        </StyledProjectLink>
      )}

      {npm && (
        <StyledProjectLink>
          <a href={npm} target="_blank" rel="noopener noreferrer">
            npm
          </a>
        </StyledProjectLink>
      )}
    </StyledProjectLinksList>
  );
};

export default ProjectLinks;
