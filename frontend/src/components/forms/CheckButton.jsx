import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

// this class is used to create radio or check buttons without validations
export default function CheckButtonInline(props) {

    return (<>

        <Form.Check
            {...props}
            type={props.type}
            id={`checkbox-id-${props.index}`}
            name={props.item.nameGroup}
            value={props.item.value}
            // label={item.label}

            checked={props.checked !== undefined ? props.checked : false}//{() => {checked[index] !== undefined ? checked[index] : false}}
            // not to call directly a funtion in render only referenced
            onChange={() => props.handleOnChange(index)}
            // isInvalid={checkedList[index] === false}

            // accesibility
            aria-labelledby='conditions'
            aria-placeholder={props.item.ariaPlace}
            aria-checked={props.checked !== undefined ? props.checked[props.index] : false}//{() => {checked[index] !== undefined ? checked[index] : false}}
            tabIndex={0}>

            <Form.Check.Input type={props.type} />
            {
                props.inicio !== undefined ?
                    (props.index == 0 ?
                        <Form.Check.Label><Link to="/quiz/conditions/instructions">{props.item.label}</Link></Form.Check.Label>
                        :
                        <Form.Check.Label><Link to="/quiz/conditions/etic">{props.item.label}</Link></Form.Check.Label>
                    ) :
                    <Form.Check.Label>{props.item.label}</Form.Check.Label>
            }
            <Form.Control.Feedback type="invalid">
                {props.item.invalidFeedback}
            </Form.Control.Feedback>
        </Form.Check>
    </>

    );
}

