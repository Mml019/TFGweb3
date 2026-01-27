import "../../../assets/styles/UserQuiz.css";
import { replace, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "../../../components/Spinner"
import { getQuizUnOrderQuestions, nextQuestion, setOption, resetQuestions } from "../../../reduxToolkit/slices/questions"
import { getQuizzesRandom, nextQuiz } from "../../../reduxToolkit/slices/quiz"
import { setAnswer, sendAnswers, resetAnswers } from "../../../reduxToolkit/slices/answer";
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
    const { questions, currentQuestion, currentQuestionIndex, currentOption, status, error } = useSelector((state) => state.question)
    const { quiz_ids, currentQuiz, currentQuizIndex, statusQRandom, errorQRandom, checkedList } = useSelector((state) => state.quiz)
    const { answers, currentAnswer, responseTime, statusAnswer, statusRequest, errorAnswer, corrects, incorrects, areas, results } = useSelector(state => state.answers)
    const { currentUser } = useSelector((state) => state.user)

    const [optionSelected, selectOption] = useState(0)
    const [stopTime, setStop] = useState(false)
    const [show, setShow] = useState(true)

    const finishAll = (currentQuizIndex === (quiz_ids.length - 1))

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

    function retry() {
        if (errorAnswer) {
            dispatch(sendAnswers(answers))
        }

        if (errorQRandom) {
            dispatch(getQuizzesRandom())
        }

        if (error) {
            dispatch(getQuizUnOrderQuestions(currentQuiz.idQ))
        }
    }

    // To create all the answers by one user in BD
    function finish() {
        // POST to data base with data
        nav("/quiz/congratulations/")
    }

    function otherQuiz() {
        //send answers
        // dispatch(sendAnswers(answers))
        // POST to data base with data
        dispatch(nextQuiz())
        dispatch(resetQuestions())
    }

    // To pass nextQuestion and save answers into redux global variables
    function handleClick() {

        // Stop time and save answer before pass to next question
        setStop(true)

        // store answers until all quiz is submitted´ sends instances
        let answer = {
            question: currentQuestion.idP,
            user: currentUser.respondant,
            option: parseInt(optionSelected),
            time: responseTime
        }

        dispatch(setAnswer(answer))
        // if not is the last cuestion
        if (currentQuestionIndex !== questions.length - 1) {
            selectOption(0)
            dispatch(setOption(0))
        }
        dispatch(nextQuestion())
    }

    // send answers if is lastquestion this option is used by timer and handleClik after dispatch(nextQuestion())
    useEffect(() => {
        // // if is the last cuestion
        if (currentQuestionIndex == questions.length) {
            // dispatch(getSolutions(answers))
            // if is final question send all answer POST
               dispatch(sendAnswers(answers))
        }

    }, [currentQuestionIndex])

    // To stablize by default optionSelected as "No lo sé" if question isn't respond
    useEffect(() => {
        if (currentQuestion && (optionSelected === 0 || currentOption === 0)) {
            // By default is No lo sé option
            const defaultOption = currentQuestion.idO.find(item => item.option === 'No lo sé');
            if (defaultOption) {
                selectOption(defaultOption.idO);
                // assign option to currentOption
                dispatch(setOption(defaultOption.idO))
            }
        }
    }, [currentQuestion]);

    const fetchQuestions = async () => {
        try {
            if ((currentQuiz === undefined && currentQuizIndex != -1) || (currentQuiz === null && currentQuizIndex != -1)) {
                await dispatch(getQuizzesRandom()).unwrap()
            }
            else{
                await dispatch(getQuizUnOrderQuestions(currentQuiz.idQ)).unwrap()
            }
        } catch (e) {
            let error = `Error al mostrar las preguntas del quiz ${currentQuiz}. ${e}`
            toast.error(`Error al mostrar las preguntas del quiz ${currentQuiz}. ${e}`)

            // nav('/quiz/time-out-response/', { replace: true, state: error })
        }
    }

    useEffect(() => {
        dispatch(resetAnswers())
        dispatch(resetQuestions())
        setShow(true)
        fetchQuestions()
    }, [currentQuiz])

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

    if ((statusAnswer === 'failed' || statusQRandom === 'failed' || status === 'failed')) {
        return (
            < MyVerticallyCenteredModal
                // show={questions.length === 0 && dispatch(getInterestArea())} 
                show={show}
                // onHide={show}
                footerButtons={[
                    { label: 'Aceptar', type: 'button', variant: 'secondary', size: 'sm', onClick: () => {setShow(false); nav('/quiz')}},
                    { label: 'Reintentar', type: 'button', variant: 'primary', size: 'sm', onClick: retry }
                ]}
            >
                <h2>Error {statusRequest ?? 500}</h2>
                <div>
                    <p>{errorAnswer ?? error ?? errorQRandom}</p>
                </div>
            </MyVerticallyCenteredModal>
        )
    }

    // if (statusQRandom === 'failed' || (statusAnswer === 'failed')) {
    //     return nav('/quiz/time-out-response/', { replace: true, state: (statusQRandom ? errorQRandom : errorAnswers) })
    // }

    // // if the last question getSolutions
    if ((currentQuestionIndex === questions.length)) {
        return (
            < MyVerticallyCenteredModal
                // show={questions.length === 0 && dispatch(getInterestArea())}
                show={currentQuestionIndex === questions.length}
                // onHide={}
                footerButtons={
                    [
                        { label: 'Finalizar', type: 'button', variant: 'secondary', size: 'sm', onClick: finish },
                        { label: 'Hacer otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: otherQuiz, disabled: finishAll }]
                }
            >
                <h2>¡Enhorabuena Quiz completado!</h2>
                <div className="row align-items-center">
                    <p>Ha completado este cuestionario.
                        Si dispone de tiempo, puede participar en alguno de los otros cuestionarios disponibles.
                    </p>
                    <Row className='display-flex center text-center'>
                        {/* <p>Número de preguntas correctas:{corrects}</p>
                        <p>Número de preguntas incorrectas:{incorrects}</p> */}
                        <b>Aciertos:{(corrects / answers.length) * 100}%</b>
                    </Row>
                    <div id='results' className="row align-items-center">
                        <Row id='areas' className='display-flex center'>
                            <span>Áreas de interés a repasar:</span>
                            <ul>
                                {areas && areas.map((area, i) => {
                                    return (
                                        <li key={`area_${i}`}>{area.toString()}</li>
                                        // , <MyButton type='span'>{area.toString()}</MyButton>
                                    )
                                })}
                            </ul>
                        </Row>
                    </div>
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
                                            dispatch(setOption(e.target.value))
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