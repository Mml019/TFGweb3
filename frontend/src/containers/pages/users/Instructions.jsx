import Container from "react-bootstrap/esm/Container";
import MyButton from "../../../components/MyButton";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../../../components/navigation/MyNavbar";
import Image from "react-bootstrap/Image";

export default function Instructions() {
  const nav = useNavigate();

  return (
    <Container fluid>
      <div id="header">
        <MyNavbar nameBrand={"Instrucciones del cuestionario"} />
      </div>
      {/* <div className="header ">
                <Image src='/img/logoUib.png' alt='Logo de la Universidad' width={100} height={30}></Image>
                <h1>Instrucciones del cuestionario</h1>
            </div> */}
      <div id="content" className="pt-2 pb-2">
        <ul>
          <li>
            <p>
              <b>Duración 30 segundos</b>
              <br />
              Si tarda más de 30 segundos en responder la pregunta se marcará
              como NS/NC.
            </p>
          </li>
          <li>
            <p>
              <b>No volver hacía atrás</b>
              <br />
              Una vez avance a la siguiente pregunta no podrá volver hacia
              atrás.
            </p>
          </li>
          <li>
            <p>
              <b>Buena conexión</b>
              <br />
              Asegurese de tener buena conexión, porque una vez empieza el
              cuestionario sino lo envía y termina, no se guardarán sus
              respuestas, le aparecerá otro cuestionario o lo empezará desde el
              inicio.
              {/* Solo se le guardará durante  20 primeros minutos desde donde se quedó, apsado ese intervalo de tiempo volverá a empezar con nuevas preguntas*/}
            </p>
          </li>
        </ul>
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
