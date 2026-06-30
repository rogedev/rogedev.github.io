import React from "react";
import styled from "styled-components";
import RainbowKnot from "./RainbowKnot";

const SceneWrap = styled.div`
  margin: 1em 0 2em;
`;

const HeadScene = () => (
  <SceneWrap>
    <RainbowKnot height={300} />
  </SceneWrap>
);

export default HeadScene;
