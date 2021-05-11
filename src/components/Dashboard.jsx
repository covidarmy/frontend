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
        {/* DISCLAIMER */}
        <div className="mt-4 lg:mt-8 text-center mb-4 md:mb-0">
          <p className="text-red-600 font-bold hover:underline">
            <a
              href="https://www.change.org/p/government-of-india-should-approve-paper-strip-rapid-antigen-tests-for-self-testing-at-home"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚨 Beware of fraud. Sign this petition to end covid. 🚨
            </a>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 overflow-hidden lg:mt-6">
          <div className="rounded-md">
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
