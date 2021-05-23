import Image from "next/image"
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="relative z-10 flex flex-row items-center justify-between px-2 lg:px-6 py-2 mt-auto lg:mt-0 h-16 bg-white dark:bg-gray-800 border-t">
      <div className="flex">
        <div className="flex">
          <a
            href="https://github.com/covidarmy/frontend/"
            className="mx-2 my-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="text-3xl text-black" />
          </a>
        </div>

        <div className="flex">
          <a
            href="https://twitter.com/covid_army"
            className="mx-2 my-2  text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillTwitterCircle className="text-3xl text-blue-500" />
          </a>
        </div>
      </div>

      <div className="mt-2">
        <a
          href={`https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss`}
          target="_blank"
          rel="noopener noreferrer"
          className="transform scale-75"
        >
          <Image
            src="/static/assets/powered-by-vercel.svg"
            width={212}
            height={44}
            alt="Powered by vercel"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
