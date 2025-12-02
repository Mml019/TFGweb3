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
import { getQuizRandomAndList, nextQuiz } from "../../../reduxToolkit/slices/quiz"
import { setAnswer, sendAnswers } from "../../../reduxToolkit/slices/answer";
import { Form } from "react-bootstrap"
import MyButton from '../../../components/MyButton'
import MyVerticallyCenteredModal from "../../../components/Modal"
import { Buttons } from '../../../components/MyButton'
import toast from "react-hot-toast"
import Timer from '../../../components/Timer'
import { IoIosArrowForward } from 'react-icons/io';

function UserQuiz() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const { questions, questions_done, currentQuestion, currentQuestionIndex, currentOption, status, error } = useSelector((state) => state.question)
    const { quiz_ids, currentQuiz, currentQuizIndex, statusQRandom, errorQRandom, checkedList } = useSelector((state) => state.quiz)
    const { answers, currentAnswer, responseTime, statusAnswer } = useSelector(state => state.answers)
    const { currentUser } = useSelector((state) => state.user)

    const [optionSelected, selectOption] = useState(0)
    const [stopTime, setStop] = useState(false)

    // to add prop to the button disable button if is final question
    const disabled = () => {
        if ((currentQuestion === questions.length) || (loading)) {
            return disabled
        }
    }

    // To create all the answers by one user in BD
    function createAnswer() {
        // POST to data base with data
        console.log("respuesta")
        dispatch(sendAnswers(answers))
    }

    function otherQuiz() {
        // POST to data base with data
        console.log("otherQuiz")
        dispatch(nextQuiz())
    }

    // To pass nextQuestion and save answers into redux global variables
    function handleClick() {

        // Stop time and save answer before pass to next question
        setStop(true)

        // store answers until all quiz is submitted´
        let answer = {
            questionId: currentQuestion.idP,
            // userId: currentUser.respondant,
            option: optionSelected,
            time: responseTime
        }

        dispatch(setAnswer(answer))
        selectOption(0)
        dispatch(nextQuestion())

        // if is final question send al answer POST
        if (currentQuestionIndex == questions.length) {
            createAnswer()
        }
    }

    const fetchQuestions = () => {
        try {
            if (currentQuiz === undefined || currentQuiz === null) {
                dispatch(getQuizRandomAndList()).unwrap()
                    .then(((quizData) => {
                        dispatch(getQuizUnOrderQuestions(quizData.quiz.idQ)).unwrap()
                    }))
            } else {
                dispatch(getQuizUnOrderQuestions(currentQuizIndex))
            }
        } catch (e) {
            toast.error(`Error al mostrar las preguntas del quiz ${currentQuiz}. ${e}`)
        }
    }

    // To stablize by default optionSelected as "No lo sé" if question isn't respond
    useEffect(() => {
        if (currentQuestion) {
            if (optionSelected === 0) {
                selectOption(currentQuestion.idO[2].idO)
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        fetchQuestions()
    }, [currentQuizIndex]);

    //delete back navigation history
    useEffect(() => {
        // Cuando el componente PageC se monta, reemplaza la entrada en el historial
        window.history.replaceState(null, '', window.location.href);

        // Opcional: escuchar el evento popstate (si el usuario presiona retroceder)
        const handlePopState = () => {
            // Redirigir a una nueva página si el usuario intenta retroceder
            //   nav('/quiz/questions/', { replace: true });
            nav('/quiz/questions/')
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            // Limpiar el event listener cuando el componente se desmonte
            window.removeEventListener('popstate', handlePopState);
        };
    }, [nav]);

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

    return (
        <Container fluid>
            <div className="header">
                <h1>{`Quiz ${currentQuizIndex}`}</h1>
            </div>
            <div id='content'>
                {currentQuestionIndex !== questions.length ?
                    (<Card className="text-center" key={currentQuestion.idP} >
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
                    ) : (< MyVerticallyCenteredModal
                        // show={questions.length === 0 && dispatch(getInterestArea())}
                        show={currentQuestionIndex === questions.length}
                        onHide={closed}
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
                            <Row>
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
                                <p>Número de preguntas correctas:{ }</p>
                                <p>Número de preguntas incorrectas:{ }</p>
                            </Row>
                        </div>
                    </MyVerticallyCenteredModal>)
                }</div>
        </Container >
    )
}

export default UserQuiz;