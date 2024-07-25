"use client";

import { motion, useAnimate } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

import { Image } from "@/components/Image";
import { PatternBackground } from "@/components/PatternBackground";

type Props = {
  height: number;
  time?: number;
  pages: Array<{ icon: ReactNode; top: ReactNode; bottom: ReactNode }>;
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

  const goTo = (index: number) => {
    const newBValues = [];
    const newTValues = [];

    for (let i = 0; i < pages.length; i++) {
      if (i <= index) {
        newTValues.push({ scale: 1, y: 0, opacity: 1 });
      } else {
        newTValues.push({ y: height, scale: -1, opacity: 0 });
      }
      if (i >= index) {
        newBValues.push({ y: 0, scale: 1, opacity: 1 });
      } else {
        newBValues.push({ y: -height, scale: -1, opacity: 0 });
      }
    }

    setIndex(index);
    setTValues(newTValues);
    setBValues(newBValues);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap">
        {pages.map((page, i) => (
          <>
            <button
              className="m-4 px-4 heading-2 bg-green-700 border-green-700 border-5 rounded-md w-40"
              onClick={() => {
                goTo(i);
              }}
            >
              {page.icon}
            </button>
          </>
        ))}
      </div>
      <div className="relative mt-6 mx-2" style={styles}>
        <button
          style={{ zIndex: 39 }}
          onClick={drop}
          className="absolute right-4 bottom-10 font-bold text-2xl bg-green-700 border-green-700 border-5 rounded-md w-20"
        >
          Prev
        </button>
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
              <div
                className="bg-slate-700 border-b-2 border-black"
                style={styles}
              >
                {page.top}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="relative mb-6 mx-2" style={styles}>
        <button
          style={{ zIndex: 39 }}
          className="absolute right-4 top-10 font-bold text-2xl bg-green-700 border-green-700 border-5 rounded-md w-20"
          onClick={flip}
        >
          Next
        </button>
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
              <div
                className="bg-gray-800 border-t-2 border-black"
                style={styles}
              >
                <div className="mr-32">{page.bottom}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
