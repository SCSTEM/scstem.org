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
    image = <img className="h-72 my-auto" src={image} />;

  return (
    <div className="grid grid-cols-3 gap-x-24">
      {flipped && image}
      <div className={`prose col-span-2 ${!flipped && "pr-20"} text-lg`}>
        <h2 className="dark:text-primary">{title}</h2>
        {children}
      </div>
      {!flipped && image}
    </div>
  );
}