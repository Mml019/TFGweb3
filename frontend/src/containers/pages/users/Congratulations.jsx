import { Container, Row } from "react-bootstrap";
import LayoutUser from "../../../hocs/LayoutUser";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MyNavbar from "../../../components/navigation/MyNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Congratulations() {
    const nav = useNavigate()

    // NOT RETURN BACK
    useEffect(() => {
        const handlePopState = (e) => {
            window.history.pushState(null, null, window.location.href);
            return toast.error('Ya ha no ha terminado el quiz puede hacer más si quiere pero desde el inicio.')
        };

        // History
        window.history.pushState(null, null, window.location.href);

        // event to postback
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [nav])

    return (
        <LayoutUser>

            <MyNavbar nameBrand="¡GRACIAS POR SU PARTICIPACIÓN!" ></MyNavbar>
            <div id="content">

                <Row>
                    <p>Muchísimas gracias por su tiempo y colaboración; su participación ha sido de gran valor para el desarrollo del proyecto.</p>
                </Row>
                <Row>
                    <p>Para cualquier duda o consideración, no dude en contactar con nosotros a través de:<b>[clara.carbonell@uib.cat] [jcarlos.fernandez@uib.es]</b></p>
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
