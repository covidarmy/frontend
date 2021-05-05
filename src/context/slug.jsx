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
    const slug = router.query.slug
    if (typeof slug !== "undefined" && Array.isArray(slug)) {
      if (slug.length === 1) {
        setLocation(slug[0])
      }

      if (slug.length === 2) {
        setLocation(slug[0])
        setResource(slug[1])
      }
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
