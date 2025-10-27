import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// this class is used to create radio or check buttons without validations
export default function OtherCheck({ name, register, errors }) {
  return (
    <Form.Group as={Row} controlId={`formGroup_otras_${name}`}>
      <Form.Label column sm="2">
        Especifique(separando por comas):
      </Form.Label>
      <Col sm="10">
        <Form.Control
          {...register(name)}
          type="text"
          placeholder={`otra1,otra2,otra3`}
        />
        {errors[name] && (
          <Form.Control.Feedback>{errors[name].message}</Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
}
