import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useState } from "react"
import { Link } from "react-router-dom"

// onw components
import CheckButton from "../../../components/forms/CheckButton"
import MyVerticallyCenteredModal, { ModalButton } from "../../../components/Modal"
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
    const [cookie, setCookie] = useState(true);

    const handleOnChange = (position) => {
        const newCheckedList = [...checkedList];
        newCheckedList[position] = !newCheckedList[position];
        setIsChecked(newCheckedList)
    };

    const isAcceptedCookie = () => { return setCookie(!cookie) };

    const footerButtons = [
        {
            label: "Rechazar",
            type: "button",
            variant: "secondary",
            onClick: isAcceptedCookie,
            size: "sm"
        },
        {
            label: "Aceptar cookies",
            type: "button",
            variant: "primary",
            onClick: isAcceptedCookie,
            size: "sm"
        }]

    function handleClick() {
        // First checked if all checkbuttons and cookies are accepted.
        const allCheck = checkedList.every((element) => (element==true))
        if (allCheck == true & cookie){
        // Then show it userform 
        <UseNavigation destino="/quiz/conditions" />
        }else{
            
        }
        
    }

    return (

        <LayoutUser>
            <MyNavbar items={itemsMenu}></MyNavbar>
            <div id="header">
                <h1>StartQuiz</h1>
                <span>Inicio</span>
            </div>
            <div id="content" >
                <MyVerticallyCenteredModal show={cookie} onHide={isAcceptedCookie} footerButtons={footerButtons} >
                    <h2>Uso de cookies 🍪</h2>
                    <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web.
                        Al continuar navegando, aceptas nuestro uso de cookies.
                        <Link to={"/quiz/conditions/"}>Política de cookies</Link>
                    </p>
                    <ModalButton
                        label= {"Rechazar"}
                        type= {"button"}
                        variant= {"secondary"}
                        onClick= {isAcceptedCookie}
                        size= {"sm"}> 
                    </ModalButton>
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
                <div id="cookie-banner">
                    <p>Este sitio web utiliza cookies, para mejorar su experiencia.Al continuar navegando, aceptas nuestro uso de cookies.
                        <Link to="/politica-cookies">Más información</Link>
                    </p>
                </div>
            </div>
        </LayoutUser >
    )
}
