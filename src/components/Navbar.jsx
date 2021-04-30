import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Link from "next/link"
import Team from "../pages/team"
import Logo from "../assets/Logo.svg"

const navigation = ["Home", "Share", "How it Works", "Team"]

export default function Navbar({ lastUpdated }) {

  function onClick(event) {
    return (
      console.log(event)
    )
  }
  return (
    <Disclosure as="nav" className="shadow-lg bg-white w-full">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between w-full h-16 px-4 lg:px-20">
            <div className="lg:flex lg:ml-8 mr-20 sm:ml-10">
              <Logo/>
              <p className="lg:mx-6 sm:mx-1 sm:text-xs text-sm lg:pt-2 text-gray-400">
                Last updated {5 || Math.floor((Date.now() - lastUpdated)/60000)} minutes ago
              </p>
            </div>
            <div className="hidden md:block sm:ml-20 sm:mr-0 space-x-4 justify-end lg:ml-20">
              <Link href='/'>
                <a className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Share</a>
              </Link>
              <Link href='/team'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
              </Link>
              {/* {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <a
                    key={item}
                    href={"/"+item.toLocaleLowerCase()}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item}
                  </a>
                )
              )} */}
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="bg-gray-300 inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 grid pt-2 pb-3 space-y-1 sm:px-3">
              {/* {navigation.map((item, itemIdx) => (
                <a
                  key={item}
                  href="/"
                  className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item}
                </a>
              ))} */}
              <Link href='/'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </Link>
              <Link href='/coming'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Share</a>
              </Link>
              <Link href='/team'>
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
