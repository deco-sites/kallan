import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { generateUniqueId } from "$store/sdk/generateId.ts";

export interface BrandItemProps {
  /** @description  otimized image */
  image?: LiveImage;
  /** @description  text image */
  text?: string;
  /** @description  link Image */
  href: string;
}

export interface BrandsProps {
  differencias: BrandItemProps[];
  forceLoop?: boolean;
}

function BrandItem({ image, text, href = "" }: BrandItemProps) {
  return (
    <a href={href} class="flex flex-col justify-center items-center ">
      <img
        class="rounded-1/2 w-[75px] h-[75px] mb-[9px]"
        src={image}
        alt={text}
      />
      <p class="font-heading-1 text-[14px] text-black">{text}</p>
    </a>
  );
}

function Controls() {
  return (
    <div class="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none h-full w-full">
      <button
        class="flex justify-center bg-white  hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition  rounded-1/2 "
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
        class="flex justify-center bg-white  hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition  rounded-1/2 "
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

function Brands({ differencias, forceLoop }: BrandsProps) {
  const id = generateUniqueId();

  const list = forceLoop ? differencias.concat(differencias) : differencias;
  const isMobile = window.innerWidth <= 1024;
  const slidePerView = isMobile ? 3.5 : 9;

  return (
    <div id={id} class="bg-gray-400 h-36 w-full pt-5 mb-[17px]">
      <div class="max-w-[1200px] w-full mx-auto relative">
        <div class="max-w-[1070px] w-full mx-auto">
          <Slider
            slidePerView={slidePerView}
            class="mx-auto col-span-full row-span-full scrollbar-none"
          >
            {list.map((item) => <BrandItem {...item} />)}
          </Slider>
        </div>

        {list.length > slidePerView && !isMobile && <Controls />}

        <SliderControllerJS rootId={id} />
      </div>
    </div>
  );
}
export default Brands;
