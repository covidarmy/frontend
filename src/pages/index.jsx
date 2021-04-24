import * as React from "react"

export default function Home({ cities }) {
  return (
    <>
      <div className="w-screen min-h-screen overflow-hidden flex flex-col items-center justify-start space-y-4 lg:space-y-8 pt-6 pb-6">
        <h1 className="text-2xl font-bold text-center">
          Covid India Twitter Resources
        </h1>
        <span className="lg:text-lg mx-4 lg:mx-0 text-sm">
          Tweets are updated every 10 minutes. If you can't find your
          location/city/resource here or want to report a bug: please reach out
          on Twitter
          <a
            target="_blank"
            href="https://twitter.com/arn4v"
            className="text-blue-600"
          >
            @arn4v
          </a>
          .
        </span>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { getAllTweets } = require("../lib/db")
  const { scrape } = require("../lib/scrape")
  const cities = Object.keys(require("seeds/cities.json"))

  await scrape({})
  const tweets = await getAllTweets()

  return {
    props: {
      tweets,
      cities,
    },
    revalidate: 120,
  }
}
