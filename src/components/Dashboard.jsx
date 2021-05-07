import * as React from "react"

// COMPONENTS
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"
import Footer from "./Footer"

export const Dashboard = () => {
  return (
    <div className="flex flex-col justify-between h-screen min-h-screen">
      <div>
        <div className="mt-4 lg:mt-8 text-center mb-4 md:mb-0">
          <p className="text-red-500 font-bold">
            🚨 Please beware of fraudsters 🚨
          </p>
        </div>
        <div className="lg:flex hidden flex-col justify-center px-4 overflow-hidden lg:flex-row lg:mt-6">
          <div className="rounded-md flex flex-col lg:w-6/12">
            <LocationFilter />
            <ResourceFilter />
          </div>
          <div className="h-auto overflow-y-auto flex flex-col items-center lg:w-6/12 pb-4">
            <TweetsList />
          </div>
        </div>
        <div className="flex-col justify-center px-4 space-y-6 lg:flex-row lg:mt-6 flex lg:hidden pb-6">
          <div className="rounded-md flex flex-col lg:w-6/12">
            <LocationFilter />
            <ResourceFilter />
          </div>
          <TweetsList />
        </div>
      </div>
      <Footer />
    </div>
  )
}
