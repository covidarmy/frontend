const CityPage = ({ tweets, resources, cities }) => {
  return <></>
}

/**
 * @type {import("next").GetStaticProps<{}, { slug: Array<string> }>}
 */
export const getStaticProps = async (ctx) => {
  const tweets = require("seeds/tweets.json")
  const resources = require("seeds/resources.json")
  const cities = require("seeds/cities.json")
  const { slug } = ctx.params
  let filtered = []

  // /city route
  if (slug.length === 1) {
    filtered = Object.values(tweets).filter(
      (tweet) => typeof tweet.location[slug[0]] !== "undefined"
    )
  }

  // Nested /city/resource route
  if (slug.length === 2) {
    filtered = Object.values(tweets).filter(
      (tweet) =>
        typeof tweet.for[slug[1]] !== "undefined" &&
        typeof tweet.location[slug[0]] !== "undefined"
    )
  }

  return {
    props: {
      tweets: filtered,
      resources,
      cities,
    },
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
