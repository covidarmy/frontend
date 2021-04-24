import clsx from "clsx"
import { useRouter } from "next/router"
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
  ({ href, onClick, children, className = "" }, ref) => {
    const { query } = useRouter()
    let active = false
    if (query.slug) active = query.slug[0] === children.toString()

    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx([
          "bg-gray-200 hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-0.5 px-1 text-sm lg:text-base lg:py-2 m-1 lg:px-4 border-transparent hover:border-gray-500 rounded",
        ])}
      >
        {children}
      </a>
    )
  }
)

export default FilterButton
