import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

const COLORS = [
  {
  color:"PRETO",
  hex:"#000000"
},
  {
  color:"VINHO",
  hex:"#722f37"
},
  {
  color:"MARROM",
  hex:"#634313"
},
  {
  color:"MARINHO",
  hex:"#000080"
},
  {
  color:"LILÁS",
  hex:"#e4a0f7"
},
  {
  color:"CINZA",
  hex:"#a6a6a6"
},
  {
  color:"BEGE",
  hex:"#faefcd"
},
  {
  color:"ROSA",
  hex:"#ff5eac"
},
  {
  color:"AZUL",
  hex:"#198cff"
},
  {
  color:"CAFÉ",
  hex:"#4b3619"
},
  {
  color:"VERMELHO",
  hex:"#f71919"
},
  {
  color:"BRANCO",
  hex:"#FFFFFF"
},
  {
  color:"NUDE",
  hex:"#dbc29d"
},
  {
  color:"AMARELO",
  hex:"#fffb2b"
},
  {
  color:"LARANJA",
  hex:"#f90"
},
  {
  color:"VERDE",
  hex:"#68e32b"
},
  {
  color:"PRATA",
  hex:"#c0c0c0"
},
  {
  color:"MULTICOLOR",
  hex:""
},
  {
  color:"ROXO",
  hex:"#81007f"
},
  {
  color:"CORAL",
  hex:"#FF7F50"
},
  {
  color:"DOURADO",
  hex:"#d4af37"
},
  {
  color:"SORTIDA",
  hex:"transparent"
},
  {
  color:"TRANSPARENTE",
  hex:"transparentB"
},
  {
  color:"COBRE",
  hex:"#9f7a34"
},
  {
  color:"OURO",
  hex:"#ebc42a"
},
  {
  color:"NAPA SOFT PRETO",
  hex:"transparent"
},
  {
  color:"TAN",
  hex:"transparent"
},
  {
  color:"NAPA SOFT OFF WHITE",
  hex:"transparent"
},
  {
  color:"DOURADO/OURO/BCO",
  hex:"transparent"
},
]

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <input type="checkbox" checked={selected} class="hidden" />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </ul>
  );
}

export default function Filters({ filters }: Props) {
 
  return (
    <ul class="flex flex-col gap-6 p-4">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <Text variant="body">{filter.label}</Text>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}
