import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MediasContext = createContext([])

function MediasProvider({ children }) {
    const [medias, setMedias] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/medias")
          .then((r) => r.json())
          .then((data) => setMedias(data))
      }, [])

    function handleNewMedia(newMediaObj) {
      setMedias([...medias, newMediaObj])
      navigate('/')
    }

    return <MediasContext.Provider value={{medias, handleNewMedia}}>{ children }</MediasContext.Provider>
}

export { MediasContext, MediasProvider }