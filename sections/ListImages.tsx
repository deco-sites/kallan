export type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import { ImagesProps } from "$store/components/ui/ListImages.tsx";
import ListImages from "$store/islands/ListImages.tsx";

function ListImagesSection(props: ImagesProps) {
  return <ListImages {...props} />;
}

export default ListImagesSection;
