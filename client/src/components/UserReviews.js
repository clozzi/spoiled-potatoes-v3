import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import EditReview from "./EditReview"

function UserReviews() {
    const { id } = useParams()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`/api/user_reviews/${id}`)
        .then((r) => {
            if (r.status === 200) {
                r.json().then(data => setReviews(data))
            } else {
                console.log('Retrieval unsuccessful')
            }
        })
    }, [id])

    function handleDeleteReview(id) {
        fetch(`/api/reviews/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.status === 200) {
                const updatedReviews = reviews.filter((review) => review.id !== id)
                setReviews(updatedReviews)
            } else {
                alert('Delete unsuccessful')
            }
        })
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
        <h3>My Reviews</h3>
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
                <p>No Reviews Yet!</p>
            )}
      </>  
    )
}


export default UserReviews