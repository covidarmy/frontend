import * as React from "react"
import { useRouter } from "next/router"
import LocationFilter from "~/components/LocationFilter"
import ResourceFilter from "~/components/ResourceFilter"
import Navbar from "~/components/Navbar"
import { Dashboard } from "~/components/Dashboard"

/**
 * @typedef {Object} Props
 * @property {any} tweets
 * @property {string[]} cities
 * @property {import("~/types").Resources} resources
 * @property {import("~/types").CityResources} cityResources
 */

/**
 * @param {Props} props
 */
export default function Home({ cities, tweets, resources }) {
  return (
    <div className="container">
      <Navbar />
      <Dashboard />
      {/* <div className="w-screen min-h-screen overflow-hidden flex flex-col  justify-start space-y-4 lg:space-y-8 pb-6">
        <div className="w-full border-b lg:block border-gray-600" />
        <LocationFilter filter={locationFilter} data={cities} />
        <div className="w-full border-b lg:block border-gray-600" />
        <ResourceFilter filter={resourceFilter} data={resources} /> 
       </div> */}
    </div>
  )
}

export const getStaticProps = async () => {
  const { getAllTweets } = require("../lib/db")
  const { scrape } = require("../lib/scrape")
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))

  if (process.env.NODE_ENV === "production") await scrape({})
  const tweets = await getAllTweets()

  return {
    props: {
      tweets,
      cities,
      resources,
    },
    revalidate: 120,
  }
}
