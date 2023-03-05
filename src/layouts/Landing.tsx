interface Props {
  children?: React.ReactNode;
}

export default function LandingLayout({ children }: Props): JSX.Element {
  return (
    <div className="h-screen w-screen">
      <img
        className="fixed h-full w-full object-cover -z-1"
        src="/img/banner2.webp"
      />
      <main className="flex flex-col relative bg-opacity-25 bg-stone-200 backdrop-blur-md w-96 md:w-[500px] lg:w-[750px] mx-auto mt-64 rounded-[3rem] drop-shadow-2xl">
        {children}
      </main>
    </div>
  );
}
