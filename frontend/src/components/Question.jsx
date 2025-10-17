import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import CheckButton from './forms/CheckButton';
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import Timer from './Timer';
import MyButton from './MyButton';
import { useDispatch, useSelector } from 'react-redux';

function CardHeaderAndFooter({ item, opciones, bg='blue', border=bg }) {
        
    const handleClick(){
        
    }

    return (
        <Card className="text-center"
            bg={bg}
            key={item.idP}
            style={{ width: '18rem' }}
            border={border}
        >

            <Card.Header>
                <h1>Pregunta {item.numero}</h1>
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
                                <MyButton
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    Siguiente
                                </MyButton>
                            </Row>
                        </Col>
                        <Col xs={2}><IoMdArrowDropright onClick={handleClick} /></Col>
                    </Row>

                </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    );
}


