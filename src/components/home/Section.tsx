import React from "react";

interface Props {
  title: string;
  image: string | React.ReactNode;
  flipped?: boolean;
  children: React.ReactNode;
}

export default function HomeSection({
  children,
  image,
  flipped,
  title,
}: Props): JSX.Element {
  if (typeof image === "string")
    image = (
      <img className="my-auto mt-4 hidden h-72 md:mt-0 md:block" src={image} />
    );

  return (
    <div className="grid-cols-3 gap-x-24 md:grid">
      {flipped && image}
      <div className={`col-span-2 ${!flipped && "md:pr-8"} text-lg`}>
        <h2 className="dark:text-primary">{title}</h2>
        {children}
      </div>
      {!flipped && image}
    </div>
  );
}
