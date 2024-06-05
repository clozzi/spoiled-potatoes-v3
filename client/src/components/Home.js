import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { MediasContext } from "../context/MediasContext"
import { NavLink } from "react-router-dom"


function Home() {
    const { user } = useContext(UserContext)
    const { medias } = useContext(MediasContext)

    return (
        <>
        <h1>{user ? (<>Welcome back, {user.username}!</>) : (<>Welcome to Spoiled Potatoes!</>)}</h1>
        <h2>Spoiled Potatoes: The #1 online source for ratings of movies and series!</h2>
        {medias.map((media) => (
            <div className="medias" key={media.id}>
                <img src={media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                <h3>{media.title}</h3>
                <h5>{media.media_type}</h5>
                <h5>Streaming on: {media.streaming_platform}</h5>
                {user ? (
                <NavLink to={`/medias/${media.id}`} className="mediaDetailLink">Click for more information</NavLink>
                ) : (
                <p>Log in to see Reviews</p>
                )}
            </div>
        ))}        
        </>
        
    )
}


export default Home