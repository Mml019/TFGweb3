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
import { unwrapResult } from "@reduxjs/toolkit"
import MyNavbar from '../../../components/navigation/MyNavbar'

function UserQuiz() {
    const [loading, setLoading] = useState(true)
    const nav = useNavigate()
    const { questions, currentQuestion, currentQuestionIndex, status, error } = useSelector((state) => state.questionReducer)
    const { quiz_ids, currentQuiz, currentQuizIndex, statusQ, errorQ } = useSelector((state) => state.quizReducer)
    const { options } = useSelector((state) => state.optionReducer.options)
    //const {quiz} = 

    const dispatch = useDispatch()

    // to add prop to the button disable button if is final question
    const disabled = () => {
        if ((currentQuestion === questions.lenght) || (loading)) {
            return disabled
        }
    }

    function crearRespuesta() {
        // POST to data base with data
        
        nav('quiz/results', { replace: true })
    }

    function otroQuiz() {
        // POST to data base with data
        nav('quiz/results', { replace: true })
    }

    function handleClick() {
        if (currentQuestionIndex != questions.length - 1) {
            console.log('siguiente')
            dispatch(nextQuestion())
        }
    }

    useEffect(() => {
        if (status === 'idle') {
            setLoading(true)
        }

        if (currentQuiz === undefined || currentQuiz === null) {
            const fetchQuestions = async () => {
                try {
                    quiz_list = await dispatch(getQuizRandomAndList().unwrap())
                        .then(await dispatch(getQuizUnOrderQuestions(currentQuizIndex)).unwrap())
                }catch(e){
                    toast.error(`Error al mostrar las preguntas del quiz ${currentQuiz}. ${err}`)
                }
            }
        }
        fetchQuestions()
    },[]);

    return (
        <>
            {(loading === true) ? (<Spinner></Spinner>)
                :
                <Container fluid>
                    <div className="header">
                        <h1>{`Quiz ${'3'}`}</h1>
                    </div>
                    <div id='content'>
                        <Card className="text-center"
                            bg="blue"
                            key={item.idP}
                            style={{ width: '18rem' }}
                            border="blue"
                        >
                            <Card.Header>
                                <h1>{`Pregunta ${''} de ${''}`}</h1>
                                <Timer time={item.time}></Timer>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {item.statement}
                                </Card.Title>
                                <Card.Text>
                                    <Row>
                                        <Col xs={2}><IoMdArrowDropleft onClick={handleClick} /></Col>
                                        <Col xs={8}>
                                            <Row>
                                                {opciones.map((op, ind) => (
                                                    <CheckButton
                                                        type='radio'
                                                        item={op}
                                                        index={ind}
                                                        checked={false}
                                                        handleOnChange={handleOnChange} />
                                                ))}
                                            </Row>
                                            <Row>
                                                {(currentQuestion === questions.length - 1)
                                                    ?
                                                    (<Buttons
                                                        btns={
                                                            [{ label: 'Enviar y finalizar', type: 'button', variant: 'secondary', size: 'sm', onClick: { crearRespuesta } },
                                                            { label: 'Continuar con otro cuestionario', type: 'button', variant: 'primary', size: 'sm', onClick: { otroQuiz } }
                                                            ]
                                                        }
                                                    />)
                                                    : (<MyButton
                                                        type='submit'
                                                        className='btn btn-primary'
                                                        onClick={handleClick}
                                                        {...disabled}
                                                    >
                                                        Siguiente
                                                    </MyButton>)
                                                }
                                            </Row>
                                        </Col>
                                        <Col xs={2}><IoMdArrowDropright onClick={handleClick} /></Col>
                                    </Row>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>

                            </Card.Footer>
                        </Card>
                    </div>
                </Container>
            }
        </>
    );
}

export default UserQuiz;