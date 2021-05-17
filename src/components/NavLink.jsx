import * as React from "react"
import Link from "next/link"

export default function NavLink({
  url,
  children,
  isExternal = false,
  isButton,
  onClick = false,
}) {
  const linkClasses =
    "hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"

  switch (true) {
    case isButton:
      return <button className={linkClasses} onClick={onClick}></button>
    case isExternal:
      return (
        <a
          className={linkClasses}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    default:
      return (
        <Link href={url}>
          <a className={linkClasses}>{children}</a>
        </Link>
      )
  }
}
