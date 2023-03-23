// deno-lint-ignore-file no-window-prefix
import Container from "../ui/Container.tsx";
import type {
  HTML,
  Image as LiveImage,
} from "deco-sites/std/components/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { generateUniqueId } from "../../sdk/generateId.ts";
import { useEffect, useState } from "preact/compat";

interface TopBarProps {
  items?: {
    image: LiveImage;
    text: HTML;
    description: string;
  }[];
}

function TopBar({ items }: TopBarProps) {
  if (!items?.length) return null;
  const id = generateUniqueId();

  const [microheaderState, setMicroheaderState] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      console.log(currentScroll);

      if (
        currentScroll > lastScrollTop && currentScroll > (!isMobile ? 160 : 177)
      ) {
        setMicroheaderState(true);
      } else {
        setMicroheaderState(false);
      }

      lastScrollTop = currentScroll;
    });
  }, []);

  const isMobile = window.innerWidth <= 1024;

  const listItems = items.map((item) => {
    return (
      <div class="h-full flex items-center justify-center">
        <img
          class="max-w-[32px] w-auto mr-1.5 min-h-[24px]"
          src={item.image}
          alt={item.text}
        />
        <span
          class="font-medium text-white text-[12px]"
          dangerouslySetInnerHTML={{ __html: item.text }}
        >
        </span>
      </div>
    );
  });

  return (
    <div
      id={id}
      class={`bg-red-400 w-full h-[45px] transition ${
        microheaderState && "opacity-0 h-0 pointer-events-none"
      }`}
    >
      {!isMobile
        ? (
          <Container class="flex h-full justify-between">
            {listItems}
          </Container>
        )
        : (
          <Slider slidePerView={1} id={id} class="flex h-full justify-center">
            {listItems}
          </Slider>
        )}

      {isMobile && <SliderControllerJS rootId={id} />}
    </div>
  );
}
export default TopBar;
