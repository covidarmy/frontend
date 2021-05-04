import { useState, useEffect } from "react"
import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import { useTweets } from "~/lib/api"
import { v4 as uuidv4 } from "uuid"
import Skeleton from "react-loading-skeleton"

const TweetsList = ({ city: location, resource }) => {
  const { data, error } = useTweets({ location, resource })
  const [tweets, setTweets] = useState(data)

  useEffect(() => {
    setTweets(data)
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <Skeleton count={40} />

  const showMore = () => {
    const newTweets = useTweets({
      location,
      resource,
      limit: 20,
      offset: Math.floor(tweets.length),
    })
    setTweets((tweets) => tweets.concat(newTweets))
  }

  if (!(tweets && location && resource)) {
    // Return Please add location & resource
    return (
      <div className="py-4 text-xl font-bold">
        Please select city and resource
      </div>
    )
  } else if (tweets.length > 0) {
    // Tweets
    return (
      <>
        {tweets.map(({ id: tweetId, url: tweetUrl, status: voteCount }) => {
          return (
            <div
              key={uuidv4()}
              className="w-full flex flex-col items-center justify-center space-y-4 my-2 px-2"
            >
              <Tweet id={tweetId} />
            </div>
          )
        })}
        {tweets.length % 20 == 0 && (
          <button
            onClick={showMore}
            className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 rounded-md gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={tweets.length % 20 !== 0}
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
}

export default TweetsList
