import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";

import ProductSelector from "./ProductVariantSelector.tsx";
import { generateUniqueId } from "../../sdk/generateId.ts";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
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

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    gtin,
    isVariantOf,
  } = product;

  const { name } = isVariantOf ?? {};

  const { price, listPrice, seller, installments } = useOffer(offers);

  const id = generateUniqueId();

  return (
    <Container class="py-0 sm:py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-10">
        {/* Image Gallery */}
        <div
          id={id}
          class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2 relative"
        >
          <Slider
            slidePerView={1}
            class="col-span-full row-start-2 row-end-5 overflow-hidden"
            snap="snap-start sm:snap-start block "
          >
            {images?.map((img, index) => (
              <Image
                style={{ aspectRatio: "596 / 596" }}
                class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px] border-[1px] border-solid border-gray-300"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={img.url!}
                alt={img.alternateName}
                width={596}
                height={596}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </Slider>
          <Controls />
          <SliderControllerJS
            rootId={id}
          />
        </div>
        {/* Product Info */}
        <div class="flex-auto px-4 sm:px-0">
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            <h1>
              <Text variant="heading-3" class="uppercase bold">{name}</Text>
            </h1>
            <div>
              <Text
                tone="subdued"
                variant="caption"
                class="size-[11px] uppercase font-bold"
              >
                ref:{gtin}
              </Text>
            </div>
          </div>
          {/* Prices */}
          <div class="mt-4">
            <Text class="uppercase text-red-500 text-[18px]">
              {installments}
            </Text>
            <div class="flex flex-row gap-2 items-center">
              <Text
                class="line-through"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text tone="price" variant="heading-3">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {seller && (
              <AddToCartButton
                skuId={productID}
                sellerId={seller}
              />
            )}
          </div>
        </div>
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6 max-w-[980px] mx-auto">
        <Text variant="caption">
          {description && (
            <div>
              <h3 class="cursor-pointer text-red-500 uppercase bold">
                Descrição
              </h3>
              <div class="ml-2 mt-2">{description}</div>
            </div>
          )}
        </Text>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
