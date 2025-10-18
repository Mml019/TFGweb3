import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function FormInputGroup({label, name, index, register, errors,...rest}) {
    
    return (
        <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox acompañado de texto, input y signo %" />
            <InputGroup.Text id={`activity_${index}`}>{label}</InputGroup.Text>
            <Form.Control
                id={`activity_input_${index}`}
                type='number'
                step="0.01"
                min="0"
                max="100"
                placeholder=""
                aria-label={label}
                aria-describedby={`activity_${index}`}
                //value={value}
                {...register(name)}
                isInvalid={!!errors[name]}
                aria-invalid={!!errors[name]}
                {...rest}
            />
            {errors[name] &&
                <Form.Control.Feedback type="invalid">
                    {errors[name].message}
                    {/* {errors[name] && errors[name]?.message}  */}
                </Form.Control.Feedback>}
            <InputGroup.Text id="percentage" >%</InputGroup.Text>
        </InputGroup>);
}