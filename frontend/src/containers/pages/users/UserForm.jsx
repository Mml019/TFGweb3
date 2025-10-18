import { useEffect, useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from "react-bootstrap";

import * as yup from 'yup';
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form"
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'

import { yupSchema, academic_levels, level_PBE, loadAllCities, loadNacionalities, perfil, profareas, sexs, activities, enviroments, training } from "../../../schema/UserForm.js"
import FormControlFloatingLabel from "../../../components/forms/FormControl.jsx"
import FormInputGroup from "../../../components/forms/FormInputGroup.jsx";
import FormTable from "../../../components/forms/FormTable.jsx";
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

        if (e.target.value === 'Profesional') {
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
    //{`activity_${index}`}
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
        <Container fluid id='user_form'>
            <div className="header">
                <h1>Datos demográficos</h1>
            </div>
            <div id="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='basic-data'>
                        <Row className="mb-3">

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

                        </Row>
                    </div>
                    <div id='level_PBE'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                ¿Qué nivel de conocimientos en práctica basada en la evidencia considera que tiene del 1 al 5? (1: mínimo y 5: muy elevado):
                            </h3>
                        </Row>
                        <Row className="mb-3">

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

                        </Row>
                    </div>
                    <div id='profiles'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                Seleccione el perfil que defina mejor su situación actual:
                            </h3>
                        </Row>
                        <Row className="mb-3">
                            {perfil.map((e, index) => (
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
                            ))}
                        </Row>
                    </div>
                    <div id='profarea'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                Seleccione el perfil que defina mejor su situación actual:
                            </h3>
                        </Row>
                        <Row className="mb-3">
                            {profareas.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`profarea_${index}`}
                                    key={`profarea_${e}`}
                                    name={"profarea"}
                                    type="checkbox"
                                    label={e}
                                    value={e}
                                    index={index}
                                />))
                            }
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
                            <h3 className='tittle-quest'>
                                Especifique su mayor nivel académico obtenido: (si es estudiante de grado dejar en blanco)                                </h3>
                        </Row>
                        <Row className="mb-3">
                            {academic_levels.map((e, index) => (
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
                            ))}

                        </Row>
                        {(master) &&
                            <Row id='descriptions' className="mb-3">
                                {descriptions.map((e, index) => (
                                    <CheckBox
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
                                    />
                                ))}
                            </Row>
                        }
                    </div>
                    <div id='year_academic_lvl'>
                        <Row className="mb-3">
                            <Form.Group as={Row} className="mb-3" controlId="academic_lvl_form">
                                <Form.Label column sm="2">
                                    Año de obtención de dicho nivel académico obtenido:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type='number'
                                        placeholder='Año(número)'
                                        {...errors['year_academic_lvl']}
                                        name='year_academic_lvl'
                                        isInvalid={!!errors['year_academic_lvl']}
                                        {...register('year_academic_lvl')}
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
                    <div id='PBE_knownledge'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                ¿Ha realizado usted algún tipo de formación específica en Práctica Basada en la Evidencia?                            </h3>
                        </Row>
                        <Row className="mb-3">
                            {booleans.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`PBE_knownledge_${index}`}
                                    key={`PBE_knownledge_${e}`}
                                    name={"PBE_knownledge"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                    onChange={isTypeSelected}
                                />
                            ))}
                        </Row>
                        {(PBE_knownledge) &&
                            <div id="PBE_training">
                                <Row className="mb-3">
                                    <h3 className='tittle-quest'>
                                        ¿Ha realizado usted algún tipo de formación específica en Práctica Basada en la Evidencia?                            </h3>
                                </Row>
                                <Row className="mb-3">
                                    {training.entries.map((e, index) => (
                                        <CheckBox
                                            inline
                                            register={register}
                                            errors={errors}
                                            id={`PBE_training_${index}`}
                                            key={`PBE_training_${e[0]}`}
                                            name={"PBE_training"}
                                            type="radio"
                                            label={e[1]}
                                            value={e[0]}
                                            index={index}
                                        />
                                    ))}
                                </Row>
                            </div>
                        }
                    </div>
                    <div id='satisfation_table'>
                        <Container>
                            <Row>
                                <h2>Satisfacción laboral (o académica):</h2>
                            </Row>
                            <Row>
                                {/* <FormTable register={register} errors={errors} /> */}
                            </Row>
                            <Row>
                                <Row>
                                    <h3></h3>
                                </Row>
                                <Row>
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <CheckBox
                                            inline
                                            register={register}
                                            errors={errors}
                                            id={`satisfation_${index}`}
                                            key={`satisfation_${index}`}
                                            name={"satisfation"}
                                            type="radio"
                                            label={index}
                                            value={index}
                                            index={index}
                                        />
                                    ))}
                                </Row>
                            </Row>
                        </Container>
                    </div>
                    {/* Only show rest form for Profesional users */}
                    {(profesional) &&
                        <div id='profesional_area'>
                            <div id='supervisor'>
                                <Row className="mb-3">
                                    <h3 className='tittle-quest'>
                                        ¿Tiene usted o ha tenido funciones directivas, de mando intermedio, o de supervisión?
                                    </h3>
                                </Row>
                                <Row className="mb-3">
                                    {booleans.map((e, index) => (
                                        <CheckBox
                                            inline
                                            register={register}
                                            errors={errors}
                                            id={`supervisor_${index}`}
                                            key={`supervisor_${e}`}
                                            name={"supervisor"}
                                            type="radio"
                                            label={e}
                                            value={e}
                                            index={index}
                                        />
                                    ))}
                                </Row>
                            </div>
                        </div>
                    }
                    <div id='profesional_years'>
                        <Row className="mb-3">
                            <FormControlFloatingLabel
                                register={register}
                                errors={errors}
                                key="active_years"
                                // id={`basic_data_${index}`}
                                name="years" //active years from profesional
                                label="¿Cuántos años lleva usted en activo? (relacionado con la profesión sanitaria):"
                                placeholder=""
                                type="number"
                                min="0"
                                max="80"
                            //value={e.value}
                            />
                        </Row>
                    </div>
                    <div id='profesional_dedication'>
                        <Row className="mb-3">
                            <FormControlFloatingLabel
                                register={register}
                                errors={errors}
                                key="dedicationW"
                                // id={`basic_data_${index}`}
                                name="dedicationW" //active years from profesional
                                label="¿Cuál es su dedicación laboral semanal en horas en el momento actual?"
                                placeholder=""
                                type="number"
                                min="5"
                                max="150"
                            //value={e.value}
                            />
                        </Row>
                    </div>
                    <div id='profesional_enviroments'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                ¿En cuál de los siguientes entornos realiza usted la mayor parte de su actividad profesional?                            </h3>
                        </Row>
                        <Row className="mb-3">
                            {enviroments.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`enviroments_${index}`}
                                    key={`enviroments_${e}`}
                                    name={"enviroment"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                />
                            ))}
                        </Row>
                    </div>
                    <div id='profesional_sectors'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                ¿En cuál de los siguientes entornos realiza usted la mayor parte de su actividad profesional?                            </h3>
                        </Row>
                        <Row className="mb-3">
                            {enviroments.map((e, index) => (
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`sectors_${index}`}
                                    key={`sectors_${e}`}
                                    name={"sector"}
                                    type="radio"
                                    label={e}
                                    value={e}
                                    index={index}
                                />
                            ))}
                        </Row>
                    </div>
                    <div id='activities'>
                        <Row className="mb-3">
                            <h3 className='tittle-quest'>
                                Por favor, indique el porcentaje aproximado del tiempo total de trabajo que invierte usted en cada tipo de actividad en la actualidad:
                            </h3>
                            <span>(Recuerde: La suma debe ser igual a 100)</span>
                        </Row>
                        <Row className="mb-3">
                            {activities.map((e, index) => (
                                <FormInputGroup
                                    register={register}
                                    errors={errors}
                                    label={e}
                                    name={`activity_${index}`}
                                    key={`activity_${index}`}
                                    
                                />))}
                        </Row>
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </div >
        </Container >
    );
}
