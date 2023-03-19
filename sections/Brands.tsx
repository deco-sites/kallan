import Brands from "$store/components/ui/Brands.tsx";
import { BrandsProps } from "$store/components/ui/Brands.tsx";

export type { Image as LiveImage } from "deco-sites/std/components/types.ts";

function BrandsSection(props: BrandsProps) {
  return <Brands {...props} />;
}

export default BrandsSection;
