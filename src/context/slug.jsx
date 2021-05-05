import { useRouter } from "next/router"
import * as React from "react"

const slugContext = React.createContext({
  location: undefined,
  resource: undefined,
})

export default function SlugProvider({ children }) {
  const router = useRouter()
  const [location, setLocation] = React.useState(undefined)
  const [resource, setResource] = React.useState(undefined)

  React.useEffect(() => {
    const { slug } = router.query
    if (Array.isArray(slug)) {
      if (slug.length === 2) {
        setLocation(slug[0])
        setResource(slug[1])
      } else if (slug.length === 1) {
        setLocation(slug[0])
      }
    }
  }, [router.query.slug])

  React.useEffect(() => {
    if (router.pathname === "/") {
      setLocation(undefined)
      setResource(undefined)
    }
  }, [router.pathname])

  return (
    <slugContext.Provider value={{ location, resource }}>
      {children}
    </slugContext.Provider>
  )
}

export function useSlug() {
  return React.useContext(slugContext)
}
