import React from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { PageMetadata } from "@docusaurus/theme-common";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import LayoutProvider from "@theme/Layout/Provider";
import ErrorPageContent from "@theme/ErrorPageContent";
import Head from "@docusaurus/Head";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Layout({
  children,
  title,
  description,
}: Props): JSX.Element {
  const pageTitle = title ? `Admin: ${title}` : "Admin";

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LayoutProvider>
        <PageMetadata title={pageTitle} description={description} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <div className="flex-grow flex">
          <div className="flex-none">
            {/* TODO: Making room for potential sidebar */}
          </div>

          <ErrorBoundary
            fallback={(params) => <ErrorPageContent {...params} />}
          >
            {children}
          </ErrorBoundary>
        </div>
      </LayoutProvider>
    </>
  );
}
