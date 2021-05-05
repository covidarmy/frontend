import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { camelize } from "~/lib/utils"
import { API_BASE_URL, fetchTweets, getCities, getResources } from "~/lib/api"

const CityPage = ({
  tweets,
  resources,
  cities,
  city,
  resource,
  lastUpdated,
}) => {
  const router = useRouter()
  const { slug } = router.query
  const title = Array.isArray(slug)
    ? slug
        .map((i) => {
          return i[0].toUpperCase() + i.slice(1)
        })
        .join(" - ")
    : ""

  return (
    <>
      <NextSeo
        title={`Covid.army${title !== "" ? ` - ${title}` : ""}`}
        openGraph={{
          title: `Covid.army${title !== "" ? ` - ${title}` : ""}`,
          description: `Covid Resources Leads${
            title !== "" ? ` For ${title}` : ""
          }`,
          images: [
            {
              url: "/static/og.png",
            },
          ],
        }}
      />
      <div className="w-screen h-screen flex flex-col">
        <Navbar lastUpdated={lastUpdated} />
        <Dashboard
          data={{
            tweets,
            resources,
            cities,
            city,
            resource,
          }}
        />
      </div>
    </>
  )
}

/**
 * @type {import("next").GetStaticProps<{}, { slug: Array<string> }>}
 */

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params
  const cities = await getCities()
  const resources = await getResources()

  const tweets =
    slug.length === 2
      ? await fetchTweets({
          location: slug[0],
          resource: slug[1],
        })
      : []

  return {
    props: {
      tweets,
      resources,
      cities,
      city: slug[0],
      resource: typeof slug[1] === "string" ? slug[1] : null,
      lastUpdated: Date.now(),
    },
    revalidate: 20,
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async () => {
  const paths = []
  const cities = await getCities()
  const resources = await getResources()

  cities.forEach((/** @type {string} */ item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  cities.forEach((/** @type {string} */ city) => {
    resources.map((resource) => {
      paths.push({
        params: {
          slug: [city.trim().toLowerCase(), resource.trim().toLowerCase()],
        },
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export default CityPage
