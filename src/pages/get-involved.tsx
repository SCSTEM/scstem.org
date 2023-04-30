import DefaultLayout from "@site/src/layouts/Default";

export default function GetInvolved(): JSX.Element {
  return (
    <DefaultLayout
      title="Get Involved"
      description="Interested in one of our programs? Fill out this brief form to Get Involved"
    >
      <main className="bg-[url('/img/svg/circuit-board-light.svg')] dark:bg-[url('/img/svg/circuit-board-dark.svg')] h-[1800px] w-full">
        <iframe
          className="px-4 py-8 md:p-8 h-full w-full"
          src="https://docs.google.com/forms/d/e/1FAIpQLScTjT3LHFAq1mOfKFztgMOpUT8hFWz81dYlaaDa4B8lG6yr2Q/viewform?embedded=true"
        >
          Loading…
        </iframe>
      </main>
    </DefaultLayout>
  );
}
