// export default function Table(){
//     return(

//     )
// };

import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function EncuestaForm () {
  // Usar React Hook Form para gestionar los datos del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <h3 className="mt-4">Encuesta de Satisfacción Laboral (o Académica)</h3>

      {/* Formulario */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="mt-4">Durante las últimas semanas, ¿cuánto tiempo...?</h5>
        
        {/* Pregunta 1 */}
        <Row>
          <Col md={6}>
            <Form.Label>Me he sentido alegre y de buen humor</Form.Label>
            <Row>
              {[...Array(5)].map((_, idx) => (
                <Col key={idx} sm={2}>
                  <Form.Check
                    type="radio"
                    label={['Nunca', 'De vez en cuando', 'Menos de la mitad del tiempo', 'Más de la mitad del tiempo', 'Todo el tiempo'][idx]}
                    value={idx}
                    {...register('alegria', { required: 'Este campo es obligatorio' })}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Pregunta 2 */}
        <Row>
          <Col md={6}>
            <Form.Label>Me he sentido tranquilo/a y relajado/a</Form.Label>
            <Row>
              {[...Array(5)].map((_, idx) => (
                <Col key={idx} sm={2}>
                  <Form.Check
                    type="radio"
                    label={['Nunca', 'De vez en cuando', 'Menos de la mitad del tiempo', 'Más de la mitad del tiempo', 'Todo el tiempo'][idx]}
                    value={idx}
                    {...register('tranquilidad', { required: 'Este campo es obligatorio' })}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Pregunta 3 */}
        <Row>
          <Col md={6}>
            <Form.Label>Me he sentido activo/a y enérgico/a</Form.Label>
            <Row>
              {[...Array(5)].map((_, idx) => (
                <Col key={idx} sm={2}>
                  <Form.Check
                    type="radio"
                    label={['Nunca', 'De vez en cuando', 'Menos de la mitad del tiempo', 'Más de la mitad del tiempo', 'Todo el tiempo'][idx]}
                    value={idx}
                    {...register('energia', { required: 'Este campo es obligatorio' })}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Pregunta 4 */}
        <Row>
          <Col md={6}>
            <Form.Label>Me he despertado fresco/a y descansado/a</Form.Label>
            <Row>
              {[...Array(5)].map((_, idx) => (
                <Col key={idx} sm={2}>
                  <Form.Check
                    type="radio"
                    label={['Nunca', 'De vez en cuando', 'Menos de la mitad del tiempo', 'Más de la mitad del tiempo', 'Todo el tiempo'][idx]}
                    value={idx}
                    {...register('descanso', { required: 'Este campo es obligatorio' })}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Pregunta 5 */}
        <Row>
          <Col md={6}>
            <Form.Label>Mi vida cotidiana ha estado llena de cosas que me interesan</Form.Label>
            <Row>
              {[...Array(5)].map((_, idx) => (
                <Col key={idx} sm={2}>
                  <Form.Check
                    type="radio"
                    label={['Nunca', 'De vez en cuando', 'Menos de la mitad del tiempo', 'Más de la mitad del tiempo', 'Todo el tiempo'][idx]}
                    value={idx}
                    {...register('interes', { required: 'Este campo es obligatorio' })}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Escala de satisfacción general */}
        <Row>
          <Col md={6}>
            <Form.Label>En una escala de 1 a 10, rodee el valor que representa su satisfacción:</Form.Label>
            <InputGroup>
              <FormControl
                as="input"
                type="number"
                min="1"
                max="10"
                {...register('gradoSatisfaccion', { required: 'Este campo es obligatorio' })}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Botón de envío */}
        <Button variant="primary" type="submit" className="mt-4">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};