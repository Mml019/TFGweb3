import Form from 'react-bootstrap/Form';

export default function SelectField({name, ariaLabel, options = [], register, errors}) {
    return (
        <Form.Group>
            <Form.Select
                name={name}
                aria-label={ariaLabel}
                isInvalid={!!errors[name]}
                 {...register(name)}
            >
                <option value="default">{`Seleccione una ${ariaLabel ? ariaLabel : 'opción'}`}</option>
                {options.length>0 && options.map((option, index) => (
                    <option
                        key={`${name}-option-${index}`}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </Form.Select>
            {/* {errors[name] &&
                <Form.Control.Feedback type={!!errors[name]}>{errors[name].message}</Form.Control.Feedback>
            } */}
        </Form.Group>
    );
}
