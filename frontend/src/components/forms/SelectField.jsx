import Form from 'react-bootstrap/Form';

export default function SelectField(ariaLabel, options) {
    return (
        <Form.Group>
            <Form.Select aria-label={ariaLabel}>
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
