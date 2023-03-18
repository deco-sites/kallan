import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container from "./Container.tsx";

export interface ImagesProps {
  images: { image: LiveImage; alt?: string }[];
  gap?: number;
  maxHeight?: number;
}

function ListImages({ images, gap = 30, maxHeight = 420 }: ImagesProps) {
  return (
    <Container
      class={`w-full lg:flex-row flex-col justify-center items-center flex gap-[${gap}px] mb-[30px]`}
    >
      {images.map((item) => (
        <img
          class={`w-full object-cover max-h-[${maxHeight}px]h`}
          src={item.image}
          alt={item.alt}
        />
      ))}
    </Container>
  );
}

export default ListImages;
