import { useState, useEffect, useContext } from "react"
import EditReview from "./EditReview"
import { UserContext } from "../context/UserContext"


function MyReviews() {
    const [reviews, setReviews] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        setReviews(user.reviews)
    }, [user.reviews])

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

    return (
        <>
        <h2>My Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div className="userReviews" key={review.id} >
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                        <img src={review.media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                        <p>Media Title: {review.media.title}</p>
                        <p>Media Type: {review.media.media_type}</p>
                        <EditReview review={review} onUpdateReview={handleUpdateReview} />
                        <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    </div>)
            )) : (
                <h2>No Reviews Yet!</h2>
            )}
      </>  
    )
}


export default MyReviews