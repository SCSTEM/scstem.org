import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import React from "react";

import FourOhFour from "@site/src/layouts/parts/NotFound";

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main>
        <FourOhFour />
      </main>
    </Layout>
  );
}
