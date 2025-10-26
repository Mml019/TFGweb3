import Container from "react-bootstrap/esm/Container";
import MyButton from "../../../components/MyButton";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../../../components/navigation/MyNavbar";
import Image from "react-bootstrap/Image";

export default function Instructions() {
  const nav = useNavigate();

  return (
    <Container fluid id="instructions">
      <div id="header">
        <MyNavbar nameBrand={"Instrucciones del cuestionario"} />
      </div>
      {/* <div className="header ">
                <Image src='/img/logoUib.png' alt='Logo de la Universidad' width={100} height={30}></Image>
                <h1>Instrucciones del cuestionario</h1>
            </div> */}
      <div id="content" className="pt-2 pb-2">
        {/* <nav>
          <ul>
            <li>
              <a href="#section1">En qué consiste su participación</a>
            </li>
            <li>
              <a href="#section2">Riesgos y beneficios</a>
            </li>
          </ul>
        </nav> */}
        <div id="secction1">
          <h2>En qué consiste su participación:</h2>
          <br />
          <p>
            En completar un cuestionario de forma anónima, formada por dos
            partes:
            <br />
            La primera, un formulario de datos sociodemográficos. La segunda, un
            cuestionario de 100 preguntas verdadero y falso ofrecidas por el
            sistema de forma aleatória con un tiempo de respuesta de 30 segundos
            cada una o se marcarán como NS/NC.
          </p>
          <ul>
            <li>
              Completar un{" "}
              <strong>breve formulario sociodemográfico anónimo.</strong>
            </li>
            <li>
              Responder <strong>100 preguntas de verdadero/falso</strong>{" "}
              asignadas aleatoriamente por el sistema.
            </li>
            <li>
              <b>Duración 30 segundos por pregunta:</b>
              <br />
              Si tarda más en responder la pregunta se marcará automáticamente
              como No sé/No contesto(NS/NC) .
            </li>
            <li>
              <strong>No puede volver hacía atrás</strong>
              una vez avance a la siguiente pregunta.
            </li>
          </ul>
        </div>
        <div id="section2">
          <h2>A tener en cuenta:</h2>
          <br />
          <ul>
            <li>
              <strong>Buena conexión</strong>
              <br />
              Asegúrese de tener buena conexión, porque una vez empieza el
              cuestionario sino lo envía y termina,
              <br /> no se guardarán sus respuestas, le aparecerá otro
              cuestionario o lo empezará desde el inicio.
              {/* Solo se le guardará durante  20 primeros minutos desde donde se quedó, apsado ese intervalo de tiempo volverá a empezar con nuevas preguntas*/}
            </li>
            <li>
              <strong>Duración aproximada:</strong> 55 minutos en una única
              sesión en línea.
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-end pe-3">
          <Container fluid>
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
          </Container>
        </div>
      </div>
    </Container>
  );
}
