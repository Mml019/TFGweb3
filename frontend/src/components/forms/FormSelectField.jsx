import Form from 'react-bootstrap/Form';

export default function SelectField(name, ariaLabel, options) {
    return (
        <Form.Group>
            <Form.Select  name={name} aria-label={ariaLabel}>
                {options.map((option, index) =>
                    <option
                        id={`${option.label}-option-${index}`}
                        value={option.value}
                        isInvalid={!!errors}>
                        {option.text}
                    </option>
                )}
            </Form.Select>
        </Form.Group>

    );
}
