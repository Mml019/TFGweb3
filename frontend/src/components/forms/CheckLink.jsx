import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// this class is used to create radio or check buttons without validations
export default function CheckButton(props) {
  return (
    <>
      <Form.Check {...props}>
        <Form.Check.Input
          type={props.type}
          onChange={() => props.onChange(props.index)}
          isValid={props.checked}
          checked={props.checked}
          aria-checked={props.checked}
        />
        {props.link ? (
          <Form.Check.Label>
            {/* create temporal status to mark checkbox if is accepted*/}
            <Link
              to={props.link}
              htmlFor={props.id}
              state={{ checkIndex: props.index }}
            >
              {props.label}
            </Link>
          </Form.Check.Label>
        ) : (
          <Form.Check.Label>
            {props.label} htmlFor={props.id}
          </Form.Check.Label>
        )}
        <Form.Control.Feedback type="invalid">
          {/* {props.invalidFeedback} */}
        </Form.Control.Feedback>
      </Form.Check>
    </>
  );
}
