import * as React from "react"
import Link from "next/link"

// ASSETS
// @ts-ignore
import Logo from "../assets/Logo.svg"

// HEADLESS UI
import { Disclosure } from "@headlessui/react"

// ICONS
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { HiOutlineShare } from "react-icons/hi"

export default function Navbar({ lastUpdated = 6 }) {
  const [canShare, setCanShare] = React.useState(true)

  React.useEffect(() => {
    if (!navigator.share) setCanShare(false)
  }, [])

  return (
    <Disclosure as="nav" className="shadow-lg bg-white w-full">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between w-full h-16 px-4 lg:px-20">
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className=" inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center lg:items-end lg:ml-8 sm:ml-10">
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
              <p className="lg:mx-6 sm:mx-1 sm:text-xs text-sm lg:pt-2 text-gray-400">
                Last updated{" "}
                {5 || Math.floor((Date.now() - lastUpdated) / 60000)} minutes
                ago
              </p>
            </div>
            <div className="hidden md:block sm:ml-20 sm:mr-0 space-x-4 justify-between lg:ml-20">
              <Link href="/">
                <a className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
              </Link>
              <a
                href="https://verifynum.herokuapp.com/"
                className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resource Verifier (Beta)
              </a>
              <Link href="/disclaimer">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Disclaimer
                </a>
              </Link>
              <Link href="/about">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
              </Link>
            </div>
            {canShare ? (
              <button
                className="block md:hidden"
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: "Covid.army",
                      text:
                        "Verified Real Time List of COVID-19 Resources and Aid",
                      url: "https://covid.army",
                    })
                  } catch (err) {
                    console.log(err)
                  }
                }}
              >
                <HiOutlineShare className="block h-6 w-6" />
              </button>
            ) : (
              <div className="h-1 w-1 lg:hidden"></div>
            )}
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 grid pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
              </Link>
              <a
                href="https://verifynum.herokuapp.com/"
                className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                target="_blank"
              >
                Resource Verifier (Beta)
              </a>
              <Link href="/disclaimer">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Disclaimer
                </a>
              </Link>
              <Link href="/about">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
