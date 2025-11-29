import { useEffect, useRef, useState } from "react"

export default function Timer({ mytime, onTimeExpired }) {
    const [time, setTime] = useState(obtainSeconds(mytime))
    const interval = useRef(0)

    function obtainSeconds(time_str) {
        let time_split = time_str.toString().split(':')
        let minutos_en_sec = ((parseInt(time_split[1])) * 60)
        let segundos = parseInt(time_split[2])
        return (minutos_en_sec + segundos)
    }

    function unaCifra(val) {
        if (val < 10) {
            return `0${val.toString()}`
        } else {
            return val.toString()
        }
    }

    function formatTime(time) {
        let minutos = Math.trunc(time / 60)
        let segundos = time % 60

        return (`${unaCifra(minutos)}:${unaCifra(segundos)}`)
    }
    
    useEffect(() => {
        interval.current = setInterval(() => {
            setTime(prevTime => prevTime - 1)
        }, 1000)

        // when finalice setInterval dismount to stop back counter
        return () => clearInterval(interval.current);
    }, []);

    return (
        <div onTimeExpired={interval}>
            {formatTime(time)}
        </div>
    )
}