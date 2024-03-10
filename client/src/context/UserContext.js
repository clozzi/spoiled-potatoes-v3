import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({})


function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState(null)
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
        setReviews(user.reviews)
    }

    function logout() {
        fetch("/api/logout", {
            method: "DELETE",
        })
        setUser(null)
        navigate('/')
    }

    function handleCreateReview(newReview) {
        setReviews([...reviews, newReview])
    }

    function handleDeleteReview(id) {
        const updatedReviews = reviews.filter((review) => review.id !== id)
        setReviews(updatedReviews)
    }

    function handleUpdateReview(updatedReview) {
        const updatedReviews = reviews.map((review) => {
            if (review.id === updatedReview.id) {
                return updatedReview
            } else {
                return review
            }
        })
        setReviews(updatedReviews)
    }

    return <UserContext.Provider value={{user, reviews, login, logout, handleDeleteReview, handleCreateReview, handleUpdateReview }}>{ children }</UserContext.Provider>
}


export { UserContext, UserProvider }