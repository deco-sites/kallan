import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}

export function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart } = useCart();
  const totalItems = cart.value?.items.length || null;

  return (
    <button
      className="flex items-center h-full rounded-none! bg-transparent! outline-none! relative h-full border-none!"
      class="relative"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <span class="text-[14px] text-black mr-2 lgMax:hidden">Sacola</span>
      <Icon id="ShoppingCart" width={22} height={26} strokeWidth={2} />
      {totalItems && (
        <span class="absolute text-[9px] right-[-10px] top-0 rounded-full bg-red-400 text-white w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
