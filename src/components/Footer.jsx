import Link from "next/link"
// @ts-ignore
import Logo from "../assets/Logo.svg"

import { AiFillGithub } from "react-icons/ai"


const Footer = () => {

  return <footer className="flex flex-col items-center justify-between px-6 py-2 bg-white dark:bg-gray-800 sm:flex-row border-t">

      <div className="space-x-4 mb-4 md:mb-0">
              <Link href="/">
                <a className="hover:bg-gray-700 text-gray focus:bg-red hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
              </Link>
              <Link href="/disclaimer">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Disclaimer
                </a>
              </Link>
              <Link href="/team">
                <a className="hover:bg-gray-700 text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Team
                </a>
              </Link>
            </div>
  
      <Link href="/">
        <a className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mb-4 md:mb-0"><Logo /></a>
      </Link>

        <div className="flex -mx-2">
            <a href="https://github.com/covidarmy/frontend/issues" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github" target='_blank' referrerPolicy='no-referrer'>
               <AiFillGithub  className='text-2xl'/>
            </a>
        </div>
    </footer>
}

export default Footer
