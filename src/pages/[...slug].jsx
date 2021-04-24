const CityPage = ({ tweets, resources, cities }) => {
  return <></>
}

/**
 * @type {import("next").GetStaticProps<{}, { slug: Array<string> }>}
 */
export const getStaticProps = async (ctx) => {
  const CityModel = require("../schemas/city")
  const ResourceModel = require("../schemas/resource")
  const TweetModel = require("../schemas/tweet")
  const scrape = require("../lib/scrape")
  const cities = await CityModel.find({})
  const resources = await ResourceModel.find({})
  const { slug } = ctx.params
  /** @type {Object[]} */
  let tweets = await TweetModel.find({})

  await scrape({})

  // /city route
  if (slug.length === 1) {
    tweets = Object.values(tweets).filter((tweet) => {
      return typeof tweet.location[slug[0]] !== "undefined"
    })
  }

  // Nested /city/resource route
  if (slug.length === 2) {
    tweets = Object.values(tweets).filter((tweet) => {
      return (
        typeof tweet.for[slug[1]] !== "undefined" &&
        typeof tweet.location[slug[0]] !== "undefined"
      )
    })
  }

  return {
    props: {
      tweets,
      resources,
      cities,
    },
    revalidate: 300,
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async (ctx) => {
  const resources = require("seeds/resources.json")
  const cities = require("seeds/cities.json")
  const paths = []

  Object.keys(cities).forEach((/** @type {string} */ item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  Object.keys(cities).forEach((/** @type {string} */ city) => {
    Object.keys(resources).map((resource) => {
      paths.push({
        params: {
          slug: [city.trim().toLowerCase(), resource.trim().toLowerCase()],
        },
      })
    })
  })

  return {
    paths,
    fallback: true,
  }
}

export default CityPage
