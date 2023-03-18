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
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="flex flex-col items-center mb-8"
    >
      <h2 class="text-center row-start-1 col-span-full font-bold text-black mb-4 text-2xl ">
        {title}
      </h2>

      <Slider
        slidePerView={itemsPerPage}
        class="col-span-full row-start-2 row-end-5 "
        snap="snap-start sm:snap-start block "
      >
        {products?.map((product) => <ProductCard product={product} />)}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <div class="absolute right-1/2 bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="prev" aria-label="Previous item">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <div class="absolute left-1/2 bg-interactive-inverse rounded-full border-default border">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />
    </Container>
  );
}

export default ProductShelf;
