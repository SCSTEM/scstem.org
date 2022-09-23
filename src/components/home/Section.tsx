import React from "react";
import Button from "../Button";

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
    image = <img className="h-72 my-auto mt-4 md:mt-0" src={image} />;

  return (
    <div className="md:grid grid-cols-3 gap-x-24">
      {flipped && image}
      <div className={`col-span-2 ${!flipped && "md:pr-20"} text-lg`}>
        <h2 className="dark:text-primary">{title}</h2>
        {children}
      </div>
      {!flipped && image}
    </div>
  );
}
