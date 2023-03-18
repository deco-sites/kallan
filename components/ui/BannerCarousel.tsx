import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { animation, keyframes, tw } from "twind/css";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative h-auto w-full overflow-y-hidden">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={375}
            height={375}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1920}
            height={747}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
        {action?.href && (
          <div
            class="absolute top-0 bottom-0 m-auto left-0 right-0 sm:right-auto sm:left-[12%] max-h-min max-w-[235px] flex flex-col gap-4 bg-hover-inverse p-4 rounded"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <Text variant="heading-1" tone="default-inverse">
              {action.title}
            </Text>
            <Text variant="heading-3" tone="default-inverse">
              {action.subTitle}
            </Text>
            <Button variant="secondary">{action.label}</Button>
          </div>
        )}
      </a>
    </div>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>
      <ol class="w-full bottom-2.5 absolute flex items-center justify-center col-span-full gap-4 z-10 row-start-4 ">
        {images?.map((_, index) => (
          <li class="h-full">
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="h-full rounded focus:outline-none group"
            >
              <div
                class={tw`group-disabled:${
                  animation(
                    `${interval}s ease-out 1 forwards`,
                    keyframes`
                      from: {
                        --dot-progress: 0%;
                      }
                      to {
                        --dot-progress: 100%;
                      }
                    `,
                  )
                } w-2 h-2 rounded-1/2`}
                style={{
                  background:
                    "linear-gradient(to right, #D51313 var(--dot-progress), #333333 var(--dot-progress))",
                }}
              />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Controls() {
  return (
    <div class="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none h-full w-full">
      <button
        class="flex justify-center items-center h-8 w-8 focus:outline-none pointer-events-auto transition border-2 rounded hover:border-white border-hover-inverse"
        data-slide="prev"
        aria-label="Previous item"
      >
        <Icon
          class="transition hover:text-white text-hover-inverse"
          size={26}
          id="ChevronLeft"
          strokeWidth={3}
        />
      </button>

      <button
        class="flex justify-center items-center h-8 w-8 focus:outline-none pointer-events-auto transition border-2 rounded hover:border-white border-hover-inverse"
        data-slide="next"
        aria-label="Next item"
      >
        <Icon
          class="transition hover:text-white text-hover-inverse"
          size={26}
          id="ChevronRight"
          strokeWidth={3}
        />
      </button>
    </div>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = "bannerCarousel";

  return (
    <div
      id={id}
      class="relative flex sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px]"
    >
      <Slider
        slidePerView={1}
        class="col-span-full row-span-full scrollbar-none gap-6"
      >
        {images?.map((image, index) => (
          <BannerItem image={image} lcp={index === 0 && preload} />
        ))}
      </Slider>

      <Controls />

      <Dots images={images} interval={interval} />

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default BannerCarousel;
