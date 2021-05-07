import * as React from "react"
import Link from "next/link"
import Logo from "../assets/Logo.svg"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { HiOutlineShare } from "react-icons/hi"
import { useTranslation } from "~/context/translation"
import ChangeLocale from "./ChangeLocale"

export default function Navbar() {
  const [canShare, setCanShare] = React.useState(true)
  const { t } = useTranslation()

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
            </div>
            <div className="hidden md:flex sm:ml-20 sm:mr-0 justify-between lg:ml-20 items-center justify-center space-x-4">
              <Link href="/">
                <a className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("HOME")}
                </a>
              </Link>
              <a
                href="https://verifynum.herokuapp.com/"
                className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("RESOURCE_VERIFIER")}
              </a>
              <Link href="/disclaimer">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("DISCLAIMER")}
                </a>
              </Link>
              <Link href="/about">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("ABOUT")}
                </a>
              </Link>
              <ChangeLocale />
            </div>
            <div className="flex space-x-4 items-center justify-center lg:hidden">
              <ChangeLocale />
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
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 grid pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("HOME")}
                </a>
              </Link>
              <a
                href="https://verifynum.herokuapp.com/"
                className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("RESOURCE_VERIFIER")}
              </a>
              <Link href="/disclaimer">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("DISCLAIMER")}
                </a>
              </Link>
              <Link href="/about">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t("ABOUT")}
                </a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
