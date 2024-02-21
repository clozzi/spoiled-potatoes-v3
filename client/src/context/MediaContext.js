import { createContext, useState } from "react";

const MediaContext = createContext({})

function MediaProvider({ children }) {
    const [medias, setMedias] = useState([])

    useEffect(() => {
        fetch("/medias")
          .then((r) => r.json())
          .then((data) => setMedias(data))
      }, [])

    function handleNewMedia(newMediaObj) {
    setMedias([...medias, newMediaObj])
    }

    return <MediaContext.Provider value={{medias, handleNewMedia}}>{ children }</MediaContext.Provider>
}

export { MediaContext, MediaProvider }