import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { MediasContext } from "../context/MediasContext";


function Media() {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [media, setMedia] = useState({})

    useEffect(() => {
        fetch(`/api/medias/${id}`)
        .then((r) => {
            if (r.status === 200) {
                r.json().then((data) => setMedia(data))
            } else {
                console.log('error retrieving data')
            }})
    }, [id])

    

    return (
        <h1>{media.title}</h1>
    )
}

export default Media