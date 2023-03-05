import { Image as MImage, ImageProps as MImageProps } from "@mantine/core";

export default function Image(props: MImageProps) {
  return <MImage fit="contain" withPlaceholder {...props} />;
}
