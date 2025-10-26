import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// onw components
import CheckLink from "../../../components/forms/CheckLink";
import MyVerticallyCenteredModal from "../../../components/Modal";
import MyNavbar from "../../../components/navigation/MyNavbar";
import LayoutUser from "../../../hocs/LayoutUser";
import logoPortada from "/img/logoPortadaUib.png";
import MyButton from "../../../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { toogleCheck, initChecks } from "../../../reduxToolkit/slices/quiz";

export default function StartQuiz() {
  const itemsChecks = [
    {
      nameGroup: "conditions",
      label: "Hoja para participantes",
      ariaPlace: "Hoja para participantes",
      link: "/quiz/conditions/etic",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkedList = useSelector((state) => state.quizReducer.checkedList);

  // create ana array with the number of check box
  // const [checkedList, setIsChecked] = useState(
  //   new Array(itemsChecks?.length).fill(false)
  // );

  // const handleOnChange = (position) => {
  //   const newCheckedList = [...checkedList];
  //   newCheckedList[position] = !newCheckedList[position];
  //   setIsChecked(newCheckedList);
  // };

  const handleOnChange = (position) => {
    // setIsChecked((prev) =>
    //   prev.map((item, index) => (index === position ? !item : item))
    // );
    dispatch(toogleCheck(position));
  };

  //start status of checkbox
  useEffect(() => {
    if (checkedList?.length === 0) {
      dispatch(initChecks(new Array(itemsChecks.length).fill(false)));
    }
  }, []);

  function handleClick() {
    const allCheck = checkedList.every((element) => element == true);
    if (allCheck == true) {
      // Then show it userform
      navigate("/quiz/conditions/instructions");
    } else {
      navigate("#");
      toast.error(
        "Debes aceptar los términos y condiciones y las instrucciones, para continuar"
      );
    }
  }

  return (
    <LayoutUser>
      <div id="header">
        <MyNavbar></MyNavbar>
      </div>
      <div id="content">
        {/* <MyVerticallyCenteredModal show={!cookie} onHide={isAcceptedCookie}>
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
                </MyVerticallyCenteredModal> */}
        <Row>
          <Col />
          <Col xs={10}>
            <Stack direction="vertical" gap={2} className="mx-auto centered">
              <h2>Bienvenid@</h2>
              <Image id="logo" src={logoPortada} alt="LogoUniversidad" />
              <p className="center-text">
                Está a punto de empezar un cuestionario para evaluar sus
                conocimientos sobre práctica basada en la evidencia, muchas
                gracias por su dedicación y tiempo.
              </p>
              <MyButton id="StartQuiz" onClick={handleClick} variant="primary">
                Empezar Test
              </MyButton>
              <div className="mb-3" id="rules">
                {itemsChecks.map((item, index) => (
                  <CheckLink
                    inline
                    link={item.link}
                    inicio={true}
                    key={index}
                    id={`checkbox-id-${index}`}
                    name={item.nameGroup}
                    label={item.label}
                    type="checkbox"
                    index={index}
                    checked={!!checkedList[index]} // return clean boolean
                    onChange={handleOnChange}
                    aria-placeholder={item.ariaPlace}
                    aria-checked={!!checkedList[index]} //{() => {checked[index] !== undefined ? checked[index] : false}}
                    tabIndex={index}
                    role="checkbox"
                  />
                ))}
              </div>
            </Stack>
          </Col>
          <Col />
        </Row>
      </div>
      <div id="footer">
        <div id="cookie-banner">
          <p>
            🍪Este sitio web utiliza cookies, para mejorar su experiencia.Al
            continuar navegando, aceptas nuestro uso de cookies.
            {/* <Link to="/politica-cookies">Más información</Link> */}
          </p>
        </div>
      </div>
    </LayoutUser>
  );
}
