import { useForm } from "react-hook-form"

function UserForm() {
    const {register, handleSubmit, formState: { errors },} = useForm()

    const onSubmit = (data) => console.log(data)
    
    return(
        <>
            
        </>
    );
    
}

export default UserForm;