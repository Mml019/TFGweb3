import { Children } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import Form from 'react-bootstrap/Form';

// this class is used to create radio or check buttons without validations
export default function CheckButton({ type = { checkbox }, items = []}) {
    // const [checked, setIsChecked] = useState(new Array(items.length).fill(false));

    // function handleOnChange() {
    //     pass
    // }

    return (
        items.map((item, index) => (
            <Form.Check 
                id={`checkbox-id-${index}`}
                type={type}
                
            >
                
            </Form.Check>
            
        ))

    )

}



