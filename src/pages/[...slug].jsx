import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { camelize } from "~/lib/utils"

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
      <div className="w-screen overflow-x-hidden">
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
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))
  const { slug } = ctx.params
  let slug0type = "city"

  return {
    props: {
      //tweets,
      resources,
      cities,
      city: slug0type === "city" ? camelize(slug[0]) : null,
      resource:
        slug0type === "resource"
          ? camelize(slug[0])
          : typeof slug[1] === "string"
          ? camelize(slug[1])
          : null,
      lastUpdated: Date.now(),
    },
    //revalidate: 180,
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async () => {
  const resources = Object.keys(require("seeds/resources.json"))
  const cities = Object.keys(require("seeds/cities.json"))
  const paths = []

  paths.push({ params: { slug: ["/"] } })

  cities.forEach((/** @type {string} */ item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  resources.forEach((item) => {
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
