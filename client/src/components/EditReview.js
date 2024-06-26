import React, { useContext } from "react";
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext";


function EditReview({ review }) {
    const { handleUpdateReview } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            rating: "",
            comment: "",
        },
        onSubmit: (values) => {
            fetch(`/api/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null ,2),
            })
                .then((r) => {
                    if (r.status === 200) {
                        r.json().then((data) => {
                            handleUpdateReview(data)
                            formik.values.rating = ""
                            formik.values.comment = ""
                        })
                    } else {
                        alert('Failed attempt to update')
                    }
        })}
    })

    return (
        <div className="editReview">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label><b>Select New Rating: </b></label>
                    <input 
                        type="number" 
                        id="rating"
                        name="rating" 
                        placeholder="Rating..." 
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
                        placeholder="Enter New Comment..."
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                    />
                </div>
                <button type="submit">Modify Review</button>
            </form>
        </div>
    );
}


export default EditReview;