import { useFormik } from "formik"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"


function CreateReview({ media, onAddReview }) {
    const { user, handleCreateReview } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            rating: "",
            comment: "",
            media_id: "",
        },
        onSubmit: (values) => {
            fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: values.rating,
                    comment: values.comment,
                    media_id: media.id
                }),
            })
            .then((r) => {
                if (r.status === 201) {
                    r.json().then((data) => {
                        handleCreateReview(data)
                        onAddReview(data)
                        formik.values.rating = ""
                        formik.values.comment = ""
                    })
                } else {
                    alert('Unable to create review')
                }
            })
        }
    })

    return (
        <div className="createReview">
            <h3>Create new review</h3>
            {user ? (
                <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }} id="newReview">
            <div>
                <label>Rating (between 0 and 10):</label>
                <input 
                    type="number" 
                    id="rating"
                    name="rating" 
                    placeholder="Enter Rating (0-10)..." 
                    max="10" 
                    min="0"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                />
            </div>
            <div>
                <input 
                    type="text" 
                    id="comment"
                    name="comment" 
                    placeholder="Enter comment..."
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                />
            </div>
            <div className="hiddenInput">
                <label>User ID:</label>
                <input 
                    type="hidden" 
                    id="user_id"
                    name="user_id"
                    readOnly
                    value={formik.values.user_id}
                />
            </div>
            <div className="hiddenInput">
                <label>Media ID:</label>
                <input 
                    type="hidden" 
                    id="media_id"
                    name="media_id"
                    readOnly
                    value={formik.values.media_id}
                />
            </div>
            <button type="submit">Submit New Review</button>
            </form>
            ) : (
                <h3>You must be logged in to leave a review</h3>
            )}
            
        </div>
    )
}


export default CreateReview