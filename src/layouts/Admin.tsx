import ErrorBoundary from "@docusaurus/ErrorBoundary";
import Head from "@docusaurus/Head";
import { PageMetadata } from "@docusaurus/theme-common";
import AnnouncementBar from "@theme/AnnouncementBar";
import ErrorPageContent from "@theme/ErrorPageContent";
import LayoutProvider from "@theme/Layout/Provider";
import Navbar from "@theme/Navbar";
import SkipToContent from "@theme/SkipToContent";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function AdminLayout({
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

        <div className="flex flex-grow">
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
