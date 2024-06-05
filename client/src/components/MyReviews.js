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
        <h1>My Reviews</h1>
            {reviews ? (
                reviews.map((review) => (
                    <div className="userReviews" key={review.id} >
                        <p><b>Rating:</b> {review.rating}</p>
                        <p><b>Comment:</b> {review.comment}</p>
                        <img src={review.media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                        <p><b>Media Title:</b> {review.media.title}</p>
                        <p><b>Media Type:</b> {review.media.media_type}</p>
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