import { Children } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import Form from 'react-bootstrap/Form';

// this class is used to create radio or check buttons without validations
export default function CheckButton({ type = 'checkbox', items = [], checkedList, handleOnChange }) {
    return (
        
            <div className="mb-3">
                {items.map((item, index) => (
                    <div key={`checkbox-inline-${item.label}`}>
                        <Form.Check
                            inline
                            type={type}
                            id={`checkbox-id-${index}`}
                            name={item.nameGroup}
                            value={item.value}
                            label={item.label}

                            checked={checkedList[index]}
                            onChange={handleOnChange(index)}


                            // accesibility
                            aria-labelledby='conditions'
                            aria-placeholder={item.ariaPlace}
                            aria-checked={checkedList[index]}
                            tabIndex={0}
                        />
                        <Form.Control.Feedback isInValid>
                            {item.invalidFeedback}
                        </Form.Control.Feedback>
                    </div>
                ))}
            </div>
        
    );
}

//     <div id={`inline-${type}`} className="mb-3">
//         {items.map((item, index) => {
//             <Form>
//                 <Form.Check
//                     inline
//                     type={type}
//                     id={`checkbox-id-${index}`}
//                     name={item.nameGroup}
//                     value={item.value}
//                     label={item.label}

//                     checked={checked}
//                     onChange={handleOnChange(index)}


//                     // accesibility
//                     aria-labelledby='conditions'
//                     aria-placeholder={item.ariaPlace}
//                     aria-checked={checked}
//                     tabIndex={0}
//                 />
//                 <Form.Control.Feedback isValid='false'>
//                     {item.invalidFeedback}
//                 </Form.Control.Feedback>
//             </Form>
//         })}
//     </div>
// )
//}

//         <ul className="conditions">
//             {items.map((item, index) => {
//                 return (
//                     <li key={index}>
//                         <div className="mb-3">
//                             <Form.Check
//                                 inline
//                                 type={type}
//                                 id={`checkbox-id-${index}`}
//                                 name={item.nameGroup}
//                                 value={item.value}
//                                 label={item.label}

//                                 checked={checkedList[index]}
//                                 onChange={handleOnChange(index)}


//                                 // accesibility
//                                 aria-labelledby='conditions'
//                                 aria-placeholder={item.ariaPlace}
//                                 aria-checked={checkedList[index]}
//                                 tabIndex={0}
//                             />
//                             <Form.Control.Feedback isValid='false'>
//                                 {item.invalidFeedback}
//                             </Form.Control.Feedback>
//                         </div>
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// }



