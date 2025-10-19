import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function FormControlFloatingLabel({ label, type = "text", placeholder = label, name, value, register, errors, ...rest }) {
  return (
      <FloatingLabel
        controlId={name}
        label={label}>
        <Form.Control
          type={type}
          //value={value}
          placeholder={placeholder}
          {...register(name)}
          //isInvalid={!!error}
          isInvalid={!!errors[name]}
          aria-invalid={!!errors[name]}
          {...rest}
          className='mb-3'
          size='sm'
        />
        {errors[name] &&
          <Form.Control.Feedback type="invalid">
            {errors[name].message}
            {/* {errors[name] && errors[name]?.message}  */}
          </Form.Control.Feedback>}
      </FloatingLabel>
  )
}
