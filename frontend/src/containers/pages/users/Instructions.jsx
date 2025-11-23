import Container from "react-bootstrap/esm/Container"
import MyButton from "../../../components/MyButton"
import { useNavigate } from "react-router-dom"
import MyNavbar from '../../../components/navigation/MyNavbar'
import Image from "react-bootstrap/Image"
import { Col } from "react-bootstrap"

export default function Instructions() {
  const nav = useNavigate();

  return (
    <Container fluid id="instructions">
      <div id="header">
        <MyNavbar nameBrand={"Instrucciones del cuestionario"} />
      </div>
      <div id="content" className="pt-2 pb-2">
        <div id="secction1">
          <h2>En qué consiste su participación:</h2>
          <br />
          <ul>
            <li>
              Completar un <strong>breve formulario sociodemográfico anónimo.</strong>
            </li>
            <li>
              Responder <strong>100 preguntas de verdadero/falso asignadas aleatoriamente</strong> por el sistema.
            </li>
            <li>
              Dispone de <strong>30 segundos para responder</strong> la pregunta, sino se <strong>responderá automáticamente
              como No sé/No contesto(NS/NC)</strong>.
            </li>
            <li>
              <strong>No puede volver hacía atrás</strong> una vez avance a la siguiente pregunta.
            </li>
          </ul>
        </div>
        <div id="section2">
          <h2>A tener en cuenta:</h2>
          <br />
          <ul>
            <li>
              <strong>Buena conexión:</strong>
              <br/><br />
              Asegúrese de tener buena conexión, porque una vez empieza el
              cuestionario, si no lo envía y termina,
              <br /> no se guardarán sus respuestas, le aparecerá otro
              cuestionario o lo empezará desde el inicio.
              {/* Solo se le guardará durante  20 primeros minutos desde donde se quedó, apsado ese intervalo de tiempo volverá a empezar con nuevas preguntas*/}
            </li><br/>
            <li>
              <strong>Duración aproximada:</strong> 55 minutos en una única
              sesión en línea.
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-end pe-3">
            <MyButton type="button" variant="secondary" onClick={() => nav(-1)}>
              Atrás
            </MyButton>
            <MyButton
              type="button"
              variant="primary"
              onClick={() => nav("/quiz/form/")}
            >
              Aceptar y continuar
            </MyButton>
        </div>
      </div>
    </Container>
  );
}
