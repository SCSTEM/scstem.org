import { useMediaQuery } from "@mantine/hooks";
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
  const matches = useMediaQuery("(min-width: 768px)");

  if (typeof image === "string")
    image = <img className="my-auto mt-4 h-52 md:mt-0 md:h-72" src={image} />;

  return (
    <div className="flex flex-col space-x-0 md:flex-row md:space-x-48">
      {flipped && matches && image}
      <div className="text-lg">
        <h2 className="dark:text-primary">{title}</h2>
        {children}
      </div>
      {!flipped && matches && image}
      {!matches && image}
    </div>
  );
}
