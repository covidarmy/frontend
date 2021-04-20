import * as React from "react"
import { Tweet } from "react-static-tweets"
import { useRouter } from "next/router"
import Link from "next/link"
import clsx from "clsx"
import { store } from "~/utils/firebase-admin"
import useSWR from "swr"

/**
 * @typedef {Object} Tweet
 * @property {string} id
 * @property {Record<string, boolean>} city
 * @property {Record<string, boolean>} for
 * @property {string} tweetId
 * @property {string} tweetUrl
 * @property {string} username
 */

/**
 * @typedef {Object} Props
 * @property {Tweet[]} tweets
 * @property {string[]} cities
 */

/**
 * @param {Props} props
 */
export default function Home({ tweets: initialTweets, cities: initialCities }) {
  const { data: tweets } = useSWR(
    "tweets",
    () => fetch("/api/tweets").then((res) => res.json()),
    {
      refreshInterval: 10,
      initialData: initialTweets,
    }
  )
  const { data: cities } = useSWR(
    "tweets",
    () => fetch("/api/cities").then((res) => res.json()),
    {
      refreshInterval: 10,
      initialData: initialCities,
    }
  )
  const router = useRouter()
  const [filtered, setFiltered] = React.useState(tweets)
  const [currentFilter, setCurrentFilter] = React.useState("all")

  React.useEffect(() => {
    if (router.query.city) {
      setFiltered(
        initialTweets.filter((i) =>
          Object.keys(i.city).includes(
            /** @type {string} */ (router.query.city)
          )
        )
      )
      setCurrentFilter(/** @type {string} */ (router.query.city))
    } else {
      setFiltered(initialTweets)
      setCurrentFilter("all")
    }
  }, [router.query])

  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-12 pt-12 pb-12">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-16">
          <span className="text-lg font-semibold">Filters</span>
          <div className="h-8 border-r hidden lg:block border-gray-600" />
          <span className="flex items-center justify-center space-x-6">
            <Link href="/">
              <div
                className={clsx([
                  "rounded-md px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium",
                  currentFilter === "all"
                    ? "bg-gray-600 text-white"
                    : "bg-white hover:bg-gray-300",
                ])}
              >
                All
              </div>
            </Link>
            {cities.map((i) => {
              return (
                <button
                  className={clsx([
                    "rounded-md px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium cursor-pointer focus:outline-none",
                    currentFilter === i
                      ? "bg-gray-600 text-white"
                      : "bg-white hover:bg-gray-300",
                  ])}
                  onClick={() => router.push(`/?city=${i}`)}
                >
                  {i}
                </button>
              )
            })}
          </span>
        </div>
        <div className="text-2xl font-semibold">Tweets</div>
        <div className="flex flex-col space-y-12">
          {filtered.map(({ tweetId }) => {
            return (
              <>
                <Tweet id={tweetId} />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

/**
 * @type {import("next").GetStaticProps}
 */
export const getStaticProps = async (ctx) => {
  const cities = (await store.doc("main/cities").get()).data()
  const tweetsDoc = store.doc("main/tweets")
  const tweets = (await tweetsDoc.get()).data()
  const filteredTweets = Object.entries(tweets)
    .map(([id, metadata]) => {
      return {
        id,
        ...metadata,
      }
    })
    .filter((i) => i.show)
  const citiesList = Object.keys(cities)

  return {
    props: { tweets: filteredTweets, cities: citiesList },
    revalidate: 75,
  }
}
