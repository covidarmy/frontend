import * as React from "react"
import { auth } from "~/lib/firebase"
import firebase from "firebase/app"
import { useRouter } from "next/router"

type User = firebase.User | null

const context = React.createContext<{
  user: User
  isAuthenticated: boolean
  loading: boolean
  signOut: (() => void) | undefined
}>({
  user: null,
  isAuthenticated: false,
  loading: true,
  signOut: undefined,
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(null)
  const [isAuthenticated, setAuthenticated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()

  const signOut = () => {
    auth.signOut()
    router.push("/login")
  }

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      setLoading(true)
      if (user) {
        setUser(user)
        setAuthenticated(true)
      } else {
        setUser(null)
        setAuthenticated(false)
      }
      setLoading(false)
    })
  }, [])

  return (
    <context.Provider value={{ isAuthenticated, user, loading, signOut }}>
      {children}
    </context.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(context)
}

export default AuthProvider
