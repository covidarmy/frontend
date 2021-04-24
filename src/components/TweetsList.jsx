import { useRouter } from "next/router"
import * as React from "react"
import ClipboardJS from "clipboard"
import { Tweet } from "react-static-tweets"
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
  const router = useRouter()
  const { slug } = router.query

  let shareApiSupported = false
  if (typeof window !== "undefined" && window.navigator?.share) {
    shareApiSupported = true
  }

  const handleCopyOrShare = (link) => {
    if (typeof window !== "undefined" && window.navigator?.share) {
      navigator.share({
        title: "Thanks for sharing!",
        url: link,
      })
    } else {
      const clipboard = new ClipboardJS(".copy-btn", {
        text: function (trigger) {
          return trigger.getAttribute("data-tweet-url")
        },
      })

      clipboard.on("success", () => clipboard.destroy())
      clipboard.on("error", () => clipboard.destroy())
    }
  }

  return data.length > 0 ? (
    data
      .sort((a, b) => {
        return -a.postedAt.localeCompare(b.postedAt)
      })
      .map(({ tweetId, tweetUrl, votes: voteCount }) => {
        return (
          <div
            key={tweetId}
            className="w-full flex flex-col items-center justify-center space-y-4 my-8 px-2"
          >
            <Tweet id={tweetId} />
            <div className="w-full sm:w-1/2 lg:w-2/5 xl:w-1/3 px-4 sm:px-0 flex justify-between">
              <div className="flex justify-between space-x-8">
                <div className="text-green-500 text-xs text-center hover:cursor-pointer">
                  <div className="flex items-center">
                    <ThumbUpIcon className="w-8 sm" />
                    <p className="text-sm">{voteCount > 0 ? voteCount : 0}</p>
                  </div>
                  <p className="text-gray-400">Working</p>
                </div>

                <div className="text-red-500 text-xs text-center hover:cursor-pointer">
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
                  data-tweet-url={tweetUrl}
                  onClick={() => handleCopyOrShare(tweetUrl)}
                >
                  {shareApiSupported ? (
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
      })
  ) : (
    <div className="text-center">
      No tweets found for {slug[0]} & {slug[1]}. This might be a bug, please DM
      on Twitter to let me know.
      <br />
      <a
        target="_blank"
        href="https://twitter.com/arn4v"
        className="text-blue-600"
      >
        @arn4v
      </a>
    </div>
  )
})

export default TweetsList
