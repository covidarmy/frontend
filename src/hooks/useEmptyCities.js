import fetcher from '~/lib/fetcher'
import useSWR from 'swr'
import * as React from 'react'
import { API_BASE_URL } from '~/constants'

const getEmptyCities = (data) => {
  const emptyCities = []
  if (data.error) return
  data.forEach((item) => {
    emptyCities.push(item.city)
  })
  return emptyCities
}

const getRankedData = (data) => {
  data.sort((a, b) => {
    if (a.totalContacts > b.totalContacts) return 1
    if (a.totalContacts < b.totalContacts) return -1

    if (a.totalRequests > b.totalRequests) return -1
    if (a.totalRequests < b.totalRequests) return 1
  })

  return data
}

export const useEmptyCities = (state) => {
  const { data, error } = useSWR(
    `${API_BASE_URL}/api/emptyCities/${state}`,
    fetcher
  )
  const [cities, setCities] = React.useState(data)
  const [isLoading, setIsLoading] = React.useState(true)
  const [rankedData, setRandkedData] = React.useState(data)

  React.useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
    if (data && data.length > 0) {
      setRandkedData(getRankedData(data))
      setCities(getEmptyCities(data))
    }
  }, [data])

  return { rankedData, cities, isLoading }
}
