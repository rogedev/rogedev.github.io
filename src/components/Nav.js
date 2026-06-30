import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const activeClassName = "active";

const StyledNav = styled.nav`
  margin-bottom: 1em;

  @media (min-width: 520px) {
    margin-bottom: 2em;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 520px) {
    justify-content: flex-start;
  }
`;

const ListElement = styled.li`
  display: inline-block;
  padding: 0.5em;
  text-align: center;
  font-size: 1.8rem;

  @media (min-width: 300px) {
    font-size: 2.2rem;
    padding-right: 0;
    padding-left: 0;
  }

  @media (min-width: 520px) {
    padding: 0;
    margin-right: 2rem;
    font-size: 2.4rem;
  }
`;

const NavItem = styled(Link).attrs({ activeClassName })`
  color: ${(props) => props.theme.text};
  border: none;

  &:hover {
    color: ${(props) => props.theme.accent};
  }

  &:before {
    content: "/";
    display: none;

    @media (min-width: 520px) {
      display: inline;
    }
  }

  &.${activeClassName} {
    font-weight: bold;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledList>
        <ListElement>
          <NavItem to="/blog/" activeClassName={activeClassName}>
            blog
          </NavItem>
        </ListElement>
        <ListElement>
          <NavItem to="/projects/" activeClassName={activeClassName}>
            projects
          </NavItem>
        </ListElement>
        <ListElement>
          <NavItem to="/books/" activeClassName={activeClassName}>
            books
          </NavItem>
        </ListElement>
      </StyledList>
    </StyledNav>
  );
};

export default Nav;
