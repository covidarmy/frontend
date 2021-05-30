import * as React from "react"
import Skeleton from "react-loading-skeleton"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import Fuse from "fuse.js"
import { useRouter } from "next/router"
import { useAuth } from "~/context/auth"
import { useLeads } from "~/hooks/useLeads"
import { isMobile, isTablet, isDesktop } from "react-device-detect"

import AwardIcon from "~/assets/award.svg"
import HeartIcon from "~/assets/heart.svg"
import SearchIcon from "~/assets/Search.svg"
import EditIcon from "~/assets/edit.svg"
import CheckMarkIcon from "~/assets/checkmark.svg"
import UnverfiedIcon from "~/assets/unverfied.svg"
import DeleteIcon from "~/assets/delete.svg"
import MoreIcon from "~/assets/more.svg"
import PlusIcon from "~/assets/plus.svg"

import ReactTooltip from "react-tooltip"
import { useCopyToClipboard } from "~/hooks/useCopyToClipboard"
import { Menu, RadioGroup, Transition } from "@headlessui/react"
import { API_BASE_URL } from "~/constants"

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

const FilterButtonGroup = () => {
  let [selectedFilter, setSelectedFilter] = React.useState()
  const filters = ["week", "month", "2 months", "6 months"]

  return (
    <RadioGroup
      value={selectedFilter}
      onChange={setSelectedFilter}
      className="hidden md:flex items-center gap-4 justify-between"
    >
      {filters.map((filter) => (
        <RadioGroup.Option key={filter} value={filter} className="h-full">
          {({ checked }) => (
            <button
              className={`${
                checked ? "bg-blue-500 text-white" : "bg-white text-gray-500"
              } justify-center min-w-max h-full items-center px-4 py-2 shadow-md rounded-lg transition-shadow border hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring focus:border-blue-300`}
            >
              {filter}
            </button>
          )}
        </RadioGroup.Option>
      ))}
      <button
        className="hidden md:block min-w-max h-full px-4 py-2 shadow-md rounded-lg bg-white text-gray-500 transition-shadow border active:bg-blue-500 active:text-white hover:shadow-sm hover:border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => {
          setSelectedFilter("")
        }}
      >
        Clear Filter
      </button>
    </RadioGroup>
  )
}

const ClickToCopyButton = ({ text }) => {
  const [copied, setCopied, copy] = useCopyToClipboard(text)

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])

  return (
    <>
      <ReactTooltip />
      <button
        onClick={copy}
        data-tip={copied ? "Copied" : "Click to copy"}
        className="py-2 px-4 rounded font-semibold transition-colors bg-gray-100 hover:bg-gray-300"
      >
        {text}
      </button>
    </>
  )
}

const EditDropdownMenu = ({ authToken, user }) => {
  const handleDelete = () => {
    console.log(user)

    fetch(`${API_BASE_URL}/volunteer/contacts/`, {
      method: "DELETE",
      headers: {
        authorization: authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact_id: user._id }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button className="py-2 focus:outline-none focus:ring focus:border-blue-300">
            <MoreIcon />
          </Menu.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 py-3 px-2 rounded-lg shadow-lg bg-white">
              <Menu.Item>
                <button className="flex items-center px-4 py-2 w-full transition-colors hover:bg-gray-100">
                  <EditIcon />
                  <p className="ml-2">Edit</p>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center px-4 py-2 w-full transition-colors hover:bg-gray-100"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                  <p className="ml-2">Delete</p>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
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
  authToken,
  user,
}) => {
  return (
    <div className="bg-white py-4 px-3 md:px-5 rounded-lg shadow-md mt-3 md:mt-5">
      <p className="text-gray-500 text-sm">{`Last updated at ${getFormattedData(
        updatedAt
      )}`}</p>
      <hr className="my-4" />

      {/* title */}
      {(isMobile || isTablet) && (
        <>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold mr-auto">{title}</h3>
            <EditDropdownMenu authToken={authToken} user={user} />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
              {resourceType}
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
              {city + ", " + state}
            </div>
          </div>
        </>
      )}
      {isDesktop && (
        <div className="flex items-center gap-3">
          <h3 className="font-semibold mr-auto">{title}</h3>
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
              {resourceType}
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded">
              {city + ", " + state}
            </div>
          </div>
          <EditDropdownMenu authToken={authToken} user={user} />
        </div>
      )}

      {/* phone_no */}
      <div className="mt-6">
        <p className="text-gray-400 text-sm">
          Contact numbers provided <small>(click to copy)</small>
        </p>
        <div className="flex items-center mt-2 gap-3">
          <ClickToCopyButton text={contactNo} />
          {status === "ACTIVE" ? (
            <div className="inline-flex items-center justify-center text-green-600 ml-auto py-2 px-4 rounded font-semibold">
              <CheckMarkIcon />
              <div className="ml-2">Verified</div>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center text-red-600 ml-auto py-2 px-4 rounded font-semibold">
              <UnverfiedIcon />
              <div className="ml-2">Unverified</div>
            </div>
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
      <section className="flex gap-8 p-4 pt-3 md:pt-6 mx-auto max-w-6xl rounded-lg">
        {/* sidebar */}
        <aside
          className="hidden md:flex flex-col gap-3 w-full"
          style={{ minWidth: "11rem" }}
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
          <div className="flex gap-4 h-14">
            {/* search-bar */}
            <div className="w-full relative" style={{ minWidth: "21rem" }}>
              <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearch(e)}
                placeholder="search a lead using keywords"
                className="pl-4 min-w-max w-full h-full py-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
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
                user={lead}
                authToken={authToken}
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
      {/* floating button */}
      {isMobile && (
        <button
          className="bg-blue-600 p-2 rounded-full shadow-md fixed bottom-6 right-5"
          onClick={() => router.push("/dashboard/add")}
        >
          <PlusIcon />
        </button>
      )}
    </div>
  )
}
