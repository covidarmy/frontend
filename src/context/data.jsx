import * as React from "react"
import { API_BASE_URL, getCities, getResources } from "~/lib/api"

const dataContext = React.createContext({
  cities: undefined,
  resources: undefined,
  loading: true,
})

export default function DataProvider({ children }) {
  const [locations, setLocations] = React.useState(undefined)
  const [resources, setResources] = React.useState(undefined)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        const cities = await getCities()
        const resources = await getResources()
        setLocations(cities)
        setResources(resources)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <dataContext.Provider value={{ cities: locations, resources, loading }}>
      {children}
    </dataContext.Provider>
  )
}

export function useData() {
  return React.useContext(dataContext)
}
