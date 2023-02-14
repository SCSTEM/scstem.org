import { Image as MImage, ImageProps as MImageProps } from "@mantine/core";
import React from "react";

export default function Image(props: MImageProps) {
  return <MImage fit="contain" withPlaceholder {...props} />;
}
