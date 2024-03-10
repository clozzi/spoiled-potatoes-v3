import { useContext, useState } from "react"
import { MediasContext } from "../context/MediasContext"
import { UserContext } from "../context/UserContext"
import { NavLink } from "react-router-dom"


function SearchMedia() {
    const { medias } = useContext(MediasContext)
    const { user } = useContext(UserContext)
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

    function handleSearch() {
        const filteredMedias = medias.filter((media) => media.title.toLowerCase().includes(searchInput.toLowerCase()))
        setSearchResults(filteredMedias)
    }

    return (
        <>
            <h2>Search for Media</h2>
            <h2>Type a movie or series title below to search the potatobase!</h2>
            <div className="search">
                <input 
                type="text" 
                id="searchInput" 
                onChange={(e) => setSearchInput(e.target.value)} 
                value={searchInput} 
                placeholder="Enter media title..."
                />
                <button type="submit" onClick={handleSearch}>Search</button>
            </div>
            
            {searchResults.length > 0 ? (
                searchResults.map((media) => (
                    <div className="medias" key={media.id} >
                        <img src={media.image_url} alt="media" width="100" height="100" className="mediaImage"/>
                        <h3>{media.title}</h3>
                        <h5>{media.media_type}</h5>
                        <h5>Streaming on: {media.streaming_platform}</h5>
                        {user ? (
                        <NavLink to={`/medias/${media.id}`} className="nav-link">Click for more information</NavLink>
                        ) : (
                        <p>Log in to see Reviews</p>
                        )}
                    </div>
                ))
            ) : (
                <h3>No Results Yet!</h3>
            )}
        </>
    )
}


export default SearchMedia