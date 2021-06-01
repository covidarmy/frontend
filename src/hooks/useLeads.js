import useSWR from 'swr'
import * as React from 'react'
import { API_BASE_URL } from '~/constants'

const fetcher = (url, token) => {
  if (token === '') return
  return fetch(url, {
    headers: {
      authorization: token,
    },
  }).then((res) => res.json())
}

export const useLeads = (authToken) => {
  const { data } = useSWR(
    [`${API_BASE_URL}/volunteer/contacts`, authToken],
    fetcher
  )
  const [leads, setLeads] = React.useState(data)
  const [isNotVerifedByUs, setIsNotVerifiedByUs] = React.useState(false)

  React.useEffect(() => {
    if (data) {
      if (data.error) {
        setIsNotVerifiedByUs(true)
      } else {
        setLeads(data.reverse())
      }
    }
  }, [data])

  return [leads, isNotVerifedByUs]
}
