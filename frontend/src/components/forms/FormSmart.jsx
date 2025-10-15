import { useForm } from "react-hook-form"
import { Children, createElement } from 'react';

export default function Form( {children, onSubmit, defaultValues, resolver}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {defaultValues},
        resolver: {resolver}
    })
    // const methods = useForm({ defaultValues });
    // const { handleSubmit } = methods;

    return (
        <div >
            <Form onSubmit={handleSubmit({onSubmit})}>
            {Children.map(children, child => {
            return child.props.name
                ? createElement(child.type, {
                    ...{
                    ...child.props,
                    register: register,
                    errors: errors[child.props.name],
                    key: child.props.name
                    }
                })
                : child;
            })}
            
            </Form>
        </div>
    );
}
