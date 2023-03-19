import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { generateUniqueId } from "$store/sdk/generateId.ts";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
  itemsPerPage,
}: Props) {
  const id = generateUniqueId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="flex flex-col items-center mb-10 "
    >
      <h2 class="text-center row-start-1 col-span-full font-bold text-black mb-4 text-[28px]">
        {title}
      </h2>

      <div class="w-full relative ">
        <Slider
          slidePerView={itemsPerPage}
          class="col-span-full row-start-2 row-end-5 overflow-hidden"
          snap="snap-start sm:snap-start block "
        >
          {products?.map((product) => (
            <ProductCard
              className="border border-gray-department rounded-[6px] max-w-[252px] "
              product={product}
            />
          ))}
        </Slider>

        <div class="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none h-full w-full">
          <button
            class="flex justify-center bg-gray-200  hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition translate-x-[-34px]  rounded-1/2 "
            data-slide="prev"
            aria-label="Previous item"
          >
            <Icon
              class="transition text-black opacity-50"
              size={16}
              id="ChevronLeft"
              strokeWidth={3}
            />
          </button>

          <button
            class="flex justify-center bg-gray-200 hover:shadow items-center h-8 w-8 focus:outline-none pointer-events-auto transition translate-x-[34px]   rounded-1/2 "
            data-slide="next"
            aria-label="Next item"
          >
            <Icon
              class="transition text-black opacity-50"
              size={16}
              id="ChevronRight"
              strokeWidth={3}
            />
          </button>
        </div>

        <SliderControllerJS rootId={id} />
      </div>
    </Container>
  );
}

export default ProductShelf;
