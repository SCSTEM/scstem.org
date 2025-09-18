import type { ReactNode } from "react";

import type { StaticImport } from "@/components/Image";
import { Image } from "@/components/Image";
import fll2024 from "@/image/team/fll/2024.webp";
import frc2013 from "@/image/team/frc/2013.webp";
import frc2014 from "@/image/team/frc/2014.webp";
import frc2015 from "@/image/team/frc/2015.webp";
import frc2016 from "@/image/team/frc/2016.webp";
import frc2017 from "@/image/team/frc/2017.webp";
import frc2018 from "@/image/team/frc/2018.webp";
import frc2019 from "@/image/team/frc/2019.webp";
import frc2020 from "@/image/team/frc/2020.webp";
import frc2022 from "@/image/team/frc/2022.webp";
import frc2023 from "@/image/team/frc/2023.webp";
import frc2024 from "@/image/team/frc/2024.webp";
import { cn } from "@/lib/utils";

type CaptionedImageProps = {
  src: StaticImport;
  caption: string;
};

export function CaptionedImage({
  src,
  caption,
}: CaptionedImageProps): ReactNode {
  return (
    <div className="w-[300px] 2xl:w-[500px] mx-auto aspect-square">
      <Image
        src={src}
        alt={caption}
        className="rounded-lg object-cover mx-auto aspect-video"
      />
      <div className="text-center">{caption}</div>
    </div>
  );
}

function SidebarShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): ReactNode {
  return (
    <div
      className={cn(
        "flex flex-col font-heading mx-5 mt-5 2xl:mx-auto w-[300px] 2xl:w-[500px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SidebarProps = {
  className?: string;
};

export function LeftSidebar({ className }: SidebarProps): ReactNode {
  return (
    <SidebarShell className={className}>
      <div className="text-center mb-5 font-medium text-2xl">
        Our FRC Origins
      </div>
      <div className="flex flex-col justify-evenly">
        <CaptionedImage src={frc2013} caption={`"Biohazard" - 2013`} />
        <CaptionedImage src={frc2014} caption={`"Biohazard" - 2014`} />
        <CaptionedImage src={frc2015} caption={`"Biohazard" - 2015`} />
        <CaptionedImage src={frc2016} caption={`"Biohazard" - 2016`} />
        <CaptionedImage src={frc2017} caption={`"Biohazard" - 2017`} />
        <CaptionedImage src={frc2018} caption={`"Biohazard" - 2018`} />
        <CaptionedImage src={frc2019} caption={`"Biohazard" - 2019`} />
        <CaptionedImage src={frc2020} caption={`"Biohazard" - 2020`} />
        <CaptionedImage src={frc2022} caption={`"Biohazard" - 2022`} />
      </div>
    </SidebarShell>
  );
}

export function RightSidebar({ className }: SidebarProps): ReactNode {
  return (
    <SidebarShell className={className}>
      <div className="text-center mb-5 font-medium text-2xl">
        The next generation
      </div>
      <div>
        <CaptionedImage src={frc2023} caption={`"Biohazard" - 2023`} />
        <CaptionedImage
          src={fll2024}
          caption={`"Team Jeremy" & "Toxic Musicians" - 2024`}
        />
        <CaptionedImage src={frc2024} caption={`"Biohazard" - 2024`} />
      </div>
    </SidebarShell>
  );
}
