import React from "react";
import styled from "styled-components";

const StyledProjectListing = styled.ul`
  list-style: none;
  margin-top: 0.5em;
  margin-left: 0;
`;

const StyledProjectItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 0.5em;
  line-height: 1.5em;
`;

const StyledLinkWrap = styled.span`
  display: block;

  @media (min-width: 550px) {
    display: inline;
  }
`;

const StyledProjectLink = styled.a``;

const StyledLedeSpan = styled.span``;

const ProjectListing = ({ projects }) => {
  const projectLinks = projects.map((project) => {
    const { title, lede, link, status } = project.node.frontmatter;
    return (
      <StyledProjectItem key={project.node.fields.slug}>
        <StyledLinkWrap>
          <StyledProjectLink
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
            {status ? ` (${status})` : ""}
          </StyledProjectLink>
          {": "}
        </StyledLinkWrap>
        {lede && <StyledLedeSpan>{lede}</StyledLedeSpan>}
      </StyledProjectItem>
    );
  });

  return <StyledProjectListing>{projectLinks}</StyledProjectListing>;
};

export default ProjectListing;
