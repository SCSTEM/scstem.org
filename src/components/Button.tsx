import React from "react";

interface Props {
  primary?: boolean;
  url: string;
  children?: React.ReactNode;
}

export default function Button({ primary, url, children }: Props): JSX.Element {
  let style =
    "bg-transparent text-slate-600 hover:text-slate-600 border-solid hover:shadow-lg hover:text-yellow-400 hover:border-yellow-400";
  if (primary)
    style =
      "bg-yellow-400 text-slate-600 hover:text-slate-600 hover:bg-yellow-300 focus:bg-yellow-300 active:bg-yellow-400 hover:shadow-lg";

  return (
    <a
      href={url}
      className={`mb-5 mx-auto inline-block  px-6 py-2.5 font-semibold text-xl leading-tight rounded-2xl hover:no-underline focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out ${style}`}
    >
      {children}
    </a>
  );
}
