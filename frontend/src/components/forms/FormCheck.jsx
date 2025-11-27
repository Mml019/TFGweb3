import { Form } from "react-bootstrap";

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
    <>
      <Form.Check
        type="checkbox"
        name={name}
        value={value}
        label={label}
        id={id}
        // checked={isChecked}
        //onChange={() => props.onChange(props.index)}
        aria-labelledby={id}
        aria-placeholder={label}
        // aria-checked={isChecked}
        tabIndex={tabIndex}
        role="checkbox"
        isInvalid={!!errors[name]}
        aria-invalid={!!errors[name]}
        {...register(name)}
        {...rest}
      // if is here register funtion don't overwrite it
      //    onChange={handleOnChange}
      //    checked={isChecked}
      >
      {/* To show error from every check */}
      </Form.Check>
      {!!errors[name] &&  (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errors[name].message}
        </Form.Control.Feedback>
      )}
    </>
  );
}
