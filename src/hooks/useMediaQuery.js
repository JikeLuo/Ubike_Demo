import { useState, useEffect } from "react";



const useMediaQuery = (query, defaultMatchs = window.matchMedia(query)) => {
    const [matchs, setMatchs] = useState(defaultMatchs)

    useEffect(() => {
        const media = window.matchMedia(query)
        const listener = () => setMatchs(media.matches)
        if (media.matches !== matchs) setMatchs(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [query, matchs])

    return matchs
}

export default useMediaQuery;
