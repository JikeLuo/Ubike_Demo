import { useEffect } from "react"




const useClosePopup = (trigger, fn) => {
    const close = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!!fn) fn()
        return document.removeEventListener('mouseup', close, false)
    }
    useEffect(() => {
        if (!!trigger) document.addEventListener('mouseup', (e) => close(e), false)
    }, [trigger])
}

export default useClosePopup;