import Fuse from "fuse.js"
import { useRouter } from "next/router"
import FilterButton from "./FilterButton"
import { useEffect, useState } from "react"
import LocationIcon from "../assets/Location.svg"
import SearchIcon from "../assets/Search.svg"
import { HiChevronDown as DownArrow } from "react-icons/hi"
import { HiChevronUp as UpArrow } from "react-icons/hi"
import { useCities } from "~/lib/api"
import Skeleton from 'react-loading-skeleton'

export default function LocationFilter({ city, resource }) {
  const { data, error } = useCities()
  const [resources, setResources] = useState(data)
  const [cityState, setCityState] = useState(city ? true : false)

  useEffect(() => {
    if (data) {
      setResources(Object.keys(data))
    }
  }, [data])

  const router = useRouter()
  const filter = router.pathname === "/" && "all"
  const [showMore, setShowMore] = useState(false)

  const [searchValue, setSearchValue] = useState("")

  if (error) return <div>failed to load</div>
  if (!data) return <Skeleton count={5}/>

  const renderButtons = () => {
    let _data = null

    if (searchValue) {
      const fuse = new Fuse(
        resources.sort().filter((i) => typeof i !== "boolean"),
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
      _data = resources.sort()
    }

    _data = _data.filter((i) => typeof i !== "boolean")

    return _data.map((item) => {
      return (
        <FilterButton
          key={item}
          active={
            typeof city === "string" &&
            city.toLowerCase() === item.toLowerCase()
          }
          href={
            resource === null
              ? "/" + item.toString().toLowerCase()
              : `/${item.toString().toLowerCase()}/${resource}`
          }
        >
          {item}
        </FilterButton>
      )
    })
  }

  return !cityState ? (
    <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
      {/* ICON */}
      <div className="flex ml-1 mb-1">
        <LocationIcon className="h-5 w-5 mt-1" />
        <p className="text-strong ml-1 mt-0.5 font-bold">Choose Your City</p>
      </div>
      {/* SEARCHBOX */}
      <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
        <input
          className="border-2 w-full relative w-400 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search for your city or Select from below"
          onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
        />
        <button type="submit" className="relative mt-0">
          <SearchIcon />
        </button>
      </div>
      {/* RENDER PELLETS */}
      <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
        {renderButtons()}
      </div>
      {/* SHOW MORE */}
      <div className="mt-2 ml-1">
        <button
          className="hover:text-underline flex text-indigo-600"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <span>
            {showMore ? "Show only top locations" : "Show all locations"}
          </span>
          {showMore && <UpArrow />}
          {!showMore && <DownArrow />}
        </button>
      </div>
    </div>
  ) : (
    <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
      <div className="flex ml-1 justify-between">
        <div className="flex">
          {/* ICON */}
          <LocationIcon />
          {/* CITY NAME */}
          <p className="text-strong ml-1 mt-0.5 font-bold capitalize">{city}</p>
        </div>

        {/* CHANGE BUTTON */}
        <button onClick={() => setCityState(!cityState)}>
          <span className="font-bold text-primary">Change</span>
        </button>
      </div>
    </div>
  )
}
