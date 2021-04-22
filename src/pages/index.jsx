import * as React from "react"
import { Tweet } from "react-static-tweets"
import { useRouter } from "next/router"
import clsx from "clsx"
import { HiArrowDown, HiArrowUp, HiChevronDoubleDown } from "react-icons/hi"
import useSWR, { mutate } from "swr"
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

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (url === "/api/tweets") {
        return data.map((item) => {
          item.postedAt = new Date(item.postedAt._seconds * 1000).toISOString()
          item.createdAt = new Date(
            item.createdAt._seconds * 1000
          ).toISOString()
          return item
        })
      }
      return data
    })

/**
 * @param {Props} props
 */
export default function Home({
  tweets: initialTweets,
  cities,
  resources,
  cityResources: initialCityResources,
}) {
  const router = useRouter()
  const { data: tweets } = useSWR("/api/tweets", fetcher, {
    refreshInterval: 120,
    initialData: initialTweets,
    revalidateOnFocus: false,
  })
  const { data: cityResources } = useSWR("/api/city-resources", fetcher, {
    refreshInterval: 120,
    initialData: initialCityResources,
    revalidateOnFocus: false,
  })
  const [filtered, setFiltered] = React.useState(initialTweets)
  const [locationFilter, setLocationFilter] = React.useState("all")
  const [resourceFilter, setResourceFilter] = React.useState("all")
  const [limit, setLimit] = React.useState(20)

  React.useEffect(() => {
    mutate("/api/tweets")
    mutate("/api/city-resources")
  }, [])

  React.useEffect(() => {
    console.log(cityResources)
  }, [cityResources])

  React.useEffect(() => {
    let _tweets = tweets
    if (router.query.city) {
      const city = /** @type {string} */ (router.query.city)
      mutate("/api/tweets")
      _tweets = _tweets.filter((i) => Object.keys(i.location).includes(city))
      setLocationFilter(/** @type {string} */ (router.query.city))
    } else {
      setLocationFilter("all")
    }
    if (router.query.resource) {
      mutate("/api/city-resources")
    } else {
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

    if (_tweets !== tweets) {
      setFiltered(_tweets)
    }
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
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-8 pt-6 pb-6">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <span className="lg:text-lg mx-4 lg:mx-0">
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
        <div className="text-2xl font-semibold">Additional Resources</div>
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
        </dl>
        <div className="w-full border-b lg:block border-gray-600" />
        <div className="text-2xl font-semibold">Tweets</div>
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
  const {
    getCities,
    getTweets,
    getResources,
    getCityResources,
  } = require("../lib/db")
  const tweets = await getTweets()
  const cities = await getCities()
  const resources = await getResources()
  const cityResources = await getCityResources()

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
