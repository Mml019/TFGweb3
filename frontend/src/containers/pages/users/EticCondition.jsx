import Container from "react-bootstrap/Container";
import MyButton from "../../../components/MyButton";
import MyNavbar from "../../../components/navigation/MyNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleCheck } from "../../../reduxToolkit/slices/quiz";

export default function EticCondition() {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const checkedList = useSelector((state) => state.quiz.checkedList);

  const handleAcept = () => {
    let index = location.state?.checkIndex;
    if (index !== undefined) {
      const checked = checkedList[index];
      if (checked !== undefined || checked == false) {
        dispatch(toogleCheck(index));
      }
    }
    nav("/quiz");
  };

  return (
    <Container fluid>
      <div id="header">
        <MyNavbar nameBrand="Hoja de información para participantes" />
      </div>
      {/*<div className="header">
        <h1>Información para participantes</h1>
      </div> */}
      <div id="content">
        <nav>
          <ul>
            <li><a href="#section1">Título del estudio</a></li>
            <li><a href="#section2">Riesgos y beneficios</a></li>
            <li><a href="#section3">Anonimato y gestión de los datos</a></li>
            <li><a href="#section4">Participación voluntaria</a></li>
            <li><a href="#section5">Publicación de los resultados</a></li>
            <li><a href="#section6">Contacto</a></li>
            <li><a href="#section7">Consentimiento</a></li>
          </ul>
        </nav>
        <hr />

        <h2 id="section1">Título del estudio</h2>
        <p>
          Desarrollo y validación de un cuestionario sobre conocimientos en
          Práctica Basada en la Evidencia en profesionales de la salud.
        </p>
        <br />

        <h2>¿Quién coordina el estudio?</h2>
        <p>Equipo investigador de la Universitat de les Illes Balears (UIB).</p>
        <br />

        <h2>¿Cuál es el objetivo?</h2>
        <p>
          Desarrollar y validar un cuestionario que mida, de forma objetiva, los
          conocimientos en Práctica Basada en la Evidencia (PBE) entre
          profesionales y estudiantes de ciencias de la salud.
        </p>
        <br />

        <h2>¿En qué consiste su participación?</h2>
        <ul>
          <li>
            Completar un <strong>breve formulario sociodemográfico anónimo.</strong>
          </li>
          <li>
            Responder <strong>100 preguntas de verdadero/falso</strong> asignadas aleatoriamente por el sistema.
          </li>
          <li>
            <strong>Duración aproximada:</strong> 55 minutos en una única sesión
            en línea.
          </li>
        </ul>

        {/* details con flechas
                <summary>¿Quién coordina el estudio?</summary>
            <details>Equipo investigador de la Universitat de les Illes Balears (UIB).</details>
            <br />
            <summary>¿Cuál es el objetivo?</summary>
            <details>Desarrollar y validar un cuestionario que mida, de forma objetiva, los conocimientos en Práctica Basada en la Evidencia (PBE) entre profesionales y estudiantes de ciencias de la salud. </details>
            <br />
            <summary>
                ¿En qué consiste su participación?</summary>
            <details>
                <ul>
                    <li>Completar un <strong>breve formulario sociodemográfico anónimo.</strong></li>
                    <li>Responder <strong>100 preguntas de verdadero/falso</strong> asignadas aleatoriamente por el sistema.</li>
                    <li><strong>Duración aproximada:</strong> 55 minutos en una única sesión en línea.</li>
                </ul>
            </details> */}
        <br />

        <h2 id="section2">Riesgos y beneficios</h2>
        <p>
          No se prevén riesgos físicos ni psicológicos relevantes.
          <br />
          No hay beneficios directos, pero su participación contribuirá a
          mejorar la formación en PBE.
        </p>
        <h2 id="section3">Anonimato y gestión de los datos</h2>
        <div>
          <ul>
            <li>
              El cuestionario <strong>no recoge datos personales</strong> (no se
              solicitan nombre, correo, IP, número de colegiado, etc.).
            </li>
            <li>
              Cada registro se <strong>identifica con un código aleatorio</strong> que
              imposibilita su vinculación con personas concretas.
            </li>
            <li>
              Los datos se almacenarán de forma segura en servidores de la UIB y
              se eliminarán tras <strong>cinco años.</strong>
            </li>
          </ul>
        </div>

        <h2 id="section4">Participación voluntaria</h2>
        <p>
          Participar es totalmente voluntario.
          <br />
          Puede <strong>
            interrumpir la cumplimentación en cualquier momento antes de enviar
            el formulario
          </strong> cerrando la página. Dado que los datos son anónimos,<strong>
            una vez enviado el cuestionario no será posible localizar ni retirar
            su participación.
          </strong>
        </p>
        <h2 id="section5">Publicación de resultados</h2>
        <p>
          Los resultados se presentarán de forma agregada en la tesis doctoral y
          publicaciones científicas, sin posibilidad de identificación
          individual.
        </p>
        <h2 id="section6">Contacto</h2>
        <p>
          {" "}
          Para cualquier duda sobre el estudio contactar con: 
          <b>[clara.carbonell@uib.cat] [jcarlos.fernandez@uib.es]</b>.
        </p>
        <h2 id="section7">Consentimiento</h2>
        <p>
          El envío del cuestionario implica que ha leído esta información y
          acepta participar de forma voluntaria y anónima.
        </p>
        <div className="d-flex justify-content-end pe-3 ">
          <MyButton
            label={"Atrás"}
            type={"button"}
            variant={"secondary"}
            size={"sm"}
            onClick={() => nav(-1)}
          >
            Atrás
          </MyButton>
          <MyButton
            label={"Aceptar"}
            type={"button"}
            variant={"primary"}
            //turn to start page and knowing what check was checked
            onClick={handleAcept}
            size={"sm"}
          >
            Aceptar
          </MyButton>
        </div>
      </div>
    </Container>
  );
}
