import { useRouter } from "next/router"
import * as React from "react"
import { Tweet } from "react-static-tweets"

/**
 * @type {React.NamedExoticComponent}
 */
const TweetsList = React.memo(({ data }) => {
  const router = useRouter()
  const { slug } = router.query

  return data.length > 0 ? (
    data
      .sort((a, b) => {
        return -a.postedAt.localeCompare(b.postedAt)
      })
      .map(({ id: tweetId, status: voteCount }) => {
        return (
          <div
            key={tweetId}
            className="w-full flex flex-col items-center justify-center space-y-4 my-2"
          >
            <Tweet id={tweetId} />
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
