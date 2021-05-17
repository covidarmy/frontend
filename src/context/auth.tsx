import * as React from "react"
import { auth } from "~/lib/firebase"
import firebase from "firebase/app"

const context = React.createContext<{
  user: firebase.User | undefined
  isAuthenticated: boolean
}>({
  user: undefined,
  isAuthenticated: false,
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | undefined>(undefined)
  const [isAuthenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setAuthenticated(true)
      } else {
        setUser(undefined)
        setAuthenticated(false)
      }
    })
  }, [])

  return (
    <context.Provider value={{ isAuthenticated, user }}>
      {children}
    </context.Provider>
  )
}

export const useAuth = () => React.useContext(context)

export default AuthProvider
