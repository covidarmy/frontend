import * as React from "react"
import Link from "next/link"
import { Disclosure, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { HiOutlineShare } from "react-icons/hi"
import { useTranslation } from "~/context/translation"
import ChangeLocale from "./ChangeLocale"

// COMPONENTS
import NavLink from "./NavLink"
import Logo from "./Logo"
import { useAuth } from "~/context/auth"

export default function Navbar() {
  const [canShare, setCanShare] = React.useState(true)
  const { t } = useTranslation()
  const { isAuthenticated, signOut } = useAuth()

  React.useEffect(() => {
    if (!navigator.share) setCanShare(false)
  }, [])

  return (
    <Disclosure as="header" className="shadow-lg bg-white w-full">
      {({ open }) => (
        <nav>
          <div className="flex items-center justify-between w-full h-16 lg:px-20 px-2 sm:px-4">
            <div className="-mr-2 flex lg:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <Link href="/" passHref>
              <a aria-label="Covid Army Logo">
                <Logo className="lg:w-[146px] lg:h-[27px] w-[120px] h-[22px]" />
              </a>
            </Link>
            <div className="hidden lg:flex items-center space-x-4 justify-between">
              <NavLink url="https://donate.indiacovidresources.in/" isExternal>
                {t("DONATE")}
              </NavLink>
              <NavLink url="http://plasma.indiacovidresources.in/" isExternal>
                {t("PLASMA")}
              </NavLink>
              <NavLink url="/disclaimer">{t("DISCLAIMER")}</NavLink>
              <NavLink url="/about">{t("ABOUT")}</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink url="/dashboard">Dashboard</NavLink>
                  <NavLink onClick={signOut} isButton>
                    Sign out
                  </NavLink>
                </>
              ) : (
                <NavLink url="/login">Volunteer login</NavLink>
              )}
              <ChangeLocale />
            </div>
            <>
              <div className="lg:hidden">
                <ChangeLocale />
              </div>
              {canShare ? (
                <button
                  className="block lg:hidden mr-1"
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
            </>
          </div>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="lg:hidden" static>
              <div className="px-2 grid pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink
                  url="https://donate.indiacovidresources.in/"
                  isExternal
                >
                  {t("DONATE")}
                </NavLink>
                <NavLink url="http://plasma.indiacovidresources.in/" isExternal>
                  {t("PLASMA")}
                </NavLink>
                <NavLink url="/disclaimer">{t("DISCLAIMER")}</NavLink>
                <NavLink url="/about">{t("ABOUT")}</NavLink>
                {isAuthenticated ? (
                  <>
                    <NavLink url="/dashboard">Dashboard</NavLink>
                    <NavLink onClick={signOut} isButton>
                      Sign out
                    </NavLink>
                  </>
                ) : (
                  <NavLink url="/login">Volunteer login</NavLink>
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </nav>
      )}
    </Disclosure>
  )
}
