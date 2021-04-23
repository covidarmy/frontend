import clsx from "clsx"
import * as React from "react"

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
  ({ active, href, onClick, children, className = "" }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx([
          "rounded-md px-1 lg:px-4 py-0.5 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium focus:outline-none cursor-pointer",
          active ? "bg-gray-600 text-white" : "bg-white hover:bg-gray-300",
          className,
        ])}
      >
        {children}
      </a>
    )
  }
)

export default FilterButton
