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
    const params = router.query
    console.log(params);
  }, [router.query.slug])

  React.useEffect(() => {
    if (router.pathname === '/') {
      setLocation(undefined)
      setResource(undefined)
    }
  }, [router.pathname])

  return (
    <slugContext.Provider value={{ location, setLocation, resource, setResource }}>
      {children}
    </slugContext.Provider>
  )
}

export function useSlug() {
  return React.useContext(slugContext)
}
