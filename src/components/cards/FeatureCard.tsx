import type { ReactNode } from "react";
import type { StaticImport } from "@/components/Image";
import { Image } from "@/components/Image";
import { LinkButton } from "@/components/LinkButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shadcn/ui/card";
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
}): ReactNode {
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
}: FeatureCardProps): ReactNode {
  const parsedColor = parseColor(color);
  return (
    <Card
      className={cn(
        "max-w-[400px] sm:w-[400px] mx-auto min-h-full flex flex-col",
        classNames?.base,
      )}
    >
      <CardHeader className={cn("pb-0", classNames?.header)}>
        <props.icon size={50} stroke={1.5} color={parsedColor} />
        <h4 className="font-bold text-lg xl:text-xl font-sans ml-4">{title}</h4>
      </CardHeader>

      <CardContent
        className={cn(
          "pt-0 px-4 pb-4 flex flex-col space-y-4 flex-1",
          classNames?.body,
        )}
      >
        {img && (!img.placement || img.placement === "top") ? (
          <CardImage src={img.src} alt={img.alt} className="mt-2" />
        ) : null}
        <div className="flex items-center space-x-3 h-7">
          <div
            style={{ borderColor: parsedColor }}
            className="grow border-b-2"
          />
          {badge ? (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: `${parsedColor}50` }}
            >
              {badge}
            </span>
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
      </CardContent>

      {footer ? (
        <CardFooter className="mb-1">{footer}</CardFooter>
      ) : link ? (
        <CardFooter className="mb-1">
          <LinkButton
            variant="ghost"
            href={link}
            style={{ color: parsedColor }}
            className="h-fit px-2 py-1"
          >
            {linkText ? linkText : "Learn More"}
            {props.linkIcon ? <props.linkIcon className="size-5" /> : null}
          </LinkButton>
        </CardFooter>
      ) : null}
    </Card>
  );
}
