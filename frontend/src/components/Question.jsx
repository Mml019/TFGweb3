import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import CheckButtonInline from './forms/CheckButton';
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft} from "react-icons/io";
import Timer from './Timer';


function CardHeaderAndFooter(item, opciones, bg, border) {
       
    return (
        <Card className="text-center"
            bg={bg}
            key={item.idP}
            style={{ width: '18rem' }}
            border={border}
        >

            <Card.Header>
                <h1>Pregunta {item.numero}</h1>
                <Timer time={}></Timer>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {item.statement}
                </Card.Title>
                <Card.Text>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={8}> 
                        {opciones.map((op, ind)=>(
                            <CheckButtonInline type='radio' item={op} index={ind} checked={false} handleOnChange={handleOnChange}/>                        
                        ))}
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                   
                </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    );
}


