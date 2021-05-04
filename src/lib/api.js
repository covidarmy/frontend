import useSWR from "swr"
import fetcher from "./fetcher"
export const API_BASE_URL = "https://api.covid.army"

export const useTweets = ({
  location,
  resource,
  limit = undefined,
  offset = undefined,
}) => {
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

  if (limit) {
    url += "limit=" + limit
  }
  if (offset) {
    url += "&offset=" + offset
  }
  
  const { data, error } = useSWR(url, fetcher)
  return { data, error }
}

export const useCities = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/cities`, fetcher)
  return { data, error }
}

export const useResources = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/resources`, fetcher)
  return { data, error }
}
