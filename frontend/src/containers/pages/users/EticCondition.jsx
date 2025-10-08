import Container from "react-bootstrap/esm/Container"
import { Link } from "react-router-dom"

export default function EticCondition() {
    return (
        <Container fluid>
            <div className="header">
                <h1>Información para participantes</h1>
            </div>

            <hr />
            <div id="content">
                <nav>
                    <ul>
                        <li><Link to="#section1">Título del estudio</Link></li>
                        <li><Link to="#section2">Riesgos y beneficios</Link></li>
                        <li><Link to="#section3">Anonimato y gestión de los datos</Link></li>
                        <li><Link to="#section4">Participación voluntaria</Link></li>
                        <li><Link to="#section5">Publicación de los resultados</Link></li>
                        <li><Link to="#section6">Contacto</Link></li>
                        <li><Link to="#section7">Consentimiento</Link></li>
                    </ul>
                </nav>
                <hr />

                <h2 id="section1">Título del estudio</h2>
                <p>
                    Desarrollo y validación de un cuestionario sobre conocimientos en Práctica Basada en la Evidencia en profesionales de la salud.
                </p>
                <br />
                <h2>¿Quién coordina el estudio?</h2>
                <p>
                    Equipo investigador de la Universitat de les Illes Balears (UIB).
                </p>
                <br />

                <h2>¿Cuál es el objetivo?</h2>
                <p>
                    Desarrollar y validar un cuestionario que mida, de forma objetiva, los conocimientos en Práctica Basada en la Evidencia (PBE) entre profesionales y estudiantes de ciencias de la salud.
                </p>
                <br />
                <h2>¿En qué consiste su participación?</h2>
                <ul>
                    <li>Completar un <strong>breve formulario sociodemográfico anónimo.</strong></li>
                    <li>Responder <strong>100 preguntas de verdadero/falso</strong> asignadas aleatoriamente por el sistema.</li>
                    <li><strong>Duración aproximada:</strong> 55 minutos en una única sesión en línea.</li>
                </ul>

                {/* <summary>¿Quién coordina el estudio?</summary>
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
                    <br />No hay beneficios directos, pero su participación contribuirá a mejorar la formación en PBE.
                </p>
                <h2 id="section3">Anonimato y gestión de los datos</h2>
                <div>
                    <ul>
                        <li>El cuestionario <strong>no recoge datos personales</strong> (no se solicitan nombre, correo, IP, número de colegiado, etc.).</li>
                        <li>Cada registro se <strong>identifica con un código aleatorio</strong> que imposibilita su vinculación con personas concretas.</li>
                        <li>Los datos se almacenarán de forma segura en servidores de la UIB y se eliminarán tras <strong>cinco años.</strong></li>
                        <li>Los datos se protegeran y privatizaránsegún la LOPDGDD() española y el reglamento RGPD() de la UE.</li>
                    </ul>
                    (Al ser datos anónimos, no procede la referencia a derechos individuales de protección de datos).
                </div>

                <h2 id="section4">Participación voluntaria</h2>
                <p>
                    Participar es totalmente voluntario.<br />

                    Puede <strong>interrumpir la cumplimentación en cualquier momento antes de enviar el formulario</strong> cerrando la página.
                    Dado que los datos son anónimos, <strong>una vez enviado el cuestionario no será posible localizar ni retirar su participación.</strong>
                </p>
                <h2 id="section5">Publicación de resultados</h2>
                <p>
                    Los resultados se presentarán de forma agregada en la tesis doctoral y publicaciones científicas, sin posibilidad de identificación individual.
                </p>
                <h2 id="section6">Contacto</h2>
                <p> Para cualquier duda sobre el estudio contactar con: <b>[clara.carbonell@uib.cat] [jcarlos.fernandez@uib.es]</b>.</p>
                <h2 id="section7">Consentimiento</h2>
                <p>
                    El envío del cuestionario implica que ha leído esta información y acepta participar de forma voluntaria y anónima.
                </p>
            </div>
        </Container >
    )



}