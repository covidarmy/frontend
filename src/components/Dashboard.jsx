import * as React from "react"

import WhatsappLogo from "../assets/whatsapp.svg"

// COMPONENTS
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"
import Footer from "./Footer"

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col lg:overflow-hidden min-h-screen">
        <div className="flex flex-col justify-center px-4 overflow-hidden lg:flex-row lg:mt-6 h-full">
          <div className="rounded-md flex flex-col lg:w-1/2">
            <LocationFilter />
            <ResourceFilter />
          </div>
          <div className="h-auto mx-8 flex-col items-center lg:w-1/2 hidden lg:flex">
            <TweetsList />
          </div>
          <div className="block lg:hidden">
            <TweetsList />
          </div>
        </div>
      </div>
      <Footer />
      <div className="fixed bottom-6 right-6 w-10">
        <a
          href="http://wa.me/917404255034"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo />
        </a>
      </div>
    </>
  )
}
