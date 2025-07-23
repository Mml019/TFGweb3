import { useForm } from "react-hook-form"
import * as yup from "yup"

export default function Form() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function handleSubmit(data) {
        console.log(data)
    }

    return (
        <div >


        </div>
    );
}
