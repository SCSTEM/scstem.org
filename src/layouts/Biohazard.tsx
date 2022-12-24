import React from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { PageMetadata } from "@docusaurus/theme-common";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/Layout/Provider";
import ErrorPageContent from "@theme/ErrorPageContent";
import Head from "@docusaurus/Head";
import { MantineProvider } from "@mantine/core";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function BiohazardLayout({
  children,
  title,
  description,
}: Props): JSX.Element {
  const pageTitle = title ? `Biohazard: ${title}` : "Biohazard";

  return (
    <MantineProvider
      theme={{
        primaryColor: "brand-green",
      }}
      inherit
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LayoutProvider>
        <PageMetadata title={pageTitle} description={description} />

        <SkipToContent />

        <AnnouncementBar />

        {/* TODO: Add custom navbar for Biohazard sub-stie */}
        <Navbar />

        <div className="flex flex-col">
          <ErrorBoundary
            fallback={(params) => <ErrorPageContent {...params} />}
          >
            {children}
          </ErrorBoundary>

          <Footer />
        </div>
      </LayoutProvider>
    </MantineProvider>
  );
}
