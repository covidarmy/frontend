import { useRouter } from "next/router"
import * as React from "react"
import ClipboardJS from "clipboard"
import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import { fetchTweets } from "../lib/api"
import Loader from "../assets/Loader.svg"
/**
 * @type {React.NamedExoticComponent}
 */
const TweetsList = React.memo(({ city: location, resource }) => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([])
  const [shareSupported, setShareSupported] = React.useState(false)
  const [limit, setLimit] = React.useState(20)

  const showMore = async () => {
    setLoading(true)
    const newTweets = await fetchTweets({
      location,
      resource,
      limit: 20,
      offset: Math.floor(data.length),
    })
    setData((data) => data.concat(newTweets))
    setLoading(false)
  }

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.navigator?.share) {
      setShareSupported(true)
    }
    if (location && resource) {
      setLoading(true)
      fetchTweets({ location, resource }).then((data) => {
        setData(data)
        setLoading(false)
      })
    }
  }, [])

  const handleCopyOrShare = (link) => {
    if (typeof window !== "undefined" && window.navigator?.share) {
      navigator.share({
        title: "Thanks for sharing!",
        url: link,
      })
    } else {
      const clipboard = new ClipboardJS(".copy-btn", {
        text: () => {
          return link
        },
      })

      clipboard.on("success", () => clipboard.destroy())
      clipboard.on("error", () => clipboard.destroy())
    }
  }

  /**
   * Update vote in local storage
   * @param tweetId Id of tweet
   * @param flag flag for requested vote type - Upvote = +ve number
   * Downvote = -ve number
   */
  const updateVotedTweets = (tweetId, flag) => {
    let votedTweets
    try {
      votedTweets = JSON.parse(localStorage.getItem("votedTweets"))
    } catch (error) {
      console.log(error)
      votedTweets = {}
    }

    if (!votedTweets) votedTweets = {}

    votedTweets[tweetId] = flag
    localStorage.setItem("votedTweets", JSON.stringify(votedTweets))
    console.log("Updated voted tweets")
  }

  if (!(location && resource)) {
    // Return Please add location & resource
    return (
      <div className="py-4 text-xl font-bold">
        Please select city and resource
      </div>
    )
  } else if (data.length > 0) {
    // Tweets
    return (
      <>
        {data.map(({ id: tweetId, url: tweetUrl, status: voteCount }) => {
          return (
            <div
              key={tweetId}
              className="w-full flex flex-col items-center justify-center space-y-4 my-2 px-2"
            >
              <Tweet id={tweetId} />
            </div>
          )
        })}
        {loading && <Loader />}
        {data.length % 20 == 0 && (
          <button
            onClick={showMore}
            className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 rounded-md gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={data.length % 20 !== 0}
          >
            Show more
            <HiChevronDoubleDown />
          </button>
        )}
      </>
    )
  } else {
    // Error
    return (
      <div className="text-center">
        No tweets found{" "}
        {location
          ? " for " + location + (resource ? " & " + resource : "")
          : ""}
        . This might be a bug, please DM on Twitter to let me know.
        <br />
        <a
          target="_blank"
          href="https://twitter.com/covid_army"
          className="text-blue-600"
        >
          @covid_army
        </a>
      </div>
    )
  }
})

export default TweetsList
