import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import type { ReactNode } from "react";

import type { StaticImport } from "@/components/Image";
import { Image } from "@/components/Image";
import { cn, type Icon } from "@/lib/utils";
import type { ColorScale } from "@/styles/theme";
import { parseColor } from "@/styles/theme";

function CardImage({
  src,
  alt,
  className,
}: {
  src: StaticImport;
  alt: string;
  className?: string;
}): JSX.Element {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn(
        "h-44 lg:h-52 w-full rounded-xl shadow-lg object-cover overflow-hidden",
        className,
      )}
    />
  );
}

export type FeatureCardProps = {
  icon: Icon;
  title: ReactNode;
  body: ReactNode;
  color?: ColorScale;
  link?: string;
  linkText?: string;
  linkIcon?: Icon;
  badge?: string;
  img?: {
    src: StaticImport;
    alt: string;
    placement?: "top" | "bottom";
  };
  classNames?: {
    base?: string;
    body?: string;
    header?: string;
  };
  footer?: ReactNode;
};

export function FeatureCard({
  title,
  body,
  color,
  link,
  linkText,
  badge,
  img,
  classNames,
  footer,
  ...props
}: FeatureCardProps): JSX.Element {
  const parsedColor = parseColor(color);
  return (
    <Card
      classNames={{
        base: cn(
          "max-w-[400px] sm:w-[400px] mx-auto min-h-full",
          classNames?.base,
        ),
        body: cn("pt-0 px-4 pb-4", classNames?.body),
        header: cn("pb-0", classNames?.header),
        footer: "mb-1",
      }}
    >
      <CardHeader>
        <props.icon size={50} stroke={1.5} color={parsedColor} />
        <h4 className="font-bold text-lg xl:text-xl font-sans ml-4">{title}</h4>
      </CardHeader>

      <CardBody className="flex flex-col space-y-4">
        {img && (!img.placement || img.placement === "top") ? (
          <CardImage src={img.src} alt={img.alt} className="mt-2" />
        ) : null}
        <div className="flex items-center space-x-3 h-7">
          <div
            style={{ borderColor: parsedColor }}
            className="grow border-b-2"
          />
          {badge ? (
            <Chip
              variant="flat"
              style={{ backgroundColor: `${parsedColor}50` }}
            >
              {badge}
            </Chip>
          ) : null}
        </div>
        <div className="flex flex-col grow">
          <div
            className={cn(img && img.placement === "bottom" ? "mb-4" : null)}
          >
            {body}
          </div>

          {img && img.placement === "bottom" ? (
            <CardImage className="mt-auto" src={img.src} alt={img.alt} />
          ) : null}
        </div>
      </CardBody>

      {footer ? (
        <CardFooter>{footer}</CardFooter>
      ) : link ? (
        <CardFooter>
          <Button
            variant="light"
            as={Link}
            href={link}
            style={{ color: parsedColor }}
            className="h-fit px-2 py-1 bg-opacity/0 hover:bg-opacity/20"
            endContent={
              props.linkIcon ? <props.linkIcon className="size-5" /> : null
            }
          >
            {linkText ? linkText : "Learn More"}
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
