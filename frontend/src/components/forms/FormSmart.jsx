import { useForm } from "react-hook-form"
import { Children, createElement,cloneElement } from 'react';

export default function FormSmart({ children, onSubmit, defaultValues, resolver }) {
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     defaultValues: defaultValues,
    //     resolver: resolver
    // })
    // const methods = useForm({ defaultValues });
    // const { handleSubmit } = methods;

    const methods = useForm({
        resolver, // Yup resolver para validaciones
        defaultValues
    });

    const { handleSubmit } = methods;

    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)}>
                {Children.map(children, (child) => {
                    // Verificamos si el hijo tiene una propiedad 'name' y le pasamos 'register'
                    if (child.props.name) {
                        return cloneElement(child, {
                            // register, // Pasar la función register al hijo
                            // key: child.props.name,
                                ...child.props,
                                register: methods.register,
                                errors: methods.formState.errors[child.props.name],
                                key: child.props.name
                        });
                    }
                    return child; // Si no tiene 'name', lo dejamos tal cual
                })}
            </form>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                {Children.map(children, child => {
                    return child.props.name
                        ? createElement(child.type, {
                            ...{
                                ...child.props,
                                register: methods.register,
                                errors: methods.formState.errors[child.props.name],
                                key: child.props.name
                            }
                        })
                        : child;
                })}

            </form> */}
        </div>
    );
}
