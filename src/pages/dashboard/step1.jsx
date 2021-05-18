import { useRouter } from "next/router"
import * as React from "react"
import Link from "next/link"
import Fuse from "fuse.js"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"
import BackIcon from "~/assets/arrow-left.svg"
import { useTranslation } from "~/context/translation"
import { useCities } from "~/hooks/useCities"
import LocationIcon from "~/assets/Location.svg"
import FilterButton from "~/components/FilterButton"
import SearchIcon from "~/assets/Search.svg"
import { HiChevronDown as DownArrow } from "react-icons/hi"
import { HiChevronUp as UpArrow } from "react-icons/hi"

const LocationFilterCustom = () => {
  const { t } = useTranslation()
  const [cities, topCities, error, isLoading] = useCities()

  const router = useRouter()
  const filter = router.pathname === "/" && "all"
  const [showMore, setShowMore] = React.useState(false)

  const [searchValue, setSearchValue] = React.useState("")

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
        <FilterButton key={item} active={false} href={"/dashboard/step2"}>
          {item}
        </FilterButton>
      )
    })
  }

  return (
    <div className="bg-white h-auto w-full my-2">
      <div className="flex items-center ml-1 mb-1">
        <LocationIcon className="h-5 w-5 mt-1" />
        <p className="text-strong ml-1 mt-0.5 font-bold">
          {t("CHOOSE_LOCATION")}
        </p>
      </div>
      {/* search bar */}
      <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
        <input
          className="border-2 w-full relative w-400 border-gray-300 bg-white h-10 pl-10 pr-4 rounded-lg text-sm transition-all focus:outline-none focus:ring focus:border-blue-300"
          type="search"
          name="search"
          placeholder="Start searching any city"
          onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
        />
        <SearchIcon className="absolute top-5 left-4" />
      </div>
      <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
        {renderButtons()}
      </div>
      <div className="mt-2 ml-1">
        <button
          className="hover:underline flex items-center text-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <span>{showMore ? "Most visited" : "Show all top locations"}</span>
          {showMore && <UpArrow />}
          {!showMore && <DownArrow />}
        </button>
      </div>
    </div>
  )
}

const Step1Page = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  if (loading) return <LoadingPage />

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
        <div
          className="shadow-md bg-white py-6 px-6 sm:px-10 w-full "
          style={{ maxWidth: "32rem" }}
        >
          <div className="flex items-center">
            <Link href="/">
              <a aria-label="Back Button">
                <BackIcon />
              </a>
            </Link>
            <div className="w-full">
              <p className="text-sm text-center">Step 1 of 3</p>
            </div>
          </div>
          <hr className="my-6" />
          <LocationFilterCustom />
        </div>
      </main>
    </div>
  )
}

export default Step1Page
