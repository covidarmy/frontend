import { useRouter } from "next/router"
import * as React from "react"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import AdditionaResourceItem from "./AdditionalResourceItem"

const AdditionalResources = ({ data }) => {
  const [showAdditional, setShowAdditional] = React.useState(false)
  const router = useRouter()
  const { slug } = router.query

  if (showAdditional)
    return (
      <>
        <dl className="border border-b-0 overflow-hidden border-gray-400 rounded-md">
          {Object.entries(data.common)
            .sort()
            .map(([title, link]) => {
              return (
                <AdditionaResourceItem title={title} key={`${title}-${link}`}>
                  <a
                    target="_blank"
                    href={link}
                    className="text-blue-600 hover:underline"
                  >
                    {link}
                  </a>
                </AdditionaResourceItem>
              )
            })}
          {slug[0] &&
            data[slug[0]] &&
            Object.entries(data[slug[0]])
              .sort()
              .map(([title, link]) => {
                return (
                  <AdditionaResourceItem title={title} key={`${title}-${link}`}>
                    <a
                      target="_blank"
                      href={link}
                      className="text-blue-600 hover:underline"
                    >
                      {link}
                    </a>
                  </AdditionaResourceItem>
                )
              })}
        </dl>
        <button
          onClick={() => setShowAdditional((prev) => !prev)}
          className="text-indigo-600 bg-indigo-200 px-0.5 py-0.5 lg:px-2 lg:py-2 flex items-center justify-center rounded-md focus:outline-none transition duration-75 ease-in gap-2"
        >
          {!showAdditional ? (
            <>
              <HiChevronDown className="h-6 w-6" />
              <span>Show additional resources</span>
            </>
          ) : (
            <>
              <HiChevronUp className="h-6 w-6" />
              <span>Hide additional resources</span>
            </>
          )}
        </button>
      </>
    )

  return null
}

export default AdditionalResources
