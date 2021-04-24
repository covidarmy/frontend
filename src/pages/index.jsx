import * as React from "react"
import { useRouter } from "next/router"
import LocationFilter from "~/components/LocationFilter"
import ResourceFilter from "~/components/ResourceFilter"

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
export default function Home({ tweets, cities, resources, cityResources }) {
  const router = useRouter()
  const [filtered, setFiltered] = React.useState(tweets)
  const [locationFilter, setLocationFilter] = React.useState("all")
  const [resourceFilter, setResourceFilter] = React.useState("all")

  React.useEffect(() => {
    let _tweets = tweets
    if (router.query.city) {
      const city = /** @type {string} */ (router.query.city)
      _tweets = _tweets.filter((i) => Object.keys(i.location).includes(city))
      setLocationFilter(/** @type {string} */ (router.query.city))
    } else {
      setLocationFilter("all")
    }

    if (typeof router.query.resource === "string") {
      /** @type {string} */
      const resource = router.query.resource
      _tweets = _tweets.filter((tweet) => {
        return tweet.for[resource] === true
      })
      setResourceFilter(/** @type {string} */ (router.query.resource))
    } else {
      setResourceFilter("all")
    }

    setFiltered(_tweets)
  }, [router.query, tweets])

  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-4 lg:space-y-8 pt-6 pb-6">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <span className="lg:text-lg mx-4 lg:mx-0 text-sm">
          Tweets are updated every 10 minutes. If you can't find your
          location/city/resource here or want to report a bug: please reach out
          on Twitter
          <a
            target="_blank"
            href="https://twitter.com/arn4v"
            className="text-blue-600"
          >
            @arn4v
          </a>
          .
        </span>
        <div className="w-full border-b lg:block border-gray-600" />
        <LocationFilter filter={locationFilter} data={cities} />
        <div className="w-full border-b lg:block border-gray-600" />
        <ResourceFilter filter={resourceFilter} data={resources} />
      </div>
    </>
  )
}

/**
 * @type {import("next").GetStaticProps<Props>}
 */
export const getStaticProps = async () => {
  let tweets, cities, resources, cityResources

  if (process.env.LOCAL_MODE === "true") {
    tweets = require("../../seeds/tweets.json")
    cities = require("../../seeds/cities.json")
    resources = require("../../seeds/resources.json")
    cityResources = require("../../seeds/city-resources.json")
  } else {
    const {
      getCities,
      getTweets,
      getResources,
      getCityResources,
    } = require("../lib/db.js")
    tweets = await getTweets()
    cities = await getCities()
    resources = await getResources()
    cityResources = await getCityResources()
  }

  return {
    props: {
      tweets: Object.entries(tweets)
        .map(([_, data]) => {
          return data
        })
        .filter((tweet) => tweet.show),
      cities: Object.keys(cities),
      resources,
      cityResources,
    },
    revalidate: 300,
  }
}
