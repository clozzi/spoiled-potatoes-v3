import { useFormik } from "formik"
import { useContext } from "react"
import * as yup from 'yup'
import { UserContext } from "../context/UserContext"
import { MediasContext } from "../context/MediasContext"


function CreateMedia() {
    const { user } = useContext(UserContext)
    const { handleNewMedia } = useContext(MediasContext)

    const formSchema = yup.object().shape({
        title: yup.string().max(32).min(1),
    })

    const formik = useFormik({
        initialValues: {
            media_type: "",
            streaming_platform: "",
            title: "",
            image_url: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/medias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((r) => {
                    if (r.status === 201) {
                        r.json().then(data => handleNewMedia(data))
                    } else {
                        alert('Media could not be created')
                    }
                })
        }
    })

    return (
        <div>
            <h2>Contribute to the Spoiled Potatoes Community!</h2>
            <div className="createMedia">
            {user ? (
                <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <div>
                     <p>Select a Media Type:</p>
                     <input 
                        name="media_type" 
                        type="radio"
                        id="Movie"
                        value="Movie"
                        onChange={formik.handleChange}
                    />
                    <label >Movie</label>
                    <input 
                        name="media_type" 
                        type="radio"
                        id="Series"
                        value="Series"
                        onChange={formik.handleChange}
                    />
                    <label >Series</label>
                </div>
                <div>
                    <p>Select a Streaming Platform:</p>
                    <input 
                        name="streaming_platform" 
                        type="radio"
                        id="HBO"
                        value="HBO"
                        onChange={formik.handleChange}
                    />
                    <label >HBO</label>
                    <input 
                        name="streaming_platform" 
                        type="radio"
                        id="Hulu"
                        value="Hulu"
                        onChange={formik.handleChange}
                    />
                    <label >Hulu</label>
                    <input 
                        name="streaming_platform" 
                        type="radio"
                        id="Netflix"
                        value="Netflix"
                        onChange={formik.handleChange}
                    />
                    <label >Netflix</label>
                    <input 
                        name="streaming_platform" 
                        type="radio"
                        id="Prime"
                        value="Prime"
                        onChange={formik.handleChange}
                    />
                    <label >Prime</label>
                    <input 
                        name="streaming_platform" 
                        type="radio"
                        id="Peacock"
                        value="Peacock"
                        onChange={formik.handleChange}
                    />
                    <label >Peacock</label>
                </div>
                <div>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Enter media title..." 
                        maxLength="32" 
                        minLength="1"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>
                <div>
                    <input 
                        type="url" 
                        name="image_url" 
                        placeholder="Enter image url..."
                        onChange={formik.handleChange}
                        value={formik.values.image_url}
                    />
                </div>
                <button type="submit">Submit New Media</button>
            </form>
            ) : (
                <h3>You must be logged in to contribute</h3>
            )}
            </div>
        </div>
    )
}


export default CreateMedia