import { Container, Row } from "react-bootstrap";
import LayoutUser from "../../hocs/LayoutUser";

export default function Error404({error}) {

    return (
        <LayoutUser>
            <div className="header">
                <h1>Error 404</h1>
            </div>
            <div id="content">
                <Container fluid>
                    <Row>
                        <p>Error 404: su solicitud es errónea o no está disponible en estos momentos. Error: {error}</p>
                    </Row>
                </Container>
            </div>
        </LayoutUser>
    );
}
