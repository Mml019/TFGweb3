import { Form } from "react-bootstrap";
import { useState } from "react";

// this class is used to create radio or check buttons without validations
export default function CheckBox({
  label,
  onCheck,
  value,
  name,
  id,
  tabIndex,
  register,
  errors,
  ...rest
}) {
  return (
    <Form.Check
      type="checkbox"
      name={name}
      value={value}
      label={label}
      id={id}
      // checked={isChecked}
      //onChange={() => props.onChange(props.index)}
      aria-labelledby={label}
      aria-placeholder={label}
      // aria-checked={isChecked}
      tabIndex={tabIndex}
      role="checkbox"
      {...register(name)}
      {...rest}
      // if is here register funtion don't overwrite it
      //    onChange={handleOnChange}
      //    checked={isChecked}
    >
      {errors[name] && (
        <Form.Control.Feedback>{errors[name].message}</Form.Control.Feedback>
      )}
    </Form.Check>
  );
}
