import React from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import HeadScene from "../components/HeadScene";

const Bio = styled.section`
  font-size: 1.6rem;
  line-height: 1.7;

  p {
    margin: 0 0 1.2em;
  }
`;

const IndexPage = () => (
  <Layout>
    <HeadScene />
    <Bio>
      <p>Hi, I am Rogelio. I build production backend systems end-to-end.</p>
      <p>
        I'm a Backend Engineer specializing in AWS serverless architecture and
        distributed systems, with 5+ years of experience and a strong focus on
        system design, scalability, and performance optimization — including
        infrastructure design and CI/CD pipelines.
      </p>
      <p>
        Currently a Software Engineer at{" "}
        <a
          href="https://www.ycombinator.com/companies/pide-directo"
          target="_blank"
          rel="noopener noreferrer"
        >
          PideDirecto (YC S21)
        </a>
        , building serverless backend applications on AWS.
      </p>
      <p>
        You can find me on{" "}
        <a
          href="https://github.com/rogedev"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        and{" "}
        <a
          href="https://linkedin.com/in/rogedev"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        , or reach me via <a href="mailto:rogeliorivasm@icloud.com">email</a>.
      </p>
    </Bio>
  </Layout>
);

export default IndexPage;

export const Head = () => <title>Rogelio Rivas</title>;
