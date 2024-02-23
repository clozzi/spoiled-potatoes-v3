import { useState, useEffect, useContext } from "react"
// import EditReview from "./EditReview"
// import DeleteReview from "./DeleteReview"
import { UserContext } from "../context/UserContext"

function UserReviews() {
    const { user } = useContext(UserContext)

    const [reviews, setReviews] = useState([])
    

    useEffect(() => {
        console.log(user)
        fetch(`/api/user_reviews/${user.id}`)
            .then((r) => {
                if (r.status === 200) {
                    r.json().then(data => setReviews(data))
                } else {
                    console.log('Retrieval unsuccessful')
                }
            })
    }, [user])

    return (
        <>
            {reviews ? (
                reviews.map((review) => (
                    <div className="userReviews" key={review.id} >
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                        <img src={review.media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                        <p>Media Title: {review.media.title}</p>
                        <p>Media Type: {review.media.media_type}</p>
                        {/* <EditReview review={review} onUpdateReview={handleUpdateReview} /> */}
                        {/* <DeleteReview review={review} onDeleteReview={handleDeleteReview} /> */}
                    </div>)
            )) : (
                <p>No Reviews Yet!</p>
            )}
      </>  
    )
}


export default UserReviews