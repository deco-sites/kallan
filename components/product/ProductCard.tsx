import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class=" grid grid-cols-4 grid-rows-2 justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url} class="flex justify-center">
          <Avatar
            class="bg-default  "
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  className?: string;
}

function ProductCard({ product, preload, className }: Props) {
  const {
    url,
    productID,
    isVariantOf,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller, installments } = useOffer(offers);

  const installmentsFormated = installments?.replace("sem juros", "");
  const formatedName = isVariantOf?.name;

  return (
    <div
      id={`product-card-${productID}`}
      class={`w-full group overflow-hidden group ${className}  p-[15px]`}
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full max-w-[244px]">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={244}
            height={244}
            class="rounded w-full"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
        </div>

        <div class="flex flex-col gap-1 py-2">
          <h3
            class="overflow-hidden overflow-ellipsis text-[14px] text-black font-bold h-10 "
            variant="caption"
          >
            {formatedName}
          </h3>
          <div class="flex items-center  flex-col items-start">
            <p class="text-red-700 font-bold text-default text-[16px]">
              {installmentsFormated}
            </p>
            <Text
              class="line-through "
              variant="list-price"
              tone="subdued"
            >
              {/* {formatPrice(listPrice, offers!.priceCurrency!)} */}
            </Text>
            <p class=" font-bold text-default text-[16px] text-black mb-5">
              {formatPrice(price, offers!.priceCurrency!)}
            </p>
          </div>
          <Button
            class="bg-red-500 w-full text-white rounded-[6px]"
            href={product.url}
          >
            ADICIONAR AO CARRINHO
          </Button>
          {seller && (
            <div class="card-hover group-hover:card-hover-2  flex-col gap-2 w-full bg-white hidden">
              <Sizes {...product} />
              <Button as="a" href={product.url}>Visualizar Produto</Button>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
