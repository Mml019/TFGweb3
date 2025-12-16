import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// this class is used to create radio or check buttons without validations
export default function OtherCheck({ name, register, errors}) {
  return (
    <Form.Group controlId={`formGroup_${name}`} className="mt-3">
      <Form.Label className="fw-bold">
        Especifique opciones(separadas por comas):
      </Form.Label>
        <Form.Control       
          type="text"
          placeholder={`otra1, otra2, otra3`}
          isInvalid = {!!errors[name]}
          {...register(name)}
          // {...rest}
        />
         {console.log(errors[name])}
        {!!errors[name] && (
          <Form.Control.Feedback type="invalid">{errors[name].message}</Form.Control.Feedback>
        )}
    </Form.Group>
  );
}
