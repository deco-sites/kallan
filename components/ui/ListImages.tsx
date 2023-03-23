import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container from "./Container.tsx";
import Icon from "./Icon.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "./Slider.tsx";
import { useEffect, useState } from "preact/compat";

export interface ImagesProps {
  images: { image: LiveImage; alt?: string }[];
  gap?: number;
  maxHeight?: number;
  slider?: boolean;
}

function Controls() {
  return (
    <div class="absolute inset-0 flex items-center justify-between pointer-events-none h-full w-full">
      <button
        class="flex justify-center bg-gray-200 hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition  rounded-1/2 "
        data-slide="prev"
        aria-label="Previous item"
      >
        <Icon
          class="transition text-black"
          size={16}
          id="ChevronLeft"
          strokeWidth={3}
        />
      </button>

      <button
        class="flex justify-center bg-gray-200 hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition  rounded-1/2 "
        data-slide="next"
        aria-label="Next item"
      >
        <Icon
          class="transition text-black"
          size={16}
          id="ChevronRight"
          strokeWidth={3}
        />
      </button>
    </div>
  );
}

function ListImages(
  { images, gap = 30, maxHeight = 420, slider = false }: ImagesProps,
) {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // deno-lint-ignore no-window-prefix
    window.addEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 1024;

  if (isMobile && slider) {
    const id = images.toString();

    return (
      <Container id={id} className="relative mb-[30px] px-2.5">
        <Slider
          slidePerView={1}
          class="col-span-full row-span-full scrollbar-none "
        >
          {images.map((item) => (
            <img
              class={`w-full object-cover max-h-[${maxHeight}px]h`}
              src={item.image}
              alt={item.alt}
            />
          ))}
        </Slider>

        <Controls />

        <SliderControllerJS rootId={id} />
      </Container>
    );
  }

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
