import * as React from "react"
import Fuse from "fuse.js"
import { useRouter } from "next/router"
import FilterButton from "./FilterButton"
import LocationIcon from "../assets/Location.svg"
import SearchIcon from "../assets/Search.svg"
import { HiChevronDown as DownArrow } from "react-icons/hi"
import { HiChevronUp as UpArrow } from "react-icons/hi"
import Skeleton from "react-loading-skeleton"
import { useCities } from "~/hooks/useCities"
import { useSlug } from "~/context/slug"

export default function LocationFilter() {
  const { location, resource } = useSlug()
  const [cities, topCities, error, isLoading] = useCities()

  const [cityState, setCityState] = React.useState(false)

  const router = useRouter()
  const filter = router.pathname === "/" && "all"
  const [showMore, setShowMore] = React.useState(false)

  const [searchValue, setSearchValue] = React.useState("")

  React.useEffect(() => {
    if (typeof location !== "undefined") {
      setCityState(true)
    } else {
      setCityState(false)
    }
  }, [location])

  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={214} />

  const renderButtons = () => {
    let _data = null

    if (searchValue) {
      const fuse = new Fuse(
        cities.sort().filter((i) => typeof i !== "boolean"),
        { includeScore: true }
      )

      _data = fuse.search(searchValue).map(({ item }) => item)
    }

    if (!showMore) {
      _data =
        _data !== null
          ? _data.length > 8
            ? _data.slice(0, 8)
            : _data
          : [
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
    } else if (_data === null) {
      _data = topCities.sort()
    }

    _data = _data.filter((i) => typeof i !== "boolean")

    return _data.map((item) => {
      /** Location provided by useSlug */
      let currentLocation = location
      /** Location where the FilterButton will route the user to */
      const buttonLocation = item.replace(/\s+/g, "").toString().toLowerCase()

      if (typeof currentLocation === "string") {
        currentLocation = currentLocation.replace(/\s+/g, "").toLowerCase()
      }

      return (
        <FilterButton
          key={item}
          active={currentLocation === item.toLowerCase()}
          href={
            resource === undefined
              ? "/" + buttonLocation
              : `/${buttonLocation}/${resource}`
          }
        >
          {item}
        </FilterButton>
      )
    })
  }

  if (!cityState)
    return (
      <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
        <div className="flex items-center ml-1 mb-1">
          <LocationIcon className="h-5 w-5 mt-1" />
          <p className="text-strong ml-1 mt-0.5 font-bold">Choose Your City</p>
        </div>
        <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
          <input
            className="border-2 w-full relative w-400 border-gray-300 bg-white h-10 px-3 pr-16 rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            name="search"
            placeholder="Search for your city or Select from below"
            onChange={({ currentTarget }) =>
              setSearchValue(currentTarget.value)
            }
          />
          <button
            type="submit"
            className="relative h-7 w-7 ml-2 mt-2"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {renderButtons()}
        </div>
        <div className="mt-2 ml-1">
          <button
            className="hover:underline flex items-center text-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <span>
              {showMore ? "Show only top locations" : "Show most visited"}
            </span>
            {showMore && <UpArrow />}
            {!showMore && <DownArrow />}
          </button>
        </div>
      </div>
    )

  return (
    <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
      <div className="flex ml-1 justify-between">
        <div className="flex items-center">
          <LocationIcon />
          <p className="text-strong ml-1 font-bold capitalize">{location}</p>
        </div>
        <button onClick={() => setCityState(!cityState)}>
          <span className="font-bold text-primary hover:underline">Change</span>
        </button>
      </div>
    </div>
  )
}
