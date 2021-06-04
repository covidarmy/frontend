import { isDesktop } from 'react-device-detect'
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineWhatsApp,
} from 'react-icons/ai'
import VercelLogo from '~/assets/vercel.svg'

const Link = ({ children, link }) => {
  return (
    <a
      href={link}
      className="p-2"
      aria-label="Github"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const DesktopFooter = () => {
  return (
    <footer className="hidden md:flex flex-row items-center justify-between mt-4 px-3 lg:px-0 py-2 bg-white dark:bg-gray-800 border-t">
      <div className="flex items-center">
        <Link link="https://github.com/covidarmy/frontend/">
          <AiFillGithub className="text-3xl text-black" />
        </Link>
        {isDesktop && (
          <Link link="https://wa.me/917404255034?text=Hi">
            <AiOutlineWhatsApp className="text-3xl text-green-500" />
          </Link>
        )}
        <Link link="https://twitter.com/covid_army">
          <AiFillTwitterCircle className="text-3xl text-blue-500" />
        </Link>
      </div>

      <a
        href="https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        Powered by
        <div className="ml-2">
          <VercelLogo />
        </div>
      </a>
    </footer>
  )
}

const Footer = () => {
  return (
    <footer className="mt-4 px-3 lg:px-0 py-2 bg-white dark:bg-gray-800 border-t">
      <div className="container mx-auto flex flex-row items-center justify-between">
      <div className="flex items-center">
        <Link link="https://github.com/covidarmy/frontend/">
          <AiFillGithub className="text-3xl text-black" />
        </Link>
        {isDesktop && (
          <Link link="https://wa.me/917404255034?text=Hi">
            <AiOutlineWhatsApp className="text-3xl text-green-500" />
          </Link>
        )}
        <Link link="https://twitter.com/covid_army">
          <AiFillTwitterCircle className="text-3xl text-blue-500" />
        </Link>
      </div>

      <a
        href="https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        Powered by
        <div className="ml-2">
          <VercelLogo />
        </div>
      </a>
      </div>
    </footer>
  )
}

export default Footer
export { DesktopFooter }
