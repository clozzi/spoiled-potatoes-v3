import { useContext } from "react"
import EditReview from "./EditReview"
import { UserContext } from "../context/UserContext"


function MyReviews() {
    const { reviews, handleDeleteReview } = useContext(UserContext)

    function deleteReview(id) {
        fetch(`/api/reviews/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(res => console.log(res))
        handleDeleteReview(id)
    }

    return (
        <>
        <h2>My Reviews</h2>
            {reviews ? (
                reviews.map((review) => (
                    <div className="userReviews" key={review.id} >
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                        <img src={review.media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                        <p>Media Title: {review.media.title}</p>
                        <p>Media Type: {review.media.media_type}</p>
                        <EditReview review={review} />
                        <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                    </div>)
            )) : (
                <h2>No Reviews Yet!</h2>
            )}
      </>  
    )
}


export default MyReviews