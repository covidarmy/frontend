import { API_BASE_URL } from "~/lib/url"
import fetcher from "~/lib/fetcher"
import useSWR from "swr"

export const useCities = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/cities`, fetcher)
  return { data, error }
}
