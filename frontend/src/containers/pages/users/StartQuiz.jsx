import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useState } from "react"
import { Link } from "react-router-dom"

// onw components
import CheckButton from "../../../components/forms/CheckButton"
import MyVerticallyCenteredModal from "../../../components/Modal"
import '../../../assets/styles/MyNavbar.css'
import MyNavbar from '../../../components/navigation/MyNavbar'
import { UseNavigation } from "../../../assets/utils/functions/UseNavigation"
import LayoutUser from "../../../hocs/LayoutUser"
import logoPortada from "/img/logoPortadaUib.png"

export default function StartQuiz() {
    const itemsChecks = [
        { nameGroup: "conditions", label: "Términos y condiciones", ariaLabelledby: "rules", ariaPlace: "Términos y condiciones" },
        { nameGroup: "conditions", label: "Instrucciones", ariaLabelledby: "rules", ariaPlace: "Instrucciones" }
    ];

    const itemsMenu = [
        { value: 'Usuarios', path: 'usuarios/' },
        { value: 'Formularios', path: 'formularios/' },
        { value: 'Resultados', path: 'resultados/' }
    ]

    // create ana array with the number of check box
    const [checkedList, setIsChecked] = useState(new Array(itemsChecks?.length).fill(false));
    const [cookie, setCookie] = useState(false);

    const handleOnChange = (position) => {
            const updateIsChecked = checkedList.map((item_value, index) =>
            index === position ? !item_value : item_value
        );
        setIsChecked(updateIsChecked)
    };

    // const handleOnChange = (position) => {
    //     const newCheckedList = [...checkedList];
    //     newCheckedList[position] = !newCheckedList[position];
    //     setIsChecked(newCheckedList) 
    // };


    const isAcceptedCookie = () => { setCookie(!cookie) };

    // const footerButtons = [
    //     {
    //         label: "Rechazar",
    //         type: "button",
    //         variant: "secondary",
    //         onClick: { isAcceptedCookie },
    //         size: "sm"
    //     },
    //     {
    //         label: "Aceptar cookies",
    //         type: "button",
    //         variant: "primary",
    //         onClick: { isAcceptedCookie },
    //         size: "sm"
    //     }]

    function handleClick() {
        // First checked if all checkbuttons and cookies are accepted.
        onHide = { isAcceptedCookie }

        // Then show it userform 
        // <UseNavigation destino="userForm/" />
    }



    return (

        <LayoutUser>
            <MyNavbar items={itemsMenu}></MyNavbar>
            <div id="header">
                <h1>StartQuiz</h1>
                <span>Inicio</span>
            </div>
            <div id="content" >
                <MyVerticallyCenteredModal show={cookie} onHide={isAcceptedCookie} >
                    <h2>Uso de cookies 🍪</h2>
                    <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web.
                        Al continuar navegando, aceptas nuestro uso de cookies.
                        <Link to={"/politica-cookies"}>Política de cookies 1</Link>
                        <a href="/politica-cookies">Política de cookies 2</a>
                    </p>
                </MyVerticallyCenteredModal>
                <Row className="justify-content-md-center">
                    <Col />
                    <Col xs={10} >
                        <h2>Bienvenid@</h2>
                        <Image id="logo" src={logoPortada} alt="LogoUniversidad" />
                        <p>Esta apunto de empezar un cuestionario creado por el
                            equipo de profesionales sanitarios expertos en las
                            Prácticas Basadas en la Evidencia.
                        </p>
                        <Stack direction="vertical" gap={2} className="mx-auto centered">
                            <Button onClick={handleClick} variant="primary">Empezar Test</Button>
                            {/* <CheckButton type="checkbox" items={itemsChecks} checkedList={checkedList} handleOnChange={handleOnChange}></CheckButton> */}
                            {/* <ul className="conditions">
                                {items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <CheckButton type="checkbox" item={item} index={index} checked={checkedList[index]} handleOnChange={handleOnChange}></CheckButton>
                                        </li>)
                                })
                                }
                            </ul> */}
                            {/* este va individual pero no checked */}
                            <div className="mb-3">
                                {itemsChecks.map((item, index) => (
                                    //<CheckButton key={index} type="checkbox" item={item} index={index} ></CheckButton>

                                    <CheckButton key={index} type="checkbox" item={item} index={index} checked={checkedList[index]} handleOnChange={handleOnChange}></CheckButton>
                                ))}
                            </div>
                        </Stack>
                    </Col>
                    <Col />
                </Row>🍪
            </div>
            <div id="footer">
                <div id="cookie-modal" class="dialog">
                    <div class="modal-content">
                        <h2>Aviso de Cookies 🍪</h2>
                        <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies. <a href="/politica-cookies">Política de cookies</a></p>
                        <div class="modal-buttons">
                            <button id="accept-modal">Aceptar todo</button>
                            <button id="reject-modal">Rechazar</button>
                        </div>
                    </div>
                </div>
                <div id="cookie-banner">
                    <p>Este sitio web utiliza cookies 🍪 para mejorar tu experiencia. <a href="/politica-cookies">Más información</a></p>
                    <button id="accept-cookies">Aceptar</button>
                    <button id="reject-cookies">Rechazar</button>
                </div>
            </div>
        </LayoutUser>
    )
}
