import "../../../assets/styles/UserQuiz.css";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "../../../components/Spinner"
import { getQuizUnOrderQuestions, nextQuestion, setOption } from "../../../reduxToolkit/slices/questions"
import { getQuizzesRandom, nextQuiz } from "../../../reduxToolkit/slices/quiz"
import { setAnswer, sendAnswers } from "../../../reduxToolkit/slices/answer";
import { Form } from "react-bootstrap"
import MyButton from '../../../components/MyButton'
import MyVerticallyCenteredModal from "../../../components/Modal"
import MyNavbar from "../../../components/navigation/MyNavbar";
import LayoutUser from "../../../hocs/LayoutUser";
import { Buttons } from '../../../components/MyButton'
import toast from "react-hot-toast"
import Timer from '../../../components/Timer'
import { IoIosArrowForward } from 'react-icons/io';

function UserQuiz() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const { questions, questions_done, currentQuestion, currentQuestionIndex, currentOption, status, error } = useSelector((state) => state.question)
    const { quiz_ids, currentQuiz, currentQuizIndex, statusQRandom, errorQRandom, checkedList } = useSelector((state) => state.quiz)
    const { answers, currentAnswer, responseTime, statusAnswer, corrects, incorrects, areas } = useSelector(state => state.answers)
    const { currentUser } = useSelector((state) => state.user)

    const [optionSelected, selectOption] = useState(0)
    const [stopTime, setStop] = useState(false)
    const [show, setShow] = useState()

    // to add prop to the button disable button if is final question
    const disabled = () => {
        if ((currentQuestion === questions.length) || (loading)) {
            return disabled
        }
    }

    // NOT RETURN BACK
    useEffect(() => {
        const handlePopState = (e) => {
            window.history.pushState(null, null, window.location.href); 
            return toast.error('Ya ha empezado el quiz no puede volver a registrarse')
        };

        // History
        window.history.pushState(null, null, window.location.href);

        // event to postback
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [nav])

    // To create all the answers by one user in BD
    function createAnswer() {
        // POST to data base with data
        dispatch(sendAnswers(answers))
        nav("/quiz/congratulations/")
        // delete history of navigation
        // Reemplaza el historial para eliminar la entrada actual
        // window.history.replaceState(null, '', '/quiz/congratulations/');
    }

    function otherQuiz() {
        // POST to data base with data
        dispatch(nextQuiz())
    }

    // To pass nextQuestion and save answers into redux global variables
    function handleClick() {

        // Stop time and save answer before pass to next question
        setStop(true)

        // store answers until all quiz is submitted´ sends instances
        let answer = {
            question: currentQuestion.idP,
            user: currentUser.respondant,
            option: optionSelected,
            time: responseTime
        }

        dispatch(setAnswer(answer))
        if (currentQuestion !== questions.length - 1) {
            selectOption(0)
            dispatch(nextQuestion())
        } else {
            console.log('create')
            // if is final question send al answer POST
            createAnswer()
        }
    }

    // To stablize by default optionSelected as "No lo sé" if question isn't respond
    useEffect(() => {
        if (currentQuestion) {
            if (optionSelected === 0) {
                // selectOption(currentQuestion.idO[2].idO)
                selectOption(currentQuestion.idO.find(item => item.option === 'No lo sé').idO)
            }
        }
    }, [currentQuestion]);

    const fetchQuestions = async () => {
        try {
            if (currentQuiz === undefined || currentQuiz === null) {
                await dispatch(getQuizzesRandom()).unwrap()
            } else {
                await dispatch(getQuizUnOrderQuestions(currentQuiz.idQ))
            }
        } catch (e) {
            toast.error(`Error al mostrar las preguntas del quiz ${currentQuiz}. ${e}`)
        }
    }

    useEffect(() => {
        if (currentQuizIndex === -1) {
            nav("/quiz/congratulations/", { replace: true })
        } else {
            fetchQuestions()
        }
    }, [currentQuiz]);

    if (status === 'idle' || status === 'loading') {
        return (
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Spinner animation="border" size="lg" />
                <p className="text-center">Cargando...</p>
            </div>)
    }

    if (statusAnswer === 'pending' || statusAnswer === 'loading') {
        return (
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Spinner animation="border" size="lg" />
                <p className="text-center">Enviando...</p>
            </div>)
    }


    // if (statusQRandom === 'failed' || statusAnswer === 'failed') {
    //     return nav('/quiz/time-out-response/', { replace: true })
    // }


    if ((currentQuestionIndex === questions.length) && currentQuizIndex !== null) {
        return (
            < MyVerticallyCenteredModal
                // show={questions.length === 0 && dispatch(getInterestArea())}
                show={currentQuestionIndex === questions.length}
                // onHide={}
                footerButtons={
                    [
                        { label: 'Finalizar', type: 'button', variant: 'secondary', size: 'sm', onClick: createAnswer },
                        { label: 'Hacer otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: otherQuiz }
                    ]
                }
            >
                <h2>¡Enhorabuena Quiz completado!</h2>
                <p>Ha finalizado el cuestionario debería <b>repasar estas áreas,
                    para volverse todo un experto</b> en Prácticas Basadas en la evidencia(PBE).
                </p>
                <div id='results'>
                    <Row id='areas'>
                        {areas.map((area) => {
                            return (
                                <span >{area.toString()}</span>
                                , <MyButton type='span'>Prueba</MyButton>
                            )
                        })}
                        {/* {dispatch(getResults()).unwrap().then((r) => {
                                r.area.forEach(area => {
                                    return (
                                        <span >area.toString()</span>
                                        , <MyButton type='span'>Prueba</MyButton>
                                    )
                                });
                            })} */}
                    </Row>
                    <Row>
                        <p>Número de preguntas correctas:{corrects}</p>
                        <p>Número de preguntas incorrectas:{incorrects}</p>
                    </Row>
                </div>
            </MyVerticallyCenteredModal>)
    }

    return (
        <LayoutUser>
            {/* <div className="header">
                <h1>{`${currentQuestion.idD.dimension}`}</h1>
            </div> */}

            {/* <div id="header"> */}

            <MyNavbar nameBrand={`${currentQuestion.idD.dimension}`}></MyNavbar>
            {/* </div> */}
            <div id='content'>
                <Card className="text-center" key={currentQuestion.idP} >
                    <Card.Header>
                        <h2>{`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
                        <Timer mytime={currentQuestion.time} onTimeStop={stopTime}></Timer>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Row className="d-flex justify-center align-items-center">
                                <Col xs={1}></Col>
                                <Col xs={10} key='statement' >{currentQuestion.statement}</Col>
                                <Col xs={1} key={`arrowRight_${currentQuestion.idP}`}>
                                    <IoIosArrowForward className='arrow' onClick={handleClick} />
                                </Col>
                            </Row>
                        </Card.Title>
                        <Row className="d-flex justify-center">
                            <Col xs={2}></Col>
                            <Col xs={8} className="flex-center" key={`options_${currentQuestion.idP}`}>
                                {currentQuestion.idO.map((op, ind) => (
                                    <Form.Check
                                        inline
                                        type='radio'
                                        key={`radio_${currentQuestion.idP}_${op.idO}`}
                                        // item={op.option}
                                        name={'options_questions'}
                                        index={ind}
                                        label={op.option}
                                        value={op.idO}
                                        checked={parseInt(optionSelected) === parseInt(op.idO)}
                                        onChange={(e) => {
                                            selectOption(e.target.value)
                                        }}
                                    />
                                ))}
                            </Col>
                            <Col xs={2}></Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        {(currentQuestionIndex === (questions.length - 1))
                            ?
                            (<MyButton
                                className='btn'
                                type='button'
                                variant='secondary'
                                size='sm'
                                onClick={handleClick}
                            >
                                Enviar todo
                            </MyButton>)
                            : (<MyButton
                                type='submit'
                                className='btn'
                                onClick={handleClick}
                                {...disabled}
                            >
                                Siguiente
                            </MyButton>)
                        }
                    </Card.Footer>
                </Card>
            </div>
        </LayoutUser>
    )
}

export default UserQuiz;