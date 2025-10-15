import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

// this class is used to create radio or check buttons without validations
export default function CheckButton(props) {

    return (<>

        <Form.Check
            {...props}
        >
            <Form.Check.Input
                type={props.type}
                onChange={() => props.onChange(props.index)}
                isValid={props.checked}
            />
            {
                props.inicio !== undefined ?
                    (props.index == 0 ?
                        <Form.Check.Label><Link to="/quiz/conditions/instructions">{props.label}</Link></Form.Check.Label>
                        :
                        <Form.Check.Label><Link to="/quiz/conditions/etic">{props.label}</Link></Form.Check.Label>
                    ) :
                    <Form.Check.Label>{props.label}</Form.Check.Label>
            }
            <Form.Control.Feedback type="invalid">

                {/* {props.invalidFeedback} */}
            </Form.Control.Feedback>
        </Form.Check >
    </>

    );
}

