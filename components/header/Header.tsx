import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useEffect, useState } from "preact/compat";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import TopBar from "./TopBar.tsx";
import Container from "../ui/Container.tsx";
import Searchbar from "../search/Searchbar.tsx";
import HeaderButton from "./Buttons.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";
import IconUser from "./IconUser.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  topBarItems?: {
    image: LiveImage;
    text: string;
    description: string;
  }[];

  logo: LiveImage;
}

function Header(
  {
    topBarItems,
    logo,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions, configVTEX };
  return (
    <header class={`h-[160px] transition lgMax:h-[177px]`}>
      <div class=" fixed w-full left-0 top-0 z-50 bg-white">
        <TopBar items={topBarItems} />
        <Container class="flex justify-between items-center py-[15px] lgMax:pl-2.5 lgMax:pr-3">
          <a class="contents" href="/">
            <img src={logo} alt="Logo" />
          </a>
          <Searchbar className="lgMax:hidden " />
          <div class="flex items-center gap-7">
            <button
              className="flex items-center h-full rounded-none! bg-transparent! outline-none! relative h-full border-none!"
              as="a"
              aria-label="Log in"
            >
              <p class="text-[14px] font-medium text-black lgMax:hidden">
                Login
              </p>
              <IconUser />
            </button>
            <HeaderButton variant="cart" />
          </div>
        </Container>
        <Searchbar className="lg:hidden px-2.5! my-2.5" />
      </div>
      <Modals
        menu={{ items: navItems }}
        searchbar={searchbar}
      />
    </header>
  );
}

export default Header;
