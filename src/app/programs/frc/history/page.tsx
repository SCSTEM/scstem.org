import { motion } from "framer-motion";
import type { ReactNode } from "react";

import SlidingDiv from "@/components/CalendarAnimated";
import CalendarAnimated from "@/components/CalendarAnimated";
import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";

import testImage from "@/image/cheering.webp";
import competition1Image from "@/image/competition-1.webp";
import deanImage from "@/image/dean.webp";

type Page = {
  top: ReactNode;
  bottom: ReactNode;
};

const pages: Page[] = [
  {
    top: (
      <>
        <Image src={testImage} alt="test" style={{ height: 500 }} />
      </>
    ),
    bottom: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu
        nunc, posuere ut blandit vitae, pulvinar vitae justo. Donec porttitor in
        orci in lacinia. Maecenas at tempus justo, at rhoncus mi. Mauris tempus
        non neque eget dictum. Sed ultrices egestas porttitor. Vestibulum
        fringilla sapien et venenatis finibus. Nunc sit amet tortor felis. In ac
        enim turpis. Duis non enim sed risus cursus tincidunt sed et nunc.
        Integer non arcu quis nunc molestie tincidunt hendrerit id dolor. In
        vulputate, orci a porttitor congue, elit diam vestibulum leo, ut finibus
        tortor ante condimentum dolor. Quisque cursus, neque ut tristique
        accumsan, nunc sem faucibus risus, nec porttitor nulla eros id magna.
        Cras at diam in erat sagittis tincidunt. Duis turpis massa, vulputate
        sit amet dui nec, laoreet varius odio.{" "}
      </>
    ),
  },
  {
    top: (
      <>
        <Image src={competition1Image} alt="test" style={{ height: 500 }} />
      </>
    ),
    bottom: (
      <>
        Praesent varius faucibus aliquet. Nullam venenatis egestas urna, quis
        volutpat nibh scelerisque malesuada. Donec venenatis magna rhoncus,
        finibus nisi vel, facilisis diam. Aenean malesuada leo neque, quis
        dignissim risus pretium vel. Suspendisse potenti. Phasellus maximus eros
        arcu, quis eleifend sapien aliquet quis. Nam sit amet dui sapien. In
        tempus elit nec vulputate luctus. Phasellus eget nisl eu tellus aliquam
        mollis. Sed nec est luctus, imperdiet libero ut, faucibus orci. Integer
        fermentum risus orci, in dignissim dui sagittis gravida. In scelerisque
        felis et porttitor varius. Donec ut arcu auctor ligula volutpat
        fringilla vel vel erat.{" "}
      </>
    ),
  },
  {
    top: (
      <>
        <Image src={deanImage} alt="test" style={{ height: 500 }} />
      </>
    ),
    bottom: (
      <>
        Suspendisse sed nunc nec purus posuere congue vel nec tellus. Nulla et
        justo sollicitudin tellus accumsan malesuada. Aliquam congue et est ut
        semper. Ut risus lorem, bibendum eu faucibus et, aliquet convallis
        justo. Nullam a commodo risus, a faucibus arcu. Morbi lacinia massa
        quam, non lobortis nisi posuere aliquam. Duis pellentesque molestie
        lectus et consectetur.{" "}
      </>
    ),
  },
  {
    top: (
      <>
        <Image src={testImage} alt="test" style={{ height: 500 }} />
      </>
    ),
    bottom: (
      <>
        Donec dignissim, justo id efficitur scelerisque, sem augue pulvinar
        turpis, nec mollis risus lorem ac sem. Praesent et neque sit amet orci
        placerat rutrum. Suspendisse tempor ligula quam, at molestie est ornare
        sed. Sed lectus risus, gravida sed luctus blandit, pellentesque a ipsum.
        Curabitur id varius urna. Nunc blandit at ligula ut rutrum. Proin eu
        nisi arcu. Duis tincidunt elementum elementum. Maecenas ornare posuere
        tempor. Donec eleifend sem a elit pulvinar vestibulum. Praesent
        pulvinar, lectus in iaculis maximus, eros neque sollicitudin augue, et
        scelerisque elit odio vitae arcu. Vestibulum condimentum sem nec elit
        placerat blandit. Cras tincidunt posuere ultricies. Aliquam erat
        volutpat. Suspendisse blandit sagittis risus vel consectetur.{" "}
      </>
    ),
  },
];

export default function History() {
  return (
    <>
      <CalendarAnimated height={500} time={1} pages={pages}></CalendarAnimated>
    </>
  );
}
