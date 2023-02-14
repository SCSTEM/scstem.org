import Layout from "@theme/Layout";
import React from "react";

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
    <Layout title={title} description={description} noFooter={noFooter}>
      {children}
    </Layout>
  );
}
