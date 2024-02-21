import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function Home() {
    const { user, medias } = useContext(UserContext)

    return (
        <>
        <h1>Home Page {user}</h1>
        {medias ? (
            medias.map((media) => {
            <p>{media.title}</p>
        })
        ) : (
            <p>Nope</p>
        )}
        
        </>
        
    )
}

export default Home