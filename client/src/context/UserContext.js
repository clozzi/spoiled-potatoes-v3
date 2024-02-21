import { createContext, useState } from "react";

const UserContext = createContext({})

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

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