import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({})

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/check_session")
            .then((r) => {
            if (r.status === 200) {
                r.json().then(data => login(data))
            }
        })
      }, [])

    function login(user) {
        setUser(user)
    }

    function logout() {
        setUser(null)
    }

    return <UserContext.Provider value={{user, login, logout}}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }