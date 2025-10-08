import Button from "react-bootstrap/esm/Button"
import Container from "react-bootstrap/esm/Container"
import { ModalButton } from "../../../components/Modal"
import { useNavigation } from "react-router-dom"

export default function Instructions() {
    const nav = useNavigation()
    return (
        <Container fluid>
            <div className="header">
                <h1>Instrucciones del cuestionario</h1>
            </div>
            <div id="content">
                <hr />
                <ul>
                    <li>
                        <p><b>Duración 30 segundos</b><br />
                            Si tarda más de 30 segundos en responder la pregunta se marcará como NS/NC.
                        </p>
                    </li>
                    <li><p><b>No volver hacía atrás</b><br />
                        Una vez avance a la siguiente pregunta no podrá volver hacia atrás.
                    </p></li>
                    <li><p><b>Buena conexión</b><br />
                        Asegurese de tener buena conexión, porque una vez empieza el cuestionario sino lo envía y termina, no se guardarán sus respuestas, le aparecerá otro cuestionario o lo empezará desde el inicio.
                        {/* Solo se le guardará durante  20 primeros minutos desde donde se quedó, apsado ese intervalo de tiempo volverá a empezar con nuevas preguntas*/}
                    </p></li>
                </ul>
                <ModalButton type="button" variant="primary" onClick={()=>(nav("/quiz/form"))}>Aceptar y continuar</ModalButton>
                <ModalButton type="button" variant="secondary" onClick={()=>(nav(-1))}>Atrás</ModalButton>
            </div>

        </Container>
    )
}