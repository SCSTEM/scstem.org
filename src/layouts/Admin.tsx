import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

interface Props {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  noFooter?: boolean;
}

export default function DefaultLayout({
  children,
  title,
  description,
  noFooter,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Layout title={title} description={description} noFooter={noFooter}>
        <div className="flex">
          <div className="flex-none w-12 bg-neutral"></div>
          <div className="flex-grow p-10">{children}</div>
        </div>
      </Layout>
    </>
  );
}
