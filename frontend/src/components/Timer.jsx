import { useEffect, useState } from "react"

export default function Timer(mytime) {
    const [time, setTime] = useState(obtainSeconds(mytime))

    function obtainSeconds(time_str) {
        let time_split = time_str.toString().split(':')
        let minutos_en_sec = ((time_split[0].parseInt()) * 60)
        let segundos = time_split[0].parseInt()
        return (minutos_en_sec + segundos)
    }

    function formatTime(time) {
        let minutos = time / 60
        let segundos = time % 60
        return (`${minutos.toString()}:${segundos.toString()}`)
    }

    useEffect(() => {

        setInterval(() => { 
            setTime(...prevState - 1)
        }, 1000)

        // restart counter
        clearInterval()
    }, []

    )

    return (
        <div id='row'>
            {formatTime(time)}
        </div>
    )
}