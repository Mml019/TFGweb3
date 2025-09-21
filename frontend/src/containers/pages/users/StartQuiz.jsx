import { UseNavigation } from "../../../assets/utils/functions/UseNavigation"
import LayoutUser from "../../../hocs/LayoutUser"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
// import logoPortada from "../../../assets/img/logoPortadaUib.png"
import logoPortada from "/img/logoPortadaUib.png"
import { use, useEffect, useState } from "react"

// onw components
import CheckButton from "../../../components/forms/CheckButton"
import MyVerticallyCenteredModal from "../../../components/Modal"
import MyNavbar from "../../../components/navigation/MyNavbar"
import { Link } from "react-router-dom"

export default function StartQuiz() {
    const items = [
        { nameGroup: "conditions", label: "Términos y condiciones", ariaLabelledby: "rules", ariaPlace: "Términos y condiciones" },
        { nameGroup: "conditions", label: "Instrucciones", ariaLabelledby: "rules", ariaPlace: "Instrucciones" }
    ];

    // create ana array with the number of check box
    const [checkedList, setIsChecked] = useState(new Array(items?.length).fill(false));
    const [cookie, setCookie] = useState(false);

    function handleOnChange(position) {
        // const updateIsChecked = checkedList.map((item, index) =>
        //     index === position ? !item : item
        // );
        setIsChecked(!checkedList[position]);

    }

    const isAcceptedCookie = () => { setCookie(!cookie) };

    const footerButtons = [
        {
            label: "Rechazar",
            type: "button",
            variant: "secondary",
            onClick: { isAcceptedCookie },
            size: "sm"
        },
        {
            label: "Aceptar cookies",
            type: "button",
            variant: "primary",
            onClick: { isAcceptedCookie },
            size: "sm"
        }]

    function handleClick() {
        // First checked if al checkbuttons and cookies are accepted.
        onHide = { isAcceptedCookie }

        // Then show it userform 
        // <UseNavigation destino="userForm/" />
    }



    return (
        <LayoutUser>
            <h1>StartQuiz</h1>
            <span>Inicio</span>
            <Container fluid id="content" >
                <MyVerticallyCenteredModal show={cookie} onHide={isAcceptedCookie} footerButtons={footerButtons}>
                    <h2>Uso de cookies 🍪</h2>
                    <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web.
                        Al continuar navegando, aceptas nuestro uso de cookies.
                        <Link to={"/politica-cookies"}>Política de cookies 1</Link>
                        <a href="/politica-cookies">Política de cookies 2</a>
                    </p>
                </MyVerticallyCenteredModal>
                <Row>
                    <Col />
                    <Col xs={10}>
                        <h2>Bienvenid@</h2>
                        <Image id="logo" src={logoPortada} alt="LogoUniversidad" />
                        <p>Esta apunto de empezar un cuestionario creado por el
                            equipo de profesionales sanitarios expertos en las
                            Prácticas Basadas en la Evidencia.
                        </p>
                        <Stack direction="vertical" gap={2} className="mx-auto centered">
                            <Button onClick={handleClick} variant="primary">Empezar Test</Button>
                            <CheckButton type="checkbox" items={items} checkedList={checkedList} handleOnChange={handleOnChange}></CheckButton>
                            {/* <ul className="conditions">
                                {items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <CheckButton type="checkbox" item={item} index={index} checked={checkedList[index]} handleOnChange={handleOnChange}></CheckButton>
                                        </li>)
                                })
                                }
                            </ul> */}

                        </Stack>
                    </Col>
                    <Col />
                </Row>🍪
            </Container>
            {/* <div id="cookie-modal" class="dialog">
                <div class="modal-content">
                    <h2>Aviso de Cookies 🍪</h2>
                    <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies. <a href="/politica-cookies">Política de cookies</a></p>
                    <div class="modal-buttons">
                        <button id="accept-modal">Aceptar todo</button>
                        <button id="reject-modal">Rechazar</button>
                    </div>
                </div>
            </div> */}
            {/* <div id="cookie-banner">
                <p>Este sitio web utiliza cookies 🍪 para mejorar tu experiencia. <a href="/politica-cookies">Más información</a></p>
                <button id="accept-cookies">Aceptar</button>
                <button id="reject-cookies">Rechazar</button>
            </div> */}
        </LayoutUser>
    )
}
