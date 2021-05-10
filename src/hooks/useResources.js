import fetcher from "~/lib/fetcher"
import useSWR from "swr"
import * as React from "react"
import { API_BASE_URL } from "~/constants"

export const useResources = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/resources`, fetcher)
  const [resources, setResources] = React.useState(data)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (data) {
      setResources(Object.keys(data))
      setIsLoading(false)
    }
  }, [data])

  return [resources, error, isLoading]
}
