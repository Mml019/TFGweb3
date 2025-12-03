import { Container } from "react-bootstrap";
import LayoutUser from "../../hocs/LayoutUser"

export default function ErrorTimeoutBadR({error}) {

    return (
        <LayoutUser>
            <div className="header">
                 <h1>Error tiempo excedido</h1>
            </div>
            <div id="content">
                <Container fluid>
                    <Row>
                        <p>Actualmente, no llega su solicitud al servidor.Se supero el tiempo de carga. Concretamente en {error}</p>
                    </Row>
                </Container>
            </div>
        </LayoutUser>
    );
}
