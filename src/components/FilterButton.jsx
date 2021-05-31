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
  ({ active, href = "", onClick, children, isButton = false }, ref) => {
    const classes = `px-2 py-1 md:px-3 md:py-2 m-1 text-sm md:text-base rounded transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-200 hover:bg-gray-500 hover:text-white"
    }`;

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
