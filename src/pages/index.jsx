import * as React from "react"
import { Tweet } from "react-static-tweets"
import { useRouter } from "next/router"
import { HiChevronDoubleDown, HiChevronDown, HiChevronUp } from "react-icons/hi"
import LocationFilter from "~/components/LocationFilter"
import ResourceFilter from "~/components/ResourceFilter"
import AdditionaResourceItem from "~/components/AdditionalResourceItem"

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
  const [limit, setLimit] = React.useState(20)
  const [showAdditional, setShowAdditional] = React.useState(false)

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

  const showMore = () => {
    if (limit + 20 < filtered.length) {
      setLimit((prev) => prev + 20)
    } else if (limit + 20 > filtered.length && limit < filtered.length) {
      setLimit((prev) => prev + (filtered.length - prev))
    }
  }

  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-4 lg:space-y-8 pt-6 pb-6">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <span className="lg:text-lg mx-4 lg:mx-0 text-sm">
          Tweets are updated every 10 minutes. If you can't find your
          location/city/resource here or want to report a bug: please reach out
          on Twitter{" "}
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
        <div className="w-full border-b lg:block border-gray-600" />
        <div className="text-lg font-semibold">Additional Resources</div>
        {showAdditional && (
          <dl className="border border-b-0 overflow-hidden border-gray-400 rounded-md">
            {Object.entries(cityResources.common)
              .sort()
              .map(([title, link]) => {
                return (
                  <AdditionaResourceItem title={title} key={`${title}-${link}`}>
                    <a
                      target="_blank"
                      href={link}
                      className="text-blue-600 hover:underline"
                    >
                      {link}
                    </a>
                  </AdditionaResourceItem>
                )
              })}
            {cityResources[locationFilter] &&
              Object.entries(cityResources[locationFilter])
                .sort()
                .map(([title, link]) => {
                  return (
                    <AdditionaResourceItem
                      title={title}
                      key={`${title}-${link}`}
                    >
                      <a
                        target="_blank"
                        href={link}
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </AdditionaResourceItem>
                  )
                })}
          </dl>
        )}
        <button
          onClick={() => setShowAdditional((prev) => !prev)}
          className="text-indigo-600 bg-indigo-200 px-0.5 py-0.5 lg:px-2 lg:py-2 flex items-center justify-center rounded-md focus:outline-none transition duration-75 ease-in gap-2"
        >
          {!showAdditional ? (
            <>
              <HiChevronDown className="h-6 w-6" />
              <span>Show additional resources</span>
            </>
          ) : (
            <>
              <HiChevronUp className="h-6 w-6" />
              <span>Hide additional resources</span>
            </>
          )}
        </button>
        <div className="w-full border-b lg:block border-gray-600" />
        <div id="tweets" className="text-xl font-semibold">
          Tweets
        </div>
        <div className="flex flex-col space-y-12 w-5/6">
          {React.useMemo(
            () =>
              filtered.length > 0 ? (
                filtered
                  .sort((a, b) => {
                    return -a.postedAt.localeCompare(b.postedAt)
                  })
                  .slice(0, limit + 1)
                  .map(({ tweetId, votes: voteCount }) => {
                    return (
                      <div
                        key={tweetId}
                        className="w-full flex flex-col items-center justify-center space-y-4"
                      >
                        <Tweet id={tweetId} />
                      </div>
                    )
                  })
              ) : (
                <div className="text-center">
                  No tweets found for {locationFilter} & {resourceFilter}. This
                  might be a bug, please DM on Twitter to let me know.
                  <br />
                  <a
                    target="_blank"
                    href="https://twitter.com/arn4v"
                    className="text-blue-600"
                  >
                    @arn4v
                  </a>
                </div>
              ),
            [filtered, limit]
          )}
        </div>
        {limit + 20 < filtered.length && (
          <button
            onClick={showMore}
            className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 rounded-md gap-2 shadow-md"
            disabled={limit + 20 > filtered.length}
          >
            <HiChevronDoubleDown />
            Show more
          </button>
        )}
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
