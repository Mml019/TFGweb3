import { useForm } from "react-hook-form"
import FormControlFloatingLabel from "../../../components/forms/FormControl"
import SelectField from "../../../components/forms/SelectField"

function UserForm() {
    
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            age: 18,
            sex: "",
            nationality: "Española",
            city: "",
            province: "Illes Balears",
            level_PBE: "",
            PBE_knownledge: "",
            PBE_training: "",
            speciality: "",
            academic_level: "",
        }, resolver: yupSchema(schema),
    })

    const onSubmit = (data) => {
        console.log(data)

    }

    return (
        <div id="content">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="First Name" register={register} required />
                <Select label="Age" {...register("Age")} />
                <input type="submit" />
            </form>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    
                </Row>

                <Row className="mb-3">
                  
                </Row>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </div >
    );

}

export default UserForm;