import fetcher from "~/lib/fetcher"
import { useSWRInfinite } from "swr"

export const useTweets = ({ location, resource }) => {
  let url = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/tweets"

  if (location) {
    url += "/" + location
  }
  if (resource) {
    url += "/" + encodeURIComponent(resource.trim())
  }

  url += "?"

  const getKey = (pageIndex, previousPageData) => {
    const l = 20 * (pageIndex + 1)
    const o = 20 * pageIndex

    if (previousPageData && !previousPageData.length) return null
    return `${url}/&limit=${l}&offset=${o}`
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)
  return { data, error, size, setSize }
}
