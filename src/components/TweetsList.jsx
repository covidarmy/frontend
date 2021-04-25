import { useRouter } from "next/router"
import * as React from "react"
import ClipboardJS from "clipboard"
import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import {
  ThumbUpIcon,
  ThumbDownIcon,
  DuplicateIcon,
  ShareIcon,
} from "@heroicons/react/outline"

/**
 * @type {React.NamedExoticComponent}
 */
const TweetsList = React.memo(({ data }) => {
  const [shareSupported, setShareSupported] = React.useState(false)
  const router = useRouter()
  const { slug } = router.query
  const [limit, setLimit] = React.useState(20)

  const showMore = () => {
    if (limit + 20 < data.length) {
      setLimit((prev) => prev + 20)
    } else if (limit + 20 > data.length && limit < data.length) {
      setLimit((prev) => prev + (data.length - prev))
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.navigator?.share) {
      setShareSupported(true)
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

  /**
   * Check if vote should be allowed
   * @param tweetId Id of tweet
   * @param flag flag for requested vote type - Upvote = +ve number
   * Downvote = -ve number
   */
  const checkVoteAllowed = (tweetId, flag) => {
    let allowVote = false

    try {
      const votedTweets = JSON.parse(localStorage.getItem("votedTweets"))

      // No votes  were stored previously
      if (!votedTweets) {
        allowVote = true
      } else {
        // Allow vote only if requested vote type (upvote/downvote)
        // is opposite of stored one
        const prevFlag = votedTweets[tweetId]
        allowVote = flag !== prevFlag
      }
    } catch (error) {
      allowVote = true
    }

    return allowVote
  }

  const handleVote = (id, flag) => {
    const allowVote = checkVoteAllowed(id, flag)
    if (!allowVote) {
      return
    }

    const config = {
      method: "post",
      body: JSON.stringify({ id }),
    }

    if (flag < 0) {
      fetch("/api/downvote", config)
        .then((res) => {
          if (!res.ok) throw Error(res.statusText)
          return res.json()
        })
        .then((data) => console.log({ data }))
        .catch((err) => console.log(err))
        .finally(() => {
          updateVotedTweets(id, flag)
        })
    } else {
      fetch("/api/upvote", config)
        .then((res) => {
          if (!res.ok) throw Error(res.statusText)
          return res.json()
        })
        .then((data) => console.log({ data }))
        .catch((err) => console.log(err))
        .finally(() => {
          updateVotedTweets(id, flag)
        })
    }
  }

  return data.length > 0 ? (
    <>
      {data
        .sort((a, b) => {
          return -a.postedAt.localeCompare(b.postedAt)
        })
        .slice(0, limit + 1)
        .map(({ id: tweetId, url: tweetUrl, status: voteCount }) => {
          return (
            <div
              key={tweetId}
              className="w-full flex flex-col items-center justify-center space-y-4 my-8 px-2"
            >
              <Tweet id={tweetId} />
              <div className="w-full sm:w-1/2 lg:w-2/5 xl:w-1/3 px-4 sm:px-0 flex justify-between">
                <div className="flex justify-between space-x-8">
                  <div
                    className="text-green-500 text-xs text-center hover:cursor-pointer"
                    onClick={() => handleVote(tweetId, 1)}
                  >
                    <div className="flex items-center">
                      <ThumbUpIcon className="w-8 sm" />
                      <p className="text-sm">{voteCount > 0 ? voteCount : 0}</p>
                    </div>
                    <p className="text-gray-400">Working</p>
                  </div>

                  <div
                    className="text-red-500 text-xs text-center hover:cursor-pointer"
                    onClick={() => handleVote(tweetId, -1)}
                  >
                    <div className="flex items-center">
                      <ThumbDownIcon className="w-8" />
                      <p className="text-sm">{voteCount < 0 ? voteCount : 0}</p>
                    </div>
                    <p className="text-gray-400">Not Working</p>
                  </div>
                </div>
                <div>
                  <div
                    className="text-gray-500 text-xs text-center hover:cursor-pointer copy-btn"
                    onClick={() => handleCopyOrShare(tweetUrl)}
                  >
                    {shareSupported ? (
                      <>
                        <ShareIcon className="w-8" />
                        <p className="text-gray-400 text-xs">Share</p>
                      </>
                    ) : (
                      <>
                        <DuplicateIcon className="w-8" />
                        <p className="text-gray-400 text-xs">Copy Link</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <hr className="w-1/6 h-0.5 border-none bg-gray-300" />
            </div>
          )
        })}
      {limit + 20 < data.length && (
        <button
          onClick={showMore}
          className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 rounded-md gap-2 shadow-md"
          disabled={limit + 20 > data.length}
        >
          <HiChevronDoubleDown />
          Show more
        </button>
      )}
    </>
  ) : (
    <div className="text-center">
      No tweets found for {slug[0]} & {slug[1]}. This might be a bug, please DM
      on Twitter to let me know.
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
})

export default TweetsList
