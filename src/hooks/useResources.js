import { API_BASE_URL } from "~/lib/url"
import fetcher from "~/lib/fetcher"
import useSWR from "swr"

export const useResources = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/resources`, fetcher)
  return { data, error }
}
