import * as React from "react"
import { Tweet } from "react-static-tweets"
import { useRouter } from "next/router"
import Link from "next/link"
import clsx from "clsx"
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronDoubleDown,
  HiOutlineInformationCircle,
} from "react-icons/hi"
import useSWR from "swr"

/**
 * @typedef {Object} Props
 * @property {any} tweets
 * @property {string[]} cities
 */

const tweetsFetcher = (url) =>
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
export default function Home({ tweets: initialTweets, cities }) {
  const router = useRouter()
  const { data: tweets, mutate } = useSWR("/api/tweets", tweetsFetcher, {
    refreshInterval: 60,
    initialData: initialTweets,
  })
  const [filtered, setFiltered] = React.useState(initialTweets)
  const [currentFilter, setCurrentFilter] = React.useState("all")
  const [votes, setVotes] = React.useState({})
  const [limit, setLimit] = React.useState(20)

  React.useEffect(() => {
    const savedVotes = localStorage.getItem("votes")
    if (!savedVotes) {
      localStorage.setItem("votes", JSON.stringify({}))
      setVotes({})
    } else {
      setVotes(JSON.parse(savedVotes))
    }
  }, [])

  React.useEffect(() => {
    if (router.query.city) {
      setFiltered(
        tweets
          .filter((i) =>
            Object.keys(i.location).includes(
              /** @type {string} */ (router.query.city)
            )
          )
          .sort((a, b) => {
            return -a.postedAt.localeCompare(b.postedAt)
          })
      )
      setCurrentFilter(/** @type {string} */ (router.query.city))
    } else {
      setFiltered(tweets)
      setCurrentFilter("all")
    }
  }, [router.query, tweets])

  const showMore = () => {
    if (limit + 20 < filtered.length) {
      setLimit((prev) => prev + 20)
    } else if (limit + 20 > filtered.length && limit < filtered.length) {
      setLimit((prev) => prev + (filtered.length - prev))
    }
  }

  /**
   * @param {string} tweetId
   * @param {boolean} vote
   */
  const vote = (tweetId, vote = true) => () => {
    let savedVotes = localStorage.getItem("votes")
    savedVotes = JSON.parse(savedVotes)

    if (vote && votes[tweetId] === true) {
      delete savedVotes[tweetId]
      vote = false
    } else if (!vote && votes[tweetId] === false) {
      delete savedVotes[tweetId]
      vote = true
    } else {
      savedVotes[tweetId] = vote
    }

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

    localStorage.setItem(
      "votes",
      JSON.stringify(typeof savedVotes === "object" ? savedVotes : {})
    )
    setVotes(JSON.parse(localStorage.getItem("votes")))
    mutate()
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
            {cities.sort().map((city) => {
              return (
                <Link key={city} href={`/?city=${city}`}>
                  <div
                    className={clsx([
                      "rounded-md px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium cursor-pointer focus:outline-none",
                      currentFilter === city
                        ? "bg-gray-600 text-white"
                        : "bg-white hover:bg-gray-300",
                    ])}
                  >
                    {city}
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
              filtered
                .slice(0, limit + 1)
                .map(({ tweetId, votes: voteCount }) => {
                  return (
                    <div
                      key={tweetId}
                      className="w-full flex flex-col items-center justify-center space-y-4"
                    >
                      <Tweet id={tweetId} />
                      <div className="flex w-full items-center justify-center h-12 gap-4 lg:w-1/3">
                        <div className="text-lg px-4 flex items-center justify-center">
                          <span>
                            {typeof votes[tweetId] === "undefined"
                              ? voteCount
                              : votes[tweetId] === true
                              ? voteCount + 1
                              : votes[tweetId] === false
                              ? voteCount - 1
                              : voteCount}
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-center flex-grow gap-2">
                          <button
                            className={clsx([
                              "flex items-center w-full justify-center border-green-500 h-12 border rounded-md gap-2 focus:outline-none",
                              typeof votes[tweetId] === "boolean" &&
                                votes[tweetId] === true &&
                                "bg-green-500",
                            ])}
                            onClick={vote(tweetId, false)}
                          >
                            <HiArrowUp className="h-5 w-5" />
                          </button>
                          <button
                            className={clsx([
                              "flex w-full items-center justify-center border-red-500 h-12 border rounded-md gap-2 focus:outline-none",
                              votes[tweetId] === false && "bg-red-400",
                            ])}
                            onClick={vote(tweetId, true)}
                          >
                            <HiArrowDown className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                }),
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
  const { getCities, getTweets } = require("../lib/db")
  const tweets = await getTweets()
  const cities = await getCities()

  return {
    props: {
      tweets: Object.entries(tweets)
        .map(([_, data]) => {
          return data
        })
        .filter((tweet) => tweet.show),
      cities: Object.keys(cities),
    },
    revalidate: 300,
  }
}
