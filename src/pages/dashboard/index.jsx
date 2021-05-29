import * as React from "react"
import Skeleton from "react-loading-skeleton"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import Fuse from "fuse.js"
import { useRouter } from "next/router"
import { useAuth } from "~/context/auth"
import { useLeads } from "~/hooks/useLeads"

import AwardIcon from "~/assets/award.svg"
import HeartIcon from "~/assets/heart.svg"
import SearchIcon from "~/assets/Search.svg"
import EditIcon from "~/assets/edit.svg"
import CheckMarkIcon from "~/assets/checkmark.svg"

const getTotalUsersFromLeads = (leads) => {
  const uniqueUsers = []
  leads.forEach((lead) => {
    if (!uniqueUsers.includes(lead.userId[0])) {
      uniqueUsers.push(lead.userId[0])
    }
  })
  return uniqueUsers.length
}

const getFormattedData = (date) => {
  // 2021-05-29T05:31:06.921Z
  const dateString = date.split("-")
  const year = dateString[0]
  const month = dateString[1]
  const day = dateString[2].split("T")[0]

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const formattedString = `${day} ${monthNames[+month - 1]} ${year}`
  return formattedString
}

const FilterButton = ({ text, active }) => {
  const [isActive, setIsActive] = React.useState(active)
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`${
        isActive ? "bg-blue-500 text-white" : "bg-white text-gray-500"
      } flex justify-center min-w-max h-full items-center px-4 py-2 shadow-md rounded-lg transition-all border hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring focus:border-blue-300`}
    >
      {text}
    </button>
  )
}

const FilterButtonGroup = () => {

  return (
    <div className="flex items-center gap-5 justify-between">
      <FilterButton text="week" />
      <FilterButton text="month" />
      <FilterButton text="2 months" />
      <FilterButton text="6 months" />
      <FilterButton text="1 year" />
    </div>
  )
}

const Card = ({
  title,
  resourceType,
  city,
  state,
  status,
  message,
  contactNo,
  updatedAt,
}) => {
  const router = useRouter()

  return (
    <div className="bg-white py-4 px-5 rounded-lg shadow-md mt-5">
      <p className="text-gray-500 text-sm">{`Last updated at ${getFormattedData(
        updatedAt
      )}`}</p>
      <hr className="my-4" />

      {/* title */}
      <div className="flex items-center gap-3">
        <h3 className="font-semibold mr-auto">{title}</h3>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
          {resourceType}
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
          {city + ", " + state}
        </div>
        <button
          className="px-3"
          onClick={() => {
            router.push("/dashboard/add")
          }}
        >
          <EditIcon />
        </button>
      </div>

      {/* phone_no */}
      <div className="mt-6">
        <p className="text-gray-400 text-sm">Contact numbers provided</p>
        <div className="flex items-center mt-2 gap-3">
          <button
            className="py-2 px-4 rounded font-semibold"
            style={{ background: "#F4F4F4" }}
          >
            {contactNo}
          </button>
          {status === "ACTIVE" && (
            <button className="inline-flex items-center justify-center bg-green-100 text-green-600 ml-auto py-2 px-4 rounded font-semibold">
              <CheckMarkIcon />
              <div className="ml-2">Verified</div>
            </button>
          )}
        </div>
      </div>

      {/* message */}
      {message !== null && (
        <div>
          <p className="text-gray-400 text-sm mt-5">Message/remarks</p>
          <p className="bg-gray-100 p-4 mt-2 rounded">{message}</p>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const { authToken, isAuthenticated, loading } = useAuth()
  const [leads] = useLeads(authToken)
  const [filteredLeads, setFilteredLeads] = React.useState(leads)
  const [searchText, setSearchText] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  React.useEffect(() => {
    setFilteredLeads(leads)
  }, [leads])

  React.useEffect(() => {
    if (searchText === "") {
      setFilteredLeads(leads)
    }
  }, [searchText])

  const handleSearch = (e) => {
    setSearchText(e.target.value)

    if (searchText !== "" && searchText) {
      const fuse = new Fuse(leads, {
        keys: ["title", "category", "city", "message", "state", "contact_no"],
      })
      const filteredList = fuse.search(searchText).map(({ item }) => item)

      setFilteredLeads(filteredList)
    } else {
      setFilteredLeads(leads)
    }
  }

  if (loading) return <LoadingPage />
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <section className="flex gap-8 p-4 pt-8 mx-auto max-w-6xl rounded-lg">
        {/* sidebar */}
        <aside
          className="hidden lg:flex flex-col gap-3 w-full"
          style={{ maxWidth: "11rem" }}
        >
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md h-14 transition-shadow hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => router.push("/dashboard/add")}
          >
            Add a lead
          </button>
          {/* total people */}
          {leads !== undefined ? (
            <div className="shadow-lg p-4 bg-white rounded-lg">
              <p className="text-gray-400">People helped</p>
              <div className="flex items-center mt-3">
                <HeartIcon />
                <p className="ml-1 text-lg text-blue-600">
                  {getTotalUsersFromLeads(leads)}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton height="6rem" />
          )}
          {/* total leads */}
          {leads !== undefined ? (
            <div className="shadow-lg p-4 bg-white rounded-lg">
              <p className="text-gray-400">Leads provided</p>
              <div className="flex items-center mt-3">
                <AwardIcon />
                <p className="ml-1 text-lg text-blue-600">{leads.length}</p>
              </div>
            </div>
          ) : (
            <Skeleton height="6rem" />
          )}
        </aside>

        {/* main content */}
        <main>
          <div
            className="flex flex-col md:flex-row gap-5"
            style={{ minHeight: "3.5rem" }}
          >
            {/* search-bar */}
            <div className="w-full relative" style={{ minWidth: "21rem" }}>
              <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearch(e)}
                placeholder="search a lead using keywords"
                className="pl-4 w-full h-full py-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="absolute right-4 top-5 transform scale-125">
                <SearchIcon />
              </div>
            </div>
            {/* btns */}
            <FilterButtonGroup />
          </div>

          {/* cards */}
          {filteredLeads !== undefined ? (
            filteredLeads.map((lead) => (
              <Card
                key={lead._id}
                title={lead.title}
                resourceType={lead.resource_type}
                city={lead.city}
                state={lead.state}
                status={lead.status}
                message={lead.message}
                contactNo={lead.contact_no}
                updatedAt={lead.updatedAt}
              />
            ))
          ) : (
            <>
              <Skeleton height="14rem" className="mt-5" />
              <Skeleton height="14rem" className="mt-5" />
              <Skeleton height="14rem" className="mt-5" />
            </>
          )}
        </main>
      </section>
    </div>
  )
}