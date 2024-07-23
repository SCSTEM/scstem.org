"use client";

import { motion, useAnimate } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";

type Props = {
  height: number;
  time?: number;
  pages: Array<{ top: ReactNode; bottom: ReactNode }>;
};

function insert(
  array: Array<{ y: number; scale: number; opacity: number }>,
  object: { y: number; scale: number; opacity: number },
  index: number,
) {
  if (index >= array.length || index < 0) {
    return array;
  }
  if (index == 0) {
    return [object, ...array.slice(index + 1)];
  } else if (index == array.length) {
    return [...array.slice(0, index), object];
  } else {
    return [...array.slice(0, index), object, ...array.slice(index + 1)];
  }
}

export default function CalendarAnimated({
  height,
  time,
  pages,
}: Props): JSX.Element {
  const styles = { height: height, width: "full" };
  const [index, setIndex] = useState(0);
  const initialValues = [];
  const initialValues2 = [];
  for (let i = 0; i < pages.length; i++) {
    initialValues.push({ scale: 1, y: 0, opacity: 1 });
  }
  initialValues2.push({ scale: 1, y: 0, opacity: 1 });
  for (let i = 1; i < pages.length; i++) {
    initialValues2.push({ scale: -1, y: height, opacity: 0 });
  }
  const [tValues, setTValues] = useState(initialValues2);
  const [bValues, setBValues] = useState(initialValues);

  const flip = () => {
    console.log(index);
    if (index < pages.length - 1) {
      const newBValues = insert(
        bValues,
        { y: -height, scale: -1, opacity: 0 },
        index,
      );
      const newTValues = insert(
        tValues,
        { y: 0, scale: 1, opacity: 1 },
        index + 1,
      );
      setIndex(index + 1);
      setTValues(newTValues);
      setBValues(newBValues);
    }
  };

  const drop = () => {
    console.log(index);
    if (index > 0) {
      console.log(index - 1);
      const newBValues = insert(
        bValues,
        { scale: 1, y: 0, opacity: 1 },
        index - 1,
      );
      const newTValues = insert(
        tValues,
        { y: height, scale: -1, opacity: 0 },
        index,
      );
      setIndex(index - 1);
      setTValues(newTValues);
      setBValues(newBValues);
    }
  };

  return (
    <>
      <button style={{ zIndex: 100 }} onClick={flip}>
        flip
      </button>
      <button style={{ zIndex: 100 }} onClick={drop}>
        drop
      </button>
      <div className="relative w-full" style={styles}>
        {pages.map((page, i) => (
          <motion.div
            key={i}
            animate={{
              y: tValues[i].y,
              scaleY: tValues[i].scale,
            }}
            transition={{ duration: 1, type: "linear" }}
            className="absolute top-0 left-0 w-full"
            style={{ zIndex: i }}
          >
            <motion.div
              animate={{
                opacity: [null, tValues[i].opacity],
              }}
              transition={{ type: "just", times: [0.5, 0.5001] }}
            >
              <div className="bg-slate-400" style={styles}>
                {page.top}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="relative w-full" style={styles}>
        {pages.map((page, i) => (
          <motion.div
            key={i}
            animate={{
              y: bValues[i].y,
              scaleY: bValues[i].scale,
            }}
            transition={{ duration: 1, type: "linear" }}
            className="absolute top-0 left-0 w-full"
            style={{ zIndex: pages.length - i }}
          >
            <motion.div
              animate={{
                opacity: [null, bValues[i].opacity],
              }}
              transition={{ type: "just", times: [0.5, 0.5001] }}
            >
              <div className="bg-red-400" style={styles}>
                {page.bottom}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
