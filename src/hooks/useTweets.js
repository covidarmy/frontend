import fetcher from "~/lib/fetcher"
import { useSWRInfinite } from "swr"
import { API_BASE_URL } from "~/lib/url"

export const useTweets = ({ location, resource }) => {
  let url = API_BASE_URL + "/api/tweets"

  if (location) {
    url +=
      "/" +
      location[0].toUpperCase() +
      location.substring(1, location.length).toLowerCase()
  }
  if (resource) {
    url += "/" + resource.toLowerCase()
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
