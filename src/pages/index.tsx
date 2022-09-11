import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header>
        <div>
          <h1>{siteConfig.title}</h1>
          <p>{siteConfig.tagline}</p>
          <div></div>
        </div>
      </header>
      <main></main>
    </Layout>
  );
}
