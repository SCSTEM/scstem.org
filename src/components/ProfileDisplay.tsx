import type { ReactNode } from "react";

import { PatternBackground } from "@/components/PatternBackground";

type Props = {
  profiles: Array<ReactNode>;
  children?: ReactNode;
};

export default function ProfileDisplay({
  profiles,
  children,
}: Props): JSX.Element {
  const style2 = "relative flex m-5 ";
  const style = "bg-green-950 border-5 rounded border-green-950 ";

  return (
    <>
      <PatternBackground color="green" pattern="topography">
        <div className="">
          {children}
          {profiles.map((profile, i) => (
            <div
              key={i}
              className={style2.concat(
                i % 2 == 0 ? "md:justify-start" : "md:justify-end",
              )}
            >
              <div className={style} style={{ maxWidth: 660 }}>
                {profile}
              </div>
            </div>
          ))}
        </div>
      </PatternBackground>
    </>
  );
}
