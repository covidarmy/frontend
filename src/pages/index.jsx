import * as React from "react"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = ({ tweets, resources, cities, lastUpdated }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar lastUpdated={lastUpdated} />
      <Dashboard
        data={{
          resources,
          cities,
          city: null,
          resource: null,
        }}
      />
    </div>
  )
}

/**
 * @type {import("next").GetStaticProps<{}, {}>}
 */
export const getStaticProps = async () => {
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))

  return {
    props: {
      resources,
      cities,
      lastUpdated: Date.now(),
    },
    revalidate: 300,
  }
}

export default IndexPage
