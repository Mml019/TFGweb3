import "../../../assets/styles/UserQuiz.css";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "../../../components/Spinner"
import { getQuizUnOrderQuestions, nextQuestion } from "../../../reduxToolkit/slices/questions"
import { getQuizRandomAndList } from "../../../reduxToolkit/slices/quiz"
import { Form } from "react-bootstrap"
import MyButton from '../../../components/MyButton'
import MyVerticallyCenteredModal from "../../../components/Modal"
import { Buttons } from '../../../components/MyButton'
import toast from "react-hot-toast"
import Timer from '../../../components/Timer'
import { IoIosArrowForward } from 'react-icons/io';

function UserQuiz() {
    // const [loading, setLoading] = useState(true)
    const nav = useNavigate()
    const dispatch = useDispatch();
    const { questions, questions_done, currentQuestion, currentQuestionIndex, currentOption, status, error } = useSelector((state) => state.question)
    const { quiz_ids, currentQuiz, currentQuizIndex, statusQRandom, errorQRandom, checkedList } = useSelector((state) => state.quiz)
    const {answers, currentAnswer, responseTime} = useSelector(state => state.answers)
    const [checked, setChecked] = useState(false)
    // to add prop to the button disable button if is final question
    const disabled = () => {
        if ((currentQuestion === questions.length) || (loading)) {
            return disabled
        }
    }


    function crearRespuesta() {
        // POST to data base with data
        console.log("respuesta")
        // nav("/quiz/results/")
    }

    function otroQuiz() {
        // POST to data base with data
        // nav("/quiz/results/")
        console.log("otroQuiz")
    }

    function handleClick() {
        // if (currentQuestionIndex != questions.length - 1) {
        //     dispatch(nextQuestion())
        // }
        console.log('siguiente')
        dispatch(setT)
        dispatch(nextQuestion())
    }

    function handleTime(){

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

    useEffect(() => {
        fetchQuestions()
    }, []);

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

    return (
        <Container fluid>
            <div className="header">
                <h1>{`Quiz ${currentQuizIndex}`}</h1>
            </div>
            <div id='content'>
                <Card className="text-center" key={currentQuestion.idP} >
                    <Card.Header text='light' bg={'#0d6efd'}>
                        <h2>{`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
                        <Timer mytime={currentQuestion.time} ontimeExpired={handleTime}></Timer>
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
                                    // checked={false}
                                        onChange={(e)=>{
                                            dis
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
                            (<Buttons
                                btns={
                                    [{ label: 'Enviar todo', type: 'button', variant: 'secondary', size: 'sm', onClick: { crearRespuesta } },
                                        // { label: 'Continuar con otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: { otroQuiz } }
                                    ]
                                }
                            />)
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
                {/* //
                    // (<>
                    //     <Buttons
                    //         btns={
                    //             [{ label: 'Finalizar', type: 'button', variant: 'secondary', size: 'sm', onClick: { crearRespuesta } },
                    //             { label: 'Hacer otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: { otroQuiz } }
                    //             ]
                    //         }>
                    //     </Buttons>
                    // </>)*/}
                < MyVerticallyCenteredModal
                    // show={questions.length === 0 && dispatch(getInterestArea())}
                    show={questions.length === 0}
                    onHide={closed}
                    footerButtons={
                        [{ label: 'Finalizar', type: 'button', variant: 'secondary', size: 'sm', onClick: crearRespuesta },
                        { label: 'Hacer otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: otroQuiz }]
                    }
                >
                    <h2>¡Enhorabuena Quiz completado!</h2>
                    <p>Ha finalizado el cuestionario debería <b>repasar estas áreas,
                        para volverse todo un experto</b> en Prácticas Basadas en la evidencia(PBE).
                    </p>
                </MyVerticallyCenteredModal>
            </div>
        </Container >
    )
}

export default UserQuiz;