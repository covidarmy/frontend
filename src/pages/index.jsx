import * as React from "react"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { getCities, getResources } from "~/lib/api"

const IndexPage = ({ resources, cities, lastUpdated }) => {
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
  const cities = await getCities()
  const resources = await getResources()

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
