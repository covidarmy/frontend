import * as React from "react"

// COMPONENTS
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"
import Footer from "./Footer"

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-between lg:overflow-hidden h-auto lg:mt-6">
        <div className="mt-4 text-center mb-4 md:mb-0">
          <p className="text-xs md:text-sm text-red-600 font-bold">
            🚨 Beware of fraud. Sign{" "}
            <a
              href="https://www.change.org/p/government-of-india-should-approve-paper-strip-rapid-antigen-tests-for-self-testing-at-home"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              this
            </a>{" "}
            petition to end covid. 🚨
          </p>
        </div>
        <div className="flex flex-col justify-center px-4 overflow-hidden lg:flex-row lg:mt-6 h-full">
          <div className="rounded-md flex flex-col lg:w-1/2">
            <LocationFilter />
            <ResourceFilter />
          </div>
          <div className="h-auto overflow-y-auto flex-col items-center lg:w-1/2 hidden lg:flex">
            <TweetsList />
          </div>
          <div className="block lg:hidden">
            <TweetsList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
