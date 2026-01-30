import { Container, Row } from "react-bootstrap";
import LayoutUser from "../../hocs/LayoutUser";
import { useLocation } from "react-router-dom";
export default function Error404() {
    const location = useLocation()
    const error = location.state? location.state : 'No existe la URL a la que se dirige'
    return (
        <LayoutUser>
            <div className="header">
                <h1>Error 404</h1>
            </div>
            <div id="content">
                <Container fluid>
                    <Row>
                        <p>Error 404: su solicitud es errónea o no está disponible en estos momentos. En concreto el error es: {error}.</p>
                    </Row>
                </Container>
            </div>
        </LayoutUser>
    );
}
