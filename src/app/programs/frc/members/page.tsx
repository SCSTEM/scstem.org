import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Image } from "@/components/Image";
import ProfileDisplay from "@/components/ProfileDisplay";

import image2024 from "@/image/team/frc/2024.webp";

type Props = {
  image: StaticImageData;
  title: JSX.Element;
};

function Portrait({ image, title }: Props): JSX.Element {
  return (
    <>
      <div className="flex-col">
        <Image
          src={image}
          alt="Member photo"
          className="m-auto py-4"
          style={{ maxWidth: 595 }}
        ></Image>
        <h1 className="pb-2 text-center">{title}</h1>
      </div>
    </>
  );
} //595x842

type Props2 = {
  image: StaticImageData;
  subtitles: [string, string];
  body: JSX.Element;
};

function StudentProfile({ image, subtitles, body }: Props2): JSX.Element {
  return (
    <>
      <div className="bg-green-950 border-5 rounded border-green-950">
        <h1 className="text-center">Student</h1>
        <div className="flex-col">
          <div className="p-px bg-green-500 m-auto" style={{ maxWidth: 610 }}>
            <Image
              src={image}
              alt="Member photo"
              className="m-auto p-1"
              style={{ minWidth: 300 }}
            ></Image>
          </div>
          <h1 className="pb-2 text-center">{subtitles[0]}</h1>
          <h1 className="pb-2 text-center">{subtitles[1]}</h1>
        </div>
        {body}
      </div>
    </>
  );
}

function MentorProfile({ image, subtitles, body }: Props2): JSX.Element {
  return (
    <>
      <div className="bg-green-950 border-5 rounded border-green-950">
        <h1 className="text-center">Mentor</h1>
        <div className="flex-col">
          <div
            className="p-px bg-gradient-to-b from-yellow-600 to-yellow-300 m-auto"
            style={{ maxWidth: 610 }}
          >
            <Image
              src={image}
              alt="Member photo"
              className="m-auto p-1"
              style={{ minWidth: 300 }}
            ></Image>
          </div>
          <h1 className="pb-2 text-center">{subtitles[0]}</h1>
          <h1 className="pb-2 text-center">{subtitles[1]}</h1>
        </div>
        {body}
      </div>
    </>
  );
}

const profiles: JSX.Element[] = [
  <>
    <StudentProfile
      image={image2024}
      subtitles={["Jane Doe, student", "First year: 2020"]}
      body={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tincidunt, quam quis maximus facilisis, urna ante aliquam metus, a
          mattis lorem ante in nisi. In hac habitasse platea dictumst. Mauris
          accumsan finibus commodo. Sed orci libero, vehicula sit amet efficitur
          a, imperdiet at turpis. Fusce viverra semper diam eu iaculis. Etiam
          accumsan ac purus at tristique. Praesent ac risus euismod quam tempus
          dictum. Donec tincidunt leo dolor, eu rhoncus sapien vulputate eu.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Maecenas non elit at lacus
          condimentum dignissim.
        </p>
      }
    ></StudentProfile>
  </>,
  <>
    <MentorProfile
      image={image2024}
      subtitles={["John Doe, mentor", "First year: 2015"]}
      body={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tincidunt, quam quis maximus facilisis, urna ante aliquam metus, a
          mattis lorem ante in nisi. In hac habitasse platea dictumst. Mauris
          accumsan finibus commodo. Sed orci libero, vehicula sit amet efficitur
          a, imperdiet at turpis. Fusce viverra semper diam eu iaculis. Etiam
          accumsan ac purus at tristique. Praesent ac risus euismod quam tempus
          dictum. Donec tincidunt leo dolor, eu rhoncus sapien vulputate eu.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Maecenas non elit at lacus
          condimentum dignissim.
        </p>
      }
    ></MentorProfile>
  </>,
];

export default function Members() {
  return (
    <>
      <div>
        <ProfileDisplay profiles={profiles}></ProfileDisplay>
      </div>
    </>
  );
}
