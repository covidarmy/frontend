import fetcher from "~/lib/fetcher"
import useSWR from "swr"
import * as React from "react"
import { API_BASE_URL } from "~/constants"

const getEmptyCities = (data) => {
  const emptyCities = []
  if (data.error) return
  data.forEach((item) => {
    emptyCities.push(item.city)
  })
  return emptyCities
}

export const useEmptyCities = (state) => {
  const { data, error } = useSWR(
    `${API_BASE_URL}/api/emptyCities/${state}`,
    fetcher
  )
  const [cities, setCities] = React.useState(data)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (data) {
      setCities(getEmptyCities(data))
      setIsLoading(false)
    }
  }, [data])

  return [cities, isLoading]
}
