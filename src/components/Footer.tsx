import Image from "next/image"

import { AiFillGithub } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between px-6 py-2 bg-white dark:bg-gray-800 sm:flex-row border-t">
      <div className="flex -mx-2">
        <a
          href="https://github.com/covidarmy/frontend/issues"
          className="mx-2 my-2  text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Github"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          <AiFillGithub className="text-2xl" />
        </a>
      </div>

      {/* ------------- POWERED BY VERCEL -------------  */}
      <div className="mt-2">
        <a
          href={`https://vercel.com/?utm_source=Covidarmy&utm_campaign=oss`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/static/assets/powered-by-vercel.svg"
            width={212}
            height={44}
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
