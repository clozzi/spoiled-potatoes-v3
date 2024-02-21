import { createContext, useState } from "react";

const UserContext = createContext({})

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        fetch("/check_session").then((r) => {
          if (r.status === 200) {
            r.json().then((data) => {
              login(data)
            })
          } else {
            alert('Login failed!')
          }
        })
      }, [])

    function login(user) {
        setUser(user)
        setLoggedIn(true)
    }

    function logout() {
        setUser(null)
        setLoggedIn(false)
    }

    return <UserContext.Provider value={{user, loggedIn, login, logout}}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }