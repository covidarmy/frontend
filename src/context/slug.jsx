import { useRouter } from "next/router"
import * as React from "react"

const slugContext = React.createContext({
  location: undefined,
  resource: undefined,
})

export default function SlugProvider({ children }) {
  const { query } = useRouter()
  const [location, setLocation] = React.useState(undefined)
  const [resource, setResource] = React.useState(undefined)

  React.useEffect(() => {
    const { slug } = query
    if (Array.isArray(slug)) {
      if (slug.length === 2) {
        setLocation(slug[0])
        setResource(slug[1])
      } else if (slug.length === 1) {
        setLocation(slug[0])
      }
    }
  }, [query])

  return (
    <slugContext.Provider value={{ location, resource }}>
      {children}
    </slugContext.Provider>
  )
}

export function useSlug() {
  return React.useContext(slugContext)
}
