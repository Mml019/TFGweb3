import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormControlFloatingLabel(label, sizeCol, type = text, placeholder = label, error) {
  return (
    <FloatingLabel
      as={Col}
      xs={sizeCol}
      controlId={`form-${label}`}
      label={label}>
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={!!error} />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </FloatingLabel>
  )
}
