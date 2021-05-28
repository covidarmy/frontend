import * as React from "react"
import { useRouter } from "next/router"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"
import AwardIcon from "~/assets/award.svg"
import HeartIcon from "~/assets/heart.svg"
import SearchIcon from "~/assets/Search.svg"

export default function DashboardPage() {
  //   const { isAuthenticated, loading } = useAuth()
  //   const router = useRouter()
  //   const leads = []

  //   React.useEffect(() => {
  //     if (!loading && !isAuthenticated) {
  //       router.push("/login")
  //     }
  //   }, [isAuthenticated, loading])

  //   if (loading) return <LoadingPage />
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <main className="flex gap-8 p-4 pt-8 mx-auto max-w-6xl rounded-lg">
        {/* sidebar */}
        <div className="flex flex-col gap-3 w-56">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md h-14">
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
                style={{ width: '21.2rem' }}
                placeholder="search a lead using keywords"
                className="pl-4 h-full py-3 rounded-lg shadow-md"
              />
              <div className="absolute right-4 top-5 transform scale-125">
                <SearchIcon />
              </div>
            </div>
            {/* btns */}
            <button className="px-4 py-5 bg-white text-gray-500 shadow-md rounded-lg">
              week
            </button>
            <button className="px-4 py-5 bg-white text-gray-500 shadow-md rounded-lg">
              month
            </button>
            <button className="px-4 py-5 bg-white text-gray-500 shadow-md rounded-lg">
              2 months
            </button>
            <button className="px-4 py-5 bg-white text-gray-500 shadow-md rounded-lg">
              6 months
            </button>
            <button className="px-4 py-5 bg-white text-gray-300 shadow-sm rounded-lg">
              clear filter
            </button>
          </div>

          {/* cards */}
          <div className="bg-white py-4 px-5 rounded-lg shadow-md mt-5">
            <p className="text-gray-500 text-sm">25 May 2021 • 1 lead</p>
            <hr className="my-4" />
            
          </div>
        </div>
      </main>
    </div>
  )
}
