import Footer from './Footer'
import Skeleton from 'react-loading-skeleton'
import { HiChevronDoubleDown } from 'react-icons/hi'
import { useTweets } from '~/hooks/useTweets'
import { useSlug } from '~/context/slug'
import { useTranslation } from '~/context/translation'
import { isMobile, isTablet } from 'react-device-detect'
import { Tweet } from 'react-static-tweets'

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
  const { t } = useTranslation()
  const { location, resource } = useSlug()
  const { data, error, size, setSize } = useTweets({ location, resource })

  const isOxygenConcentratorFromBanglore =
    location === 'bangalore' && resource === 'oxygenconcentrator'

  if (error && !data) return <div>failed to load</div>

  const showMore = () => {
    setSize(size + 1)
  }

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20)

  if (!location) {
    return (
      <div className="hidden lg:flex justify-center items-center border rounded-md shadow-md bg-gray-100 w-full h-52 my-2 p-3 lg:p-6">
        <p className="font-semibold text-lg text-gray-600">
          {t('SELECT_LOCATION_RESOURCE')}
        </p>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="hidden lg:flex justify-center items-center border rounded-md shadow-md bg-gray-100 w-full h-52 my-2 p-3 lg:p-6">
        <p className="font-semibold text-lg text-gray-600">
          {t('SELECT_RESOURCE')}
        </p>
      </div>
    )
  }

  if (!data)
    return (
      <div className="space-y-4 px-0 lg:px-12">
        <Skeleton count={4} height={340} />
      </div>
    )

  console.log(data)

  if (data[0].length > 0) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center">
          {isOxygenConcentratorFromBanglore ? <OlaNotice /> : ''}
          {
            // Tweets
            data.map((page) => {
              return page.map((tweet) => {                
                return (
                  <div
                    key={tweet._id}
                    className="flex flex-col items-center w-full"
                  >
                    <Tweet id={tweet.tweet_id} ast={JSON.parse(tweet.tweetAst)} />
                  </div>
                )
              })
            })
          }
          {!isReachingEnd && (
            <button
              onClick={showMore}
              style={{ maxWidth: '550px' }}
              className="bg-indigo-200 text-indigo-700 w-full flex items-center justify-center p-2 mt-2 mb-4 rounded-lg gap-1 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={data[0].length % 20 !== 0}
            >
              Load more
              <HiChevronDoubleDown className="mt-0.5" />
            </button>
          )}
        </div>
        {(isMobile || isTablet) && <Footer />}
      </div>
    )
  }

  return (
    // <div className="text-center pt-2 md:px-10">
    //   {/* Sorry, we don't have any data{" "}
    //   {location ? " for " + location + (resource ? " & " + resource : "") : ""}. */}
    // </div>

    <div className="flex justify-center items-center border rounded-md shadow-md bg-gray-100 w-full h-52 my-2 p-3 lg:p-6">
      <p className="font-semibold text-sm md:text-lg text-gray-600 text-center">
        Sorry, we don't have any data for {location} & {resource}.
      </p>
    </div>
  )
}

export default TweetsList
