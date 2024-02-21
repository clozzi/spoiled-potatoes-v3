import { createContext, useEffect, useState } from "react";

const MediasContext = createContext([])

function MediasProvider({ children }) {
    const [medias, setMedias] = useState([])

    useEffect(() => {
        fetch("/api/medias")
          .then((r) => r.json())
          .then((data) => setMedias(data))
      }, [])

    function handleNewMedia(newMediaObj) {
    setMedias([...medias, newMediaObj])
    }

    return <MediasContext.Provider value={{medias, handleNewMedia}}>{ children }</MediasContext.Provider>
}

export { MediasContext, MediasProvider }