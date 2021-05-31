import clsx from "clsx";
import * as React from "react";
import Link from "next/link";

/**
 * @typedef {Object} Props
 * @property {boolean} active
 * @property {Object | string} [href]
 * @property {() => unknown} [onClick]
 * @property {string} [className]
 * @property {React.ReactNode} children
 */

/**
 * @type {React.ForwardRefExoticComponent<Props>}
 */
const FilterButton = React.forwardRef(
  (
    { active, href = "", onClick, children, className = "", isButton = false },
    ref
  ) => {
    const classes = clsx([
      "hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-0.5 px-1 text-sm lg:text-base lg:py-1.5 m-1 lg:px-2 border-transparent hover:border-gray-500 rounded select-none cursor-pointer transition-colors",
      active ? "bg-gray-500 text-white" : "bg-gray-200",
      className,
    ]);

    switch (true) {
      case isButton:
        return <button className={classes} onClick={onClick}></button>;
      default:
        return (
          <Link href={href}>
            <a ref={ref} onClick={onClick} className={classes}>
              {children}
            </a>
          </Link>
        );
    }
  }
);

export default FilterButton;
