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
      {/* <div className="header ">
    const nav = useNavigate()
    const item = [{ name: 'Instrucciones del cuestionario' }]
    return (
        <Container fluid>
            <div id="header">
                <MyNavbar nameBrand="Instrucciones del cuestionario" />
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
            </div> */}
            <div id="content" className="pt-2 pb-2">

                <h2 id="section1">En que consiste su participación:</h2>

                {/* <Col md={10} className="ml-3"> */}
                <p className="justify-content-center mb-3 mt-3 p-0">
                    Participará en un cuestionario formado por dos partes. La primera parte es un <strong>breve formulario sociodemográfico anónimo</strong>
                    , el cuál recogerá algunos datos generales para el estudio y la segunda un cuestionario de respuestas verdadero y falso, que si no se responden
                    se contestarán de forma automática como no lo sé.
                </p>
                
                <ul>
                    <li>Completar un <strong>breve formulario sociodemográfico anónimo.</strong></li>
                    <li>Responder <strong>100 preguntas de verdadero/falso</strong> asignadas aleatoriamente por el sistema.</li>
                    <li>Las preguntas no respondidas con verdadero o falso, <strong>se marcarán automáticamente como NS/NC por el sistema.</strong></li>
                    <li><strong>No puede volver hacía atrás, una vez avance a la siguiente pregunta</strong></li>
                    <li>Dispone de <strong>30 segundos</strong>, para contestar cada pregunta, situado en la cabecera de la pregunta.</li>
                </ul>
                {/* </Col> */}
                <h2 id="section2">A tener en cuenta:</h2>
                <ul>
                    <li><b>Buena conexión</b><br />
                        Asegurese de tener buena conexión, porque una vez empieza el cuestionario sino lo envía y termina, no se guardarán sus respuestas, le aparecerá otro cuestionario o lo empezará desde el inicio.
                        {/* Solo se le guardará durante  20 primeros minutos desde donde se quedó, apsado ese intervalo de tiempo volverá a empezar con nuevas preguntas*/}
                    </li>

                    <li><b>Duración aproximada</b><br />
                        En una única sesión en línea de 55 minutos aproximadamente.
                    </li>
                </ul>
                <div className="mx-5 d-flex justify-content-end">
                    <MyButton type="button" variant="secondary" onClick={() => (nav(-1))}>Atrás</MyButton>
                    <MyButton type="button" varint="primary" onClick={() => { (nav("/quiz/form/")) }}>Aceptar y continuar</MyButton>
                </div>
            </div>
        </Container >
    )
}
