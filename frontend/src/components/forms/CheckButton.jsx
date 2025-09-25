import { useState } from 'react';
import Form from 'react-bootstrap/Form';

// this class is used to create radio or check buttons without validations
export default function CheckButton({ type = 'checkbox', item, index, checked, handleOnChange }) { 
    
   return (<>

        <Form.Check
            inline
            type={type}
            id={`checkbox-id-${index}`}
            name={item.nameGroup}
            value={item.value}
            label={item.label}

            checked={checked !== undefined ? checked : false}//{() => {checked[index] !== undefined ? checked[index] : false}}
            // not to call directly a funtion in render only referenced
            onChange={() => handleOnChange(index)}
            // isInvalid={checkedList[index] === false}

            // accesibility
            aria-labelledby='conditions'
            aria-placeholder={item.ariaPlace}
            aria-checked={checked !== undefined ? checked[index] : false}//{() => {checked[index] !== undefined ? checked[index] : false}}
            tabIndex={0}

        />
        <Form.Control.Feedback type="invalid">
            {item.invalidFeedback}
        </Form.Control.Feedback>
    </>

    );
}