import { useRouter } from 'next/router'
import * as React from 'react'

const slugContext = React.createContext({
  location: undefined,
  resource: undefined,
})

export default function SlugProvider({ children }) {
  const router = useRouter()
  const [location, setLocation] = React.useState(undefined)
  const [resource, setResource] = React.useState(undefined)

  React.useEffect(() => {
    const { location, resource } = router.query
    
    if (!location && !resource) {
      setLocation(undefined)
      setResource(undefined)
    }

    if (location) {
      setLocation(location)
      setResource(undefined)
    }

    if (resource) {
      setResource(resource)
    }

  }, [router.query])

  return (
    <slugContext.Provider value={{ location, resource }}>
      {children}
    </slugContext.Provider>
  )
}

export function useSlug() {
  return React.useContext(slugContext)
}
