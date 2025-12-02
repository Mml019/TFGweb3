import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setTime } from "../reduxToolkit/slices/answer"
import { nextQuestion } from "../reduxToolkit/slices/questions"

export default function Timer({ mytime, onTimeStop }) {
    const [time, setTimer] = useState(obtainSeconds(mytime))
    // const timeRef = useRef(null)
    const interval = useRef(0);
    const dispatch = useDispatch();

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

    const stopTimer = () => {
        return () => clearInterval(interval.current);
    }

    useEffect(() => {
        dispatch(setTime(time))
        if (time === 0) {
            stopTimer()
            dispatch(nextQuestion())
        }
    }, [time])

    useEffect(() => {

            interval.current = setInterval(() => {
                setTimer((prevTime) => prevTime - 1)
            }, 1000)

            // when finalice setInterval dismount to stop back counter
            return () => clearInterval(interval.current);
    }, [onTimeStop]);

    if (!time) {
        return (
            <div className="clock">
                <span>00:00</span>
            </div>)
    }

    return (
        <div className="clock">
            <span>{formatTime(time)}</span>
        </div>
    )
}