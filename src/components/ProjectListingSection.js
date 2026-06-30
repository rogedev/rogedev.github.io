import React from "react";
import styled from "styled-components";
import ProjectListing from "./ProjectListing";

const StyledListingSection = styled.section`
  margin-bottom: 2em;
`;

const StyledSectionHeading = styled.h2`
  margin-bottom: 0;
`;

const ProjectListingSection = ({ projects, sectionTitle }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <StyledListingSection>
      {sectionTitle && (
        <StyledSectionHeading>{sectionTitle}</StyledSectionHeading>
      )}
      <ProjectListing projects={projects} />
    </StyledListingSection>
  );
};

export default ProjectListingSection;
