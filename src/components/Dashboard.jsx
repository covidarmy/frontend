import * as React from "react"
import WhatsappLogo from "../assets/whatsapp.svg"
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"
import Footer from "./Footer"

export const Dashboard = () => {
  return (
    <>
      <main className="flex flex-col lg:overflow-hidden min-h-screen">
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
      </main>
      <Footer />
      <div className="shadow-2xl rounded-full p-2 bg-green-600 fixed bottom-6 right-6 w-12 cursor-pointer">
        <a
          href="https://wa.me/917404255034?text=Hi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Whatsapp Bot"
        >
          <WhatsappLogo />
        </a>
      </div>
    </>
  )
}
