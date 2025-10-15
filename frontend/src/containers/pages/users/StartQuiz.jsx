import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Form } from 'react-bootstrap';


// onw components
import CheckButton from "../../../components/forms/CheckButton"
import MyVerticallyCenteredModal from "../../../components/Modal"
import MyNavbar from '../../../components/navigation/MyNavbar'
import LayoutUser from "../../../hocs/LayoutUser"
import logoPortada from "/img/logoPortadaUib.png"
import MyButton from "../../../components/MyButton"
import CheckBox from "../../../components/forms/FormCheck";

export default function StartQuiz() {
    const itemsChecks = [
        { nameGroup: "conditions", label: "Términos y condiciones", ariaPlace: "Términos y condiciones" },
        { nameGroup: "conditions", label: "Instrucciones", ariaPlace: "Instrucciones" }
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
    }
    const notAcceptedCookie = () => setCookie(false);

    function handleClick() {
        const allCheck = checkedList.every((element) => (element == true))
        console.log("all" + allCheck)
        console.log(cookie)
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
                    <MyButton
                        label={"Aceptar"}
                        type={"button"}
                        variant={"secondary"}
                        onClick={acceptedCookie}
                        size={"sm"}>
                        Aceptar
                    </MyButton>
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
                            <MyButton id="StartQuiz" onClick={handleClick} variant="primary">Empezar Test</MyButton>
                            <div className="mb-3" id='rules'>
                           
                                {itemsChecks.map((item, index) => (
                                    //<CheckButton key={index} type="checkbox" item={item} index={index} ></CheckButton>
                                    <CheckButton
                                        inline
                                        inicio={true}
                                        key={index}
                                        id={`checkbox-id-${index}`}
                                        name={item.nameGroup}
                                        label={item.label}
                                        type="checkbox"
                                        index={index}
                                        checked={checkedList[index]}
                                        onChange={handleOnChange}
                                        aria-placeholder={item.ariaPlace}
                                        aria-checked={checkedList[index]}//{() => {checked[index] !== undefined ? checked[index] : false}}
                                        tabIndex={index}
                                        role='checkbox'
                                        
                                         //     inline
                                    //     index={index}
                                    //     type={'checkbox'}
                                    //     id={`checkbox-id-${index}`}
                                    //     key={`checkbox-id-${index}`}
                                    //     name={item.nameGroup}
                                    //     label={item.label}
                                    //     checked={checkedList[index]}
                                    //     onChange={handleOnChange}
                                    //     aria-labelledby={item.ariaLabelledby}
                                    //     aria-placeholder={item.ariaPlace}
                                    //     aria-checked={checkedList[index]}
                                    //     tabIndex={index}
                                    //     role='checkbox'
                                    //     index={index}
                                    />
                                    // &&                                    
                                    // <CheckBox
                                    //     inline
                                    //     index={index}
                                    //     type={'checkbox'}
                                    //     id={`checkbox-id-${index}`}
                                    //     key={`checkbox-id-${index}`}
                                    //     name={item.nameGroup}
                                    //     label={item.label}
                                    //     checked={checkedList[index]}
                                    //     onChange={handleOnChange}
                                    //     aria-labelledby={item.ariaLabelledby}
                                    //     aria-placeholder={item.ariaPlace}
                                    //     aria-checked={checkedList[index]}
                                    //     tabIndex={index}
                                    //     role='checkbox'
                                    //     index={index}
                                    // />
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
