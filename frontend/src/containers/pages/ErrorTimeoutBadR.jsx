import { Container, Row } from "react-bootstrap";
import LayoutUser from "../../hocs/LayoutUser"
import MyButton from "../../components/MyButton";
import { useNavigate } from "react-router-dom";

export default function ErrorTimeoutBadR({ error }) {
    const nav = useNavigate()
    return (
        <LayoutUser>
            <div className="header">
                <h1>Error tiempo excedido</h1>
            </div>
            <div id="content">
                <Container fluid>
                    <Row>
                        <p>Actualmente, no llega su solicitud al servidor.Se supero el tiempo de carga. Concretamente el error es {error}</p>
                        <p>Vuelva a intentar entrar a la página o contacte con  <b>[clara.carbonell@uib.cat] [jcarlos.fernandez@uib.es].</b>.</p>
                    </Row>
                    <MyButton
                        label={"Aceptar"}
                        type={"button"}
                        variant={"primary"}
                        //turn to start page and knowing what check was checked
                        onClick={() => { nav('/quiz') }}
                        size={"sm"}
                    >
                        Aceptar
                    </MyButton>

                </Container>
            </div>
        </LayoutUser>
    );
}
