import * as React from "react"
import Skeleton from "react-loading-skeleton"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useRouter } from "next/router"
import { useAuth } from "~/context/auth"
import { useLeads } from "~/hooks/useLeads"

import AwardIcon from "~/assets/award.svg"
import HeartIcon from "~/assets/heart.svg"
import SearchIcon from "~/assets/Search.svg"
import EditIcon from "~/assets/edit.svg"
import CheckMarkIcon from "~/assets/checkmark.svg"

const FilterButton = ({ text }) => {
  return (
    <button className="flex justify-center items-center px-4 py-5 bg-white text-gray-500 shadow-md rounded-lg transition-all border hover:shadow-sm hover:border-gray-300">
      {text}
    </button>
  )
}

const Card = ({ title, resourceType, city, status, message, contactNo }) => {
  return (
    <div className="bg-white py-4 px-5 rounded-lg shadow-md mt-5">
      <p className="text-gray-500 text-sm">25 May 2021 • 1 lead</p>
      <hr className="my-4" />

      {/* title */}
      <div className="flex items-center gap-3">
        <h3 className="font-semibold mr-auto">{title}</h3>
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
          {resourceType}
        </button>
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
          {city}
        </button>
        <button className="px-3">
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
            <button className="inline-flex items-center justify-center bg-green-200 text-green-600 ml-auto py-2 px-4 rounded font-semibold">
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
          <p className="bg-gray-100 p-4 mt-2 rounded">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla enim
            ipsum mollitia sequi beatae temporibus impedit nihil quis maxime
            aut!
          </p>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const { authToken, isAuthenticated, loading } = useAuth()
  const [leads, isloading] = useLeads(authToken)
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  if (loading) return <LoadingPage />

  console.log(leads)
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <main className="flex gap-8 p-4 pt-8 mx-auto max-w-6xl rounded-lg">
        {/* sidebar */}
        <div className="flex flex-col gap-3 w-56">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md h-14 transition-shadow hover:shadow-lg"
            onClick={() => router.push("/dashboard/add")}
          >
            Add a lead
          </button>
          <div className="shadow-lg p-4 bg-white rounded-lg">
            <p className="text-gray-400">People helped</p>
            <div className="flex items-center mt-3">
              <HeartIcon />
              <p className="ml-1 text-lg text-blue-600">64</p>
            </div>
          </div>
          <div className="shadow-lg p-4 bg-white rounded-lg">
            <p className="text-gray-400">Leads provided</p>
            <div className="flex items-center mt-3">
              <AwardIcon />
              <p className="ml-1 text-lg text-blue-600">64</p>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="w-full">
          <div className="flex gap-5 items-stretch h-14">
            {/* search-bar */}
            <div className="relative">
              <input
                type="text"
                style={{ width: "20.5rem" }}
                placeholder="search a lead using keywords"
                className="pl-4 h-full py-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="absolute right-4 top-5 transform scale-125">
                <SearchIcon />
              </div>
            </div>
            {/* btns */}
            <FilterButton text="week" />
            <FilterButton text="month" />
            <FilterButton text="2 months" />
            <FilterButton text="6 months" />
            <FilterButton text="clear filter" />
          </div>

          {/* cards */}
          {leads !== undefined ? (
            leads.map((lead) => (
              <Card
                title={lead.title}
                resourceType={lead.resource_type}
                city={lead.city}
                status={lead.status}
                message={lead.message}
                contactNo={lead.contact_no}
              />
            ))
          ) : (
            <>
              <Skeleton height="14rem" className="mt-5" />
              <Skeleton height="14rem" className="mt-5" />
              <Skeleton height="14rem" className="mt-5" />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
