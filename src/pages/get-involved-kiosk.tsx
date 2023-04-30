import Head from "@docusaurus/Head";

export default function GetInvolvedKiosk(): JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <iframe
        className="h-screen w-screen bg-[url('/img/svg/circuit-board-light.svg')] p-8 dark:bg-[url('/img/svg/circuit-board-dark.svg')]"
        src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
      >
        Loading…
      </iframe>
    </>
  );
}
