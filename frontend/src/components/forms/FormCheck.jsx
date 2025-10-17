import { Form, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// this class is used to create radio or check buttons without validations
export default function CheckBox({label, value, name, id, tabIndex, register, errors, ...rest}) {

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        console.log('cambio')
        setIsChecked(!isChecked);
    };
    return (

        <Form.Check
            
            type='checkbox' 
            name={name}
            value={value}
            label={label}
            id={id}
            // checked={isChecked} 
            // onChange={handleOnChange}
            //onChange={() => props.onChange(props.index)} 
            aria-labelledby={label}
            aria-placeholder={label}
            // aria-checked={isChecked}
            tabIndex={tabIndex}
            role='checkbox'
            {...register(name)}
            {...rest}
        
        >
        {errors[name] &&
        <Form.Control.Feedback>
            {errors[name].message}
        </Form.Control.Feedback>}
        </Form.Check>
        
    );
}

