import { Children } from "preact/compat";
import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["ul"] & {
  snap?: string;
  slidePerView?: number;
};

function Slider({
  children,
  snap = "snap-start",
  class: _class = "scrollbar-none",
  slidePerView = 1,
  ...props
}: Props) {
  return (
    <ul
      data-slider
      class={`flex items-center overflow-x-auto snap-x snap-mandatory overflow-x-hidden ${_class}`}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <li
          className={`min-w-[calc(100%/${slidePerView})]`}
          data-slider-item={index}
          class={snap}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}

export default Slider;
