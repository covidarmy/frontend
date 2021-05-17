import { Tweet } from "react-static-tweets"
import { HiChevronDoubleDown } from "react-icons/hi"
import { useTweets } from "~/hooks/useTweets"
import Skeleton from "react-loading-skeleton"
import { useSlug } from "~/context/slug"
import { useTranslation } from "~/context/translation"

const OlaNotice = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 my-2 px-2">
      <a
        className="p-4 rounded-lg text-center border border-gray-200 cursor-pointer"
        href="https://www.olacabs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        You can request a oxygen concentrator from your Ola app for no charge!
      </a>
    </div>
  )
}

const TweetsList = () => {
  const { location, resource } = useSlug()
  const { data, error, size, setSize } = useTweets({ location, resource })
  const { t } = useTranslation()

  const isOxygenConcentratorFromBanglore =
    location === "bangalore" && resource === "oxygenconcentrator"

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <div className="space-y-4 px-0 lg:px-12">
        <Skeleton count={4} height={340} />
      </div>
    )

  const showMore = () => {
    setSize(size + 1)
  }

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20)

  if (!location) {
    return (
      <div className="hidden lg:flex justify-center items-center border rounded-md shadow-md bg-gray-100 w-full h-52 my-2 p-3 lg:p-6">
        <p className="font-semibold text-lg text-gray-600">
          {t("SELECT_LOCATION_RESOURCE")}
        </p>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="hidden lg:flex justify-center items-center border rounded-md shadow-md bg-gray-100 w-full h-52 my-2 p-3 lg:p-6">
        <p className="font-semibold text-lg text-gray-600">
          {t("SELECT_RESOURCE")}
        </p>
      </div>
    )
  }

  if (data[0].length > 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        {isOxygenConcentratorFromBanglore ? <OlaNotice /> : ""}
        {
          // Tweets
          data.map((page) => {
            return page.map(({ _id: key, tweet_id }) => (
              <div
                key={key}
                className="w-full flex flex-col items-center justify-center space-y-4 my-2 px-2"
              >
                <Tweet id={tweet_id} />
              </div>
            ))
          })
        }
        {!isReachingEnd && (
          <button
            onClick={showMore}
            className="bg-indigo-200 text-indigo-700 flex items-center justify-center px-4 py-2 mb-2 rounded-md gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={data[0].length % 20 !== 0}
          >
            {t("SHOW_MORE")}
            <HiChevronDoubleDown />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="text-center pt-2 md:px-10">
      No tweets found{" "}
      {location ? " for " + location + (resource ? " & " + resource : "") : ""}.
      This might be a bug, please DM on Twitter to let me know.{" "}
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

export default TweetsList
