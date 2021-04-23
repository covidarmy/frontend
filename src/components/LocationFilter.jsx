import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import FilterButton from "./FilterButton"

export default function LocationFilter({ filter, data }) {
  const router = useRouter()
  const { city: toRemove, ...query } = router.query
  const [showMore, setShowMore] = React.useState(false)

  const renderButtons = () => {
    let _data = data.sort()

    if (!showMore) {
      _data = [
        "Delhi",
        "Bangalore",
        "Chennai",
        "Mumbai",
        "Kolkata",
        "Lucknow",
        "Noida",
        "Gurgaon",
      ]
      if (filter !== "all" && !_data.includes(filter)) {
        _data = [..._data, filter]
      }
    }

    return _data.map((city) => {
      return (
        <Link
          key={city}
          href={{
            pathname: "/",
            query: {
              city,
              ...query,
            },
          }}
          passHref
        >
          <FilterButton active={filter === city}>{city}</FilterButton>
        </Link>
      )
    })
  }

  return (
    <div className="flex flex-col mx-auto lg:w-4/5 lg:grid lg:grid-cols-6 items-center justify-center space-y-6 lg:space-y-0 lg:space-x-16">
      <div className="flex items-center justify-center space-x-6 lg:col-span-1">
        <span className="text-lg font-semibold">Location Filter</span>
        <div className="h-8 border-r hidden lg:block border-gray-600" />
      </div>
      <span className="flex lg:col-span-5 items-center justify-center gap-2 lg:gap-6 flex-wrap">
        <Link
          href={{
            pathname: "/",
            query,
          }}
        >
          <FilterButton active={filter === "all"}>All</FilterButton>
        </Link>
        {renderButtons()}
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-indigo-600 bg-indigo-200 px-0.5 py-0.5 lg:px-2 lg:py-2 flex items-center justify-center rounded-md focus:outline-none transition duration-75 ease-in gap-2"
        >
          {!showMore ? (
            <>
              <HiChevronDown className="h-6 w-6" />
              <span>Show more locations (Total: {data.length})</span>
            </>
          ) : (
            <>
              <HiChevronUp className="h-6 w-6" />
              <span>Show only top locations</span>
            </>
          )}
        </button>
      </span>
    </div>
  )
}
