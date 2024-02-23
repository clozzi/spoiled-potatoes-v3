import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateReview from "./CreateReview";


function Media() {
    const { id } = useParams()
    const [media, setMedia] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`/api/medias/${id}`)
        .then((r) => {
            if (r.status === 200) {
                r.json().then((data) => handleMedia(data))
            } else {
                console.log('error retrieving data')
            }})
    }, [id])

    function handleMedia(media) {
        setMedia(media)
        setReviews(media.reviews)
    }

    function handleCreateReview(newReview) {
        setReviews([...reviews, newReview])
    }

    return (
        <>
            <h3>Media Details</h3>
            <div className="media" key={media.id} >
                <img src={media.image_url} alt="media" width="100" height="100"/>
                <h3>{media.title}</h3>
                <h5>{media.media_type}</h5>
                <h5>Streaming on: {media.streaming_platform}</h5>
                <CreateReview media={media} onCreateReview={handleCreateReview} />
                <div>
                    {reviews.map((review) => (
                        <div key={review.id} className="reviews">
                        <p>Rating: {review.rating}</p>
                        <p>Explanation:{review.comment}</p>
                        <p>User: {review.user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default Media