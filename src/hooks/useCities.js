import { API_BASE_URL } from "~/lib/url"
import fetcher from "~/lib/fetcher"
import useSWR from "swr"
import * as React from "react"

export const useCities = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/cities`, fetcher)
  const [cities, setCities] = React.useState(data)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (data) {
      setCities(Object.keys(data))
      setIsLoading(false)
    }
  }, [data])

  return [cities, error, isLoading]
}
