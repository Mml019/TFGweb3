import { Container, Row } from "react-bootstrap";
import LayoutUser from "../../../hocs/LayoutUser";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MyNavbar from "../../../components/navigation/MyNavbar";

export default function Congratulations() {

    return (
        <LayoutUser>
            
                <MyNavbar nameBrand="¡GRACIAS POR SU PARTICIPACIÓN!" ></MyNavbar>
            <div id="content">

                <Row>
                    <p>Gracias por participar en este cuestionario es de gran utilidad su colacboración, para el desarrollo de un estudio de un TFM.</p>
                </Row>
                <Row>
                    <p>Cualquier duda o consideración no dude en contactar con<b>[clara.carbonell@uib.cat] [jcarlos.fernandez@uib.es]</b></p>
                </Row>
                <Row>
                    <DotLottieReact
                        src="/img/animation.lottie"
                        loop
                        autoplay
                        style={{ width: "80%", height: "auto", marginLeft: '2em' }}
                    />
                </Row>
            </div>
        </LayoutUser>
    );
}
