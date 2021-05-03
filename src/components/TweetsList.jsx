import * as React from "react"
import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import { fetchTweets } from "~/lib/api"

/**
 * @type {React.NamedExoticComponent}
 */
const TweetsList = React.memo(
  ({ city: location, resource, data: initialData }) => {
    const [data, setData] = React.useState(initialData)

    const showMore = async () => {
      const newTweets = await fetchTweets({
        location,
        resource,
        limit: 20,
        offset: Math.floor(data.length),
      })
      setData((data) => data.concat(newTweets))
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
  }
)

export default TweetsList
