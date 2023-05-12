import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { data as mockData } from "../asset/mock"

const useFetchData = () => {
    const [data, setData] = useState([])
    const [done, setDone] = useState(false)

    const finalData = useMemo(() => {
        if (!done) return {}
        const cleanData = data.reduce((acc, cur) => {
            if (!acc[cur.sarea]) acc[cur.sarea] = []
            acc[cur.sarea].push(cur)
            return acc
        }, {})
        mockData['台北市'] = cleanData
        return mockData
    }, [data, done])

    useEffect(() => {
        try {
            setDone(false)
            axios.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
            .then(res => {
                console.log(res);
                setData(res.data)
                setDone(true)
            })
        }
        catch(err) {
            console.warn(err);
        }
        
    }, [])

    return { finalData }
}

export default useFetchData;