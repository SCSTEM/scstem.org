import { Image as MImage, ImageProps as MImageProps } from "@mantine/core";

// Helper to allow easy swapping of image libraries
export default function Image(props: MImageProps) {
  return <MImage fit="contain" withPlaceholder {...props} />;
}
