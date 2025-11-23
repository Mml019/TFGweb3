import Form from 'react-bootstrap/Form';
import { Controller } from 'react-hook-form';

export default function SelectField({ name, ariaLabel, options = [], register, errors, onChange, control }) {
    return (

        <Form.Group>
            {onChange == null || onChange == undefined ?
                <Form.Select
                    name={name}
                    aria-label={ariaLabel}
                    isInvalid={!!errors[name]}
                    {...register(name)}

                >
                    <option value="">{`Seleccione una ${ariaLabel ? ariaLabel : 'opción'}`}</option>
                    {options.length > 0 && options.map((option, index) => (
                        <option
                            key={`${name}-option-${index}`}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                </Form.Select>
                : (
                        <Form.Select
                            name={name}
                            aria-label={ariaLabel}
                            isInvalid={!!errors[name]}
                            {...register(name)}
                            onChange={(e)=>onChange(e)}
                            // control = {control}                
                             >
                            <option value="">{`Seleccione una ${ariaLabel ? ariaLabel : 'opción'}`}</option>
                            {options.length > 0 && options.map((option, index) => (
                                <option
                                    key={`${name}-option-${index}`}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                )}
            {errors[name] &&
                <Form.Control.Feedback type={!!errors[name]}>{errors[name].message}</Form.Control.Feedback>
            }
        </Form.Group>
    );
}
