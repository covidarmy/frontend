import * as React from "react"
import { Tweet } from "react-static-tweets"
import { useRouter } from "next/router"
import Link from "next/link"
import clsx from "clsx"
import useSWR from "swr"
import { getTweets } from "~/lib/scrape"
import { isProduction } from "~/constants"
import { store } from "~/lib/firebase-admin"
import {
  HiArrowDown,
  HiArrowUp,
  HiOutlineInformationCircle,
} from "react-icons/hi"
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
  const { data: tweets, mutate } = useSWR(
    "tweets",
    () => fetch("/api/tweets").then((res) => res.json()),
    {
      refreshInterval: 10,
      initialData: initialTweets,
    }
  )
  const { data: cities } = useSWR(
    "cities",
    () => fetch("/api/cities").then((res) => res.json()),
    {
      refreshInterval: 10,
      initialData: initialCities,
    }
  )
  const router = useRouter()
  const [filtered, setFiltered] = React.useState(initialTweets)
  const [currentFilter, setCurrentFilter] = React.useState("all")
  const [votes, setVotes] = React.useState({})

  React.useEffect(() => {
    const savedVotes = localStorage.getItem("votes")
    if (!savedVotes) {
      localStorage.setItem("votes", JSON.stringify({}))
      setVotes({})
    }
  }, [])

  React.useEffect(() => {
    if (router.query.city) {
      setFiltered(
        tweets.filter((i) =>
          Object.keys(i.city).includes(
            /** @type {string} */ (router.query.city)
          )
        )
      )
      setCurrentFilter(/** @type {string} */ (router.query.city))
    } else {
      setFiltered(tweets)
      setCurrentFilter("all")
    }
  }, [router.query])

  const vote = (tweetId, vote = true) => () => {
    const savedVotes = localStorage.getItem("votes")
    localStorage.setItem(
      "votes",
      JSON.stringify({
        ...JSON.parse(savedVotes ?? "{}"),
        [tweetId]: vote,
      })
    )
    console.log(localStorage.getItem("votes"))
    setVotes(JSON.parse(localStorage.getItem("votes")))
    fetch(vote ? "/api/upvote" : "/api/downvote", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweetId,
      }),
    })
      .then(() => {
        mutate()
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-12 pt-12 pb-12">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <div className="px-2 py-4 bg-indigo-200 text-indigo-600 flex items-center justify-center gap-2 rounded-md w-4/5 lg:w-2/6">
          <HiOutlineInformationCircle className="h-8 w-8" />
          <span>
            To request a city or report a bug/glitch reach out on Twitter
            @arn4v.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-16">
          <span className="text-lg font-semibold">Filters</span>
          <div className="h-8 border-r hidden lg:block border-gray-600" />
          <span className="flex items-center justify-center gap-6 flex-wrap w-5/6 lg:w-2/5">
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
            {cities.sort().map((i) => {
              return (
                <Link key={i} href={`/?city=${i}`}>
                  <div
                    className={clsx([
                      "rounded-md px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium cursor-pointer focus:outline-none",
                      currentFilter === i
                        ? "bg-gray-600 text-white"
                        : "bg-white hover:bg-gray-300",
                    ])}
                  >
                    {i}
                  </div>
                </Link>
              )
            })}
          </span>
        </div>
        <div className="text-2xl font-semibold">Tweets</div>
        <div className="px-2 py-4 bg-indigo-200 text-indigo-600 flex items-center justify-center gap-2 rounded-md w-4/5 lg:w-2/6">
          <HiOutlineInformationCircle className="h-8 w-8" />
          <span>Tweets are updated every 10 minutes.</span>
        </div>
        <div className="flex flex-col space-y-12 w-5/6">
          {React.useMemo(
            () =>
              filtered.map(({ tweetId, votes: count }) => {
                return (
                  <div
                    key={tweetId}
                    className="w-full flex flex-col items-center justify-center space-y-4"
                  >
                    <Tweet id={tweetId} />
                    <div className="flex w-full items-center justify-center h-12 gap-4 lg:w-1/3">
                      <div className="text-lg px-4 flex items-center justify-center">
                        <span>{count}</span>
                      </div>
                      <div className="flex w-full items-center justify-center flex-grow gap-2">
                        <button
                          className={clsx([
                            "flex items-center w-full justify-center border-green-500 h-12 border rounded-md gap-2 focus:outline-none",
                            votes[tweetId] === true && "bg-green-500",
                          ])}
                          disabled={typeof votes[tweetId] !== "undefined"}
                          onClick={vote(tweetId, true)}
                        >
                          <HiArrowUp className="h-5 w-5" />
                        </button>
                        <button
                          className={clsx([
                            "flex w-full items-center justify-center border-red-500 h-12 border rounded-md gap-2 focus:outline-none",
                            votes[tweetId] === false && "bg-red-400",
                          ])}
                          disabled={typeof votes[tweetId] === "undefined"}
                          onClick={vote(tweetId, false)}
                        >
                          <HiArrowDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }),
            [filtered]
          )}
        </div>
      </div>
    </>
  )
}

/**
 * @type {import("next").GetStaticProps}
 */
export const getStaticProps = async (ctx) => {
  if (isProduction) {
    var { cities, tweets } = await getTweets()
  } else {
    var tweets = (await store.doc("main/tweets").get()).data()
    var cities = (await store.doc("main/cities").get()).data()
  }

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
    revalidate: 600,
  }
}
