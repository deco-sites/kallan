import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <Text
          class="border-solid border-b border-white group-hover:text-red-400 text-[15px] font-medium"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-[#ffffff] z-50 flex items-start gap-6 border-t-1 border-b-2 border-default w-screen mt-[${headerHeight}] `}
            style={{ top: "0px", left: "0px" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="underline" href={node.href}>
                    <Text variant="menu" class="uppercase hover:text-red-400">
                      {node.label}
                    </Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a href={leaf.href}>
                          <Text variant="caption" class="hover:text-red-400">
                            {leaf.label}
                          </Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
