import { Form, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// this class is used to create radio or check buttons without validations
export default function CheckBox({props, register, errors, ...rest}) {

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        console.log('cambio')
        setIsChecked(!isChecked);
    };
    return (

        <Form.Check
            {...register(props.name)}
            type='checkbox'
            id={props.id}
            name={props.name}
            value={props.value}
            label={props.label}
            checked={isChecked} 
            onChange={handleOnChange}
            //onChange={() => props.onChange(props.index)} 
            aria-labelledby={props.label}
            aria-placeholder={props.label}
            aria-checked={isChecked}
            tabIndex={props.tabIndex}
            role='checkbox'
            {...rest}
        
        >
        {errors[props.name] &&
        <Form.Control.Feedback>
            {errors[props.name].message}
        </Form.Control.Feedback>}
        </Form.Check>
        
    );
}

