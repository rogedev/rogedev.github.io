import React from "react";
import styled from "styled-components";
import AsciiDonut from "./AsciiDonut";

const SceneWrap = styled.div`
  margin: 1em 0 2em;
`;

const HeadScene = () => (
  <SceneWrap>
    <AsciiDonut height={300} />
  </SceneWrap>
);

export default HeadScene;
