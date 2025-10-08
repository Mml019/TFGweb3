import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


// onw components
import CheckButton from "../../../components/forms/CheckButton"
import MyVerticallyCenteredModal, { ModalButton } from "../../../components/Modal"
import MyNavbar from '../../../components/navigation/MyNavbar'
import LayoutUser from "../../../hocs/LayoutUser"
import logoPortada from "/img/logoPortadaUib.png"

export default function StartQuiz() {
    const itemsChecks = [
        { nameGroup: "conditions", label: "Términos y condiciones", ariaLabelledby: "rules", ariaPlace: "Términos y condiciones" },
        { nameGroup: "conditions", label: "Instrucciones", ariaLabelledby: "rules", ariaPlace: "Instrucciones" }
    ];

    // create ana array with the number of check box
    const [checkedList, setIsChecked] = useState(new Array(itemsChecks?.length).fill(false));
    const [cookie, setCookie] = useState(false);
    const navigate = useNavigate()

    const handleOnChange = (position) => {
        const newCheckedList = [...checkedList];
        newCheckedList[position] = !newCheckedList[position];
        setIsChecked(newCheckedList)
    };

    const isAcceptedCookie = () => { return setCookie(!cookie) };
    const acceptedCookie = () => {
        setCookie(true)
    };
    const notAcceptedCookie = () => setCookie(false);

    function handleClick() {   
        const allCheck = checkedList.every((element) => (element == true))
        console.log(allCheck)
        if ((allCheck == true) & cookie) {
            // Then show it userform 
            navigate("/quiz/conditions/instructions")
        } else {
            navigate("#")
            toast.error("Debes aceptar las cookies y las instrucciones, para continuar")
        }
    }

    return (

        <LayoutUser>
            <div id="header">
                <MyNavbar></MyNavbar>
            </div>
            <div id="content" >
                <MyVerticallyCenteredModal show={!cookie} onHide={isAcceptedCookie}>
                    <h2>Uso de cookies 🍪</h2>
                    <p>Utilizamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web.
                        Al continuar navegando, aceptas nuestro uso de cookies.
                        <Link to={"/quiz/conditions/etic"}>Política de cookies</Link>
                    </p>
                    <ModalButton
                        label={"Aceptar"}
                        type={"button"}
                        variant={"secondary"}
                        onClick={acceptedCookie}
                        size={"sm"}>
                    </ModalButton>
                </MyVerticallyCenteredModal>
                <Row>
                    <Col />
                    <Col xs={10}>
                        <Stack direction="vertical" gap={2} className="mx-auto centered">
                            <h2>Bienvenid@</h2>
                            <Image id="logo" src={logoPortada} alt="LogoUniversidad" />
                            <p className="center-text">
                                Está a punto de empezar un cuestionario para evaluar sus conocimientos sobre práctica basada en la evidencia, muchas gracias por su dedicación y tiempo.
                            </p>
                            <Button id="StartQuiz" onClick={handleClick} variant="primary">Empezar Test</Button>
                            <div className="mb-3">
                                {itemsChecks.map((item, index) => (
                                    //<CheckButton key={index} type="checkbox" item={item} index={index} ></CheckButton>
                                    <CheckButton inline inicio={true} key={index} type="checkbox" item={item} index={index} checked={checkedList[index]} handleOnChange={handleOnChange}></CheckButton>
                                ))}
                            </div>
                        </Stack>
                    </Col>
                    <Col />
                </Row>
            </div>
            <div id="footer">
                <div id="cookie-banner">
                    <p>🍪Este sitio web utiliza cookies, para mejorar su experiencia.Al continuar navegando, aceptas nuestro uso de cookies.
                        {/* <Link to="/politica-cookies">Más información</Link> */}
                    </p>
                </div>
            </div>
        </LayoutUser >
    )
}
