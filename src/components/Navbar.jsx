import * as React from "react"
import Link from "next/link"
import Logo from "../assets/Logo.svg"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { HiOutlineShare } from "react-icons/hi"
import { useTranslation } from "~/context/translation"
import ChangeLocale from "./ChangeLocale"

// COMPONENTS
import NavLink from "./NavLinks"

export default function Navbar() {
  const [canShare, setCanShare] = React.useState(true)
  const { t } = useTranslation()

  React.useEffect(() => {
    if (!navigator.share) setCanShare(false)
  }, [])

  return (
    <Disclosure as="header" className="shadow-lg bg-white w-full">
      {({ open }) => (
        <nav>
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
                <a aria-label="Covid Army Logo">
                  <Logo />
                </a>
              </Link>
            </div>
            <div className="hidden md:block sm:ml-20 sm:mr-0 space-x-4 justify-between lg:ml-20">
              <NavLink url="https://donate.indiacovidresources.in/" isExternal>
                {t("DONATE")}
              </NavLink>
              <NavLink url="http://plasma.indiacovidresources.in/" isExternal>
                {t("PLASMA")}
              </NavLink>
              <NavLink url="/disclaimer">{t("DISCLAIMER")}</NavLink>
              <NavLink url="/about">{t("ABOUT")}</NavLink>
              <ChangeLocale />
            </div>
            <div className="flex space-x-4 items-center justify-center lg:hidden mr-4 lg:mr-0">
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
              <NavLink url="https://donate.indiacovidresources.in/" isExternal>
                {t("DONATE")}
              </NavLink>
              <NavLink url="http://plasma.indiacovidresources.in/" isExternal>
                {t("PLASMA")}
              </NavLink>
              <NavLink url="/disclaimer">{t("DISCLAIMER")}</NavLink>
              <NavLink url="/about">{t("ABOUT")}</NavLink>
            </div>
          </Disclosure.Panel>
        </nav>
      )}
    </Disclosure>
  )
}
