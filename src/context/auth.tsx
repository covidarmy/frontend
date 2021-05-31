import * as React from "react";
import { auth } from "~/lib/firebase";
import firebase from "firebase/app";
import { useRouter } from "next/router";
import { API_BASE_URL } from "~/constants";

type User = firebase.User | null;

const context = React.createContext<{
  user: User;
  authToken: string;
  isAuthenticated: boolean;
  loading: boolean;
  signOut: (() => void) | undefined;
}>({
  user: null,
  authToken: "",
  isAuthenticated: false,
  loading: true,
  signOut: undefined,
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [authToken, setAuthToken] = React.useState("");
  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.push("/login");
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        user.getIdToken().then((idToken) => {
          setAuthToken(idToken);
          fetch(API_BASE_URL + "/volunteer/auth", {
            method: "post",
            headers: {
              authorization: idToken,
            },
          }).catch((err) => console.log(err));
        });
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <context.Provider
      value={{ isAuthenticated, user, authToken, loading, signOut }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(context);
};

export default AuthProvider;
