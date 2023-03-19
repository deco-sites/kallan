import type { Product } from "deco-sites/std/commerce/types.ts";

export const useVariantPossibilities = ({ isVariantOf }: Product) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ offers, additionalProperty = [], url }) =>
      additionalProperty.map(
        (property) => ({
          property,
          url,
          available: offers?.offers.some((offer) =>
            offer.availability != "https://schema.org/OutOfStock"
          ),
        }),
      )
    )
    .filter((x) => x.url)
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce(
    (acc, { property, url, available: _available }) => {
      const { name = "", value = "" } = property;

      if (url) {
        acc[name] = {
          ...acc[name],
          [url]: value,
        };
      }

      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  return possibilities;
};
