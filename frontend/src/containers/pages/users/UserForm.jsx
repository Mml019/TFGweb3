import { useEffect, useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { Form} from "react-bootstrap";

import * as yup from 'yup';
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form"
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'

import { yupSchema, academic_levels, level_PBE, loadAllCities, loadNacionalities, perfil, profareas, sexs } from "../../../schema/UserForm.js"
import FormControlFloatingLabel from "../../../components/forms/FormControl.jsx"
import SelectField from "../../../components/forms/FormSelectField.jsx"
import CheckBox from "../../../components/forms/FormCheck.jsx";
import { useDispatch } from "react-redux";
import { getQuizRandomAndList } from "../../../reduxToolkit/slices/quiz.js";
import EncuestaForm from '../../../components/EncuestaForm.jsx'

export default function UserForm() {
    const [loading, isLoading] = useState(true);
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [master, setMaster] = useState(false)
    const [profesional, setProfesional] = useState(false)
    const [PBE_knownledge, setPBE_knowledge] = useState(false)

    const basic_data = [
        { placeholder: "Sexo", label: "Sexo", type: "text", name: 'sex' },
        { placeholder: 18, label: "Edad(años)", type: "number", name: 'age' },
        { placeholder: "Nacionalidad", label: "Nacionalidad", type: "text", name: 'nationality' },
        { placeholder: "Ciudad", label: "Ciudad de residencia", type: "text", name: 'city' },
        { placeholder: "Provincia", label: "Provincia/Región", type: "text", name: 'province' }
    ]

    const descriptions = [
        { label: 'En investigación, innovación y/o práctica basada en la evidencia' },
        { label: 'Oficial (de 60-120 ECTS con trabajo de investigación que habilita el acceso al doctorado)' },
        { label: 'No oficial pero que incluya créditos relacionados con investigación, estadística…' },
        { label: 'No oficiales, exclusivamente profesionalizantes' }
    ]

    const booleans = ['Sí', 'No']

    // function to know if is master
    function isTypeSelected(e) {
        console.log(e.target.value)

        if (e.target.value === 'Master') {
            setMaster(true);
        }

        if(e.target.value === 'Profesional') {
            setProfesional(true)
        }

        if (e.target.value === 'Sí') {
            setPBE_knowledge(true)
        }
    }

    // transform to capitalize a string
    function capitalize(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
    }

    useEffect(() => {

        const fetchAllData = async () => {
            //     try {
            //         let nacionalities = await loadNacionalities();
            //         let ccaa = await loadCCAA();
            //         let cities = await loadAllCities();
            //         console.log(nacionalities)
            //         console.log(ccaa)
            //         console.log( JSON.parse({
            //             'nacionalities': nacionalities,
            //             'ccaa': ccaa,
            //             'cities': cities
            //         }))
            //     } catch (err) {
            //         toast.error(err)
            //     }
            // }
            // let data = fetchAllData();
            // console.log(data)
        }
    }, []);

    // const schema = yup.object({
    //     sex: yup.string().oneOf(sexs, 'Solo puede ser Femenino o Masculino').required(),
    //     age: yup.number().integer().max(120, 'No puede superar los 120 años').min(16, 'Debes tener al menos 16 años').required(),
    //     nacionality: yup.string(),//.oneOf(nacionalities, "Seleccione una de las ocpiones").required(),
    //     city: yup.string(),//.oneOf().required(),
    //     province: yup.string(),//.oneOf().required(),
    //     level_PBE: yup.number().positive().min(1, "Debe estar entre 1 y 5").max(5, "Debe estar entre 1 y 5").required(),
    //     profile: yup.string().oneOf(perfil, "Debe seleccionar entre Estudiante o Profesional de la salud").required(),
    //     // PBE_knownledge: yup.boolean().required(),
    //     // // PBE_training: yup.string().ondeOf().required(),
    //     // academic_level: yup.string().oneOf(academic_levels, 'Debe escoger entre Grado, Máster o Doctorado').required(),
    //     // speciality: yup.string().required(),
    //     // // profarea: yup.string().oneOf().required(),
    //     // satisfation: yup.number().integer().positive().min(1).max(10).required(),
    //     // // enviroment: yup.string().oneOf().required(),
    //     // // sector: yup.string().oneOf().required(),
    //     // // activity: yup.string().oneOf(),
    //     // supervisor: yup.boolean().required(),
    //     // dedicationW: yup.number().positive('No puede tener horas negativas').min(0).max(120).required(),
    //     // years: yup.number().integer().min(1).max(100).required()
    // });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            // age: 18,
            // sex: 'Femenino',
            // nationality: 'Española',
            // city: 'Palma',
            // province: 'Illes Balears',
            // level_PBE: '1',
            // profile: 'Estudiante',
            // PBE_knownledge: false,
            // PBE_training: '',
            // academic_level: 'Grado',
            // description: "",
            // year_academic_lvl: new Date().getFullYear,
            // speciality: '',
            // profarea: '',
            // satisfation: 5,
            // enviroment: '',
            // sector: '',
            // activity: '',
            // supervisor: false,
            // dedicationW: 48,
            // years: 5,
        },
        resolver: yupResolver(yupSchema)
    })

    const onSubmit = (data) => {
        console.log('submit')
        console.log(data)
        // data.forEach(e => {
        //     if (typeof e === 'string') {
        //         capitalize(e)
        //     } else if (typeof e === 'object' && Array.isArray(e)) {

        //         e.forEach((item, index) => {
        //             if (typeof item === 'string') {
        //                 e[index] = capitalize(item);
        //             }
        //         });
        //     }
        // })
        //POST to make Use in database
        // dispatch(createUser(data))

        // put in localstorage user id
        //get random quiz to show quiz
        // dispatch(getQuizRandomAndList());
        // navigate to question
        nav("/quiz/questions/")
    }

    return (
        <Container fluid>
            <div className="header">
                <h1>Datos demográficos</h1>
            </div>
            <div id="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='basic-data'>
                        <Row className="mb-3">
                            <Col>
                                {basic_data.map((e, index) => (
                                    <FormControlFloatingLabel
                                        register={register}
                                        errors={errors}
                                        key={`basic_data_${index}`}
                                        // id={`basic_data_${index}`}
                                        name={e.name}
                                        label={e.label}
                                        placeholder={e.label}
                                        type={e.type}
                                    //value={e.value}
                                    />
                                ))}
                            </Col>
                        </Row>
                    </div>
                    <div id='level_PBE'>
                        <Row className="mb-3">
                            <h2 className='tittle-quest'>
                                ¿Qué nivel de conocimientos en práctica basada en la evidencia considera que tiene del 1 al 5? (1: mínimo y 5: muy elevado):
                            </h2>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                {level_PBE.map((e, index) => (

                                    <CheckBox
                                        inline
                                        register={register}
                                        errors={errors}
                                        id={`level_pbe_${index}`}
                                        key={`level_pbe_${e}`}
                                        name={"level_PBE"}
                                        type="radio"
                                        label={e}
                                        value={e}
                                        index={index}
                                    // checked={checkedList[index]}
                                    // handleOnChange={handleOnChange}
                                    />
                                ))}
                            </Col>
                        </Row>
                    </div>
                    <div id='profiles'>
                        <Row className="mb-3">
                            <h2 className='tittle-quest'>
                                Seleccione el perfil que defina mejor su situación actual:
                            </h2>
                        </Row>
                        <Row className="mb-3">
                            <Col> {perfil.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`profile_${index}`}
                                    key={`profile_${e}`}
                                    name={"profile"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                    onChange={isTypeSelected}
                                />
                            ))}</Col>
                        </Row>
                    </div>
                    <div id='profarea'>
                        <Row className="mb-3">
                            <h2 className='tittle-quest'>
                                Seleccione el perfil que defina mejor su situación actual:
                            </h2>
                        </Row>
                        <Row className="mb-3">
                            <Col> {profareas.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`profarea_${index}`}
                                    key={`profarea_${e}`}
                                    name={"profarea"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                />
                            ))}</Col>
                        </Row>
                        <Row>
                            <FormControlFloatingLabel
                                register={register}
                                errors={errors}
                                key='speciality'
                                // id={`basic_data_${index}`}
                                name='speciality'
                                label='Especialida(si procede)'
                                placeholder='Especialidad(si procede)'
                                type='text'
                            //value={e.value}
                            />
                        </Row>
                    </div >
                    <div id='academic_level'>
                        <Row className="mb-3">
                            <h2 className='tittle-quest'>
                                Especifique su mayor nivel académico obtenido: (si es estudiante de grado dejar en blanco)                                </h2>
                        </Row>
                        <Row className="mb-3">
                            <Col> {academic_levels.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`academic_level${index}`}
                                    key={`academic_level${e}`}
                                    name={"academic_level"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                    onChange={isTypeSelected}
                                />
                            ))}</Col>
                            <div id='descriptions'>
                                {(master) && (descriptions.map((e, index) => (
                                    <CheckBox>
                                        inline
                                        register={register}
                                        errors={errors}
                                        id={`description_${index}`}
                                        key={`description_${e}`}
                                        name={"description"}
                                        type="radio"
                                        label={e.label}
                                        value={e.label}
                                        index={index}
                                    </CheckBox>)))
                                }
                            </div>
                        </Row>
                        <Row>
                            <Form.Group as={Row} className="mb-3" controlId="academic_lvl_form">
                                <Form.Label column sm="2">
                                    Año de obtención de dicho nivel académico obtenido:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type='number'
                                        placeholder='Año(número)'
                                        register={register}
                                        {...errors['year_academic_lvl']}
                                        name='year_academic_lvl'
                                        isInvalid={!!errors['year_academic_lvl']}
                                        {...register['year_academic_lvl']}
                                        min={new Date().getFullYear() - 80}
                                        max={new Date().getFullYear() + 20}
                                    />
                                    {errors['year_academic_lvl'] &&
                                        <Form.Control.Feedback type="invalid">
                                            {errors['year_academic_lvl'].message}
                                            {/* {errors[name] && errors[name]?.message}  */}
                                        </Form.Control.Feedback>}
                                </Col>
                            </Form.Group>
                        </Row>
                    </div >
                    <div id='profarea'>
                        <Row className="mb-3">
                            <h2 className='tittle-quest'>
                                ¿Ha realizado usted algún tipo de formación específica en Práctica Basada en la Evidencia?                            </h2>
                        </Row>
                        <Row className="mb-3">
                            <Col> {booleans.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`PBE_knownledge${index}`}
                                    key={`PBE_knownledge${e}`}
                                    name={"PBE_knownledge"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                    onChange={isTypeSelected}
                                />
                            ))}</Col>
                        </Row>
                    </div>
                    <EncuestaForm></EncuestaForm>
                    {/*<div id='profarea'>
                    <Row className="mb-3">
                        <h2 className='tittle-quest'>
                            Seleccione el perfil que defina mejor su situación actual:
                        </h2>
                    </Row>
                    <Row className="mb-3">
                        <Col> {profareas.map((e, index) => (
                            <CheckButton
                                key={index}
                                type="checkbox"
                                item={e}
                                index={index}
                                checked={checkedList[index]}
                                handleOnChange={handleOnChange}
                            />
                        ))}</Col>
                    </Row>
                    */}
                    <Button type="submit">Enviar</Button>
                    {/* <input type="submit" /> */}
                </form>
            </div >
        </Container >
    );
}
