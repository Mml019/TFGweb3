import "../../../assets/styles/UserForm.css";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import React from "react";
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { yupSchema, academic_levels, level_PBE, loadCCAA, loadAllCities, loadNacionalities, loadCitiesByCCAA, perfil, profareas, sexs, activities, enviroments, training, sectors, descriptions, booleans } from "../../../schema/UserForm.js"
import FormControlFloatingLabel from "../../../components/forms/FormControl.jsx"
import FormInputGroup from "../../../components/forms/FormInputGroup.jsx";
import FormTable from "../../../components/forms/FormTable.jsx";
import SelectField from "../../../components/forms/FormSelectField.jsx";
import CheckBox from "../../../components/forms/FormCheck.jsx";
import OtherCheck from "../../../components/forms/OtherCheck.jsx";
import Spinner from "../../../components/Spinner.jsx";
import MyNavbar from "../../../components/navigation/MyNavbar.jsx";
import { useDispatch } from "react-redux";
import { createUser } from "../../../reduxToolkit/slices/user.js";
import { getQuizRandomAndList } from "../../../reduxToolkit/slices/quiz.js";

export default function UserForm() {
  const [loading, setLoading] = useState(true);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [nationalities, setNationalities] = useState([])
  const [ccaa, setCCAA] = useState([])
  const [ccaa_codes, setCCAAcode] = useState([])
  const [all_cities, setAllCities] = useState([])
  const [cities, setCities] = useState([])

  const basic_data = [
    { placeholder: "Sexo", label: "Sexo", type: "text", name: "sex" },
    { placeholder: 18, label: "Edad(años)", type: "number", name: "age" },
    { placeholder: "Nacionalidad", label: "Nacionalidad", type: "text", name: "nationality", },
    { placeholder: "Ciudad", label: "Ciudad de residencia", type: "text", name: "city", },
    { placeholder: "Provincia", label: "Provincia/Región", type: "text", name: "province", },
  ];

  const handleOnCheck = (name, checked) => {
    console.log(checkeds);
    // update dictionary
    setCheked((prev) => ({ ...prev, [name]: checked }));
  };

  // transform to capitalize a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function fetchAllData() {
  try {
    // setLoading(true)
    let [nationalitiesData, ccaaData, cities_all] = await Promise.all(
      [
        loadNacionalities(),
        loadCCAA(),
        loadAllCities()
      ])
    // let ccaa_name = []
    // let ccaa_codis = []
    // ccaaData.forEach((e) => {
    //   ccaa_name.push(e.nom_oficial)
    //   ccaa_codis.push(e.codi)
    // })

    // let cities_arr = (cities_all.map((e) => (e.nom)))

    setNationalities(nationalitiesData);
    // setCCAA(ccaa_name)
    // setCCAAcode(ccaa_codis)
    // setCities(cities_arr)
    // setAllCities(cities_all)
  } catch (err) {
    toast.error(`Use effect error${err.message}`)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  setLoading(true)
  if (loading) { fetchAllData() };
}, []);

const yupLoadData = yup.object({
  nationality: yup.string().oneOf(nationalities, "Debe seleccionar uno de los valores disponibles").required(),
  city: yup.string().oneOf(cities, "Debe seleccionar uno de los valores disponibles").required(),
  province: yup.string().oneOf(ccaa, "Debe seleccionar uno de los valores disponibles").required(),
  ...yupSchema.fields
})

const {
  register,
  // watch,
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    age: 18,
    sex: 'Femenino',
    nationality: 'Española',
    city: 'Palma',
    province: 'Illes Balears',
    level_PBE: '1',
    profile: 'Profesional',
    PBE_knownledge: "Sí",
    PBE_training: 'Bibliográfica',
    academic_level: 'Máster',
    description: "Oficial",
    year_academic_lvl: new Date().getFullYear(),
    speciality: '',
    profarea: ["Enfermería"],
    active_sas: "0",
    calm_sas: "0",
    fresh_sas: "0",
    happy_sas: "0",
    interest_sas: "0",
    satisfation: "0",
    //activity: '',
    activity: ["Asistencial", "Investigacion", "Docencia", "Administracion", "Otras(por favor, especifique)"],
    activity_val_0: "0",
    activity_val_1: "0",
    activity_val_2: "0",
    activity_val_3: "0",
    activity_val_4: "0",
    enviroment: ["Atención especializada"],
    other_env: "",
    sector: ["Privado"],
    other_sec: "",
    dedicationW: 5,
    supervisor: "Sí",
    years: 0,
  },
  // resolver: yupResolver(yupLoadData)
})

const master = useWatch({ name: 'academic_level', control })
const profesional = useWatch({ name: 'profile', control })
const PBE_knownledge = useWatch({ name: 'PBE_knownledge', control })
const arrActivities = useWatch({ name: 'activity', control });
const activitiesChecked = Array.isArray(arrActivities) ? arrActivities : arrActivities ? [arrActivities] : [];
const arrSectors = useWatch({ name: 'sector', control })
const otherSector = Array.isArray(arrSectors) ? arrSectors : arrSectors ? [arrSectors] : [];
const arrEnviroment = useWatch({ name: 'enviroment', control })
const otherEnviroment = Array.isArray(arrEnviroment) ? arrEnviroment : arrEnviroment ? [arrEnviroment] : [];

const onSubmit = async (data) => {
  setLoadingSpin(true);
  console.log("submit");
  console.log(data);
  console.log(JSON.stringify(data));

  // data.forEach(e => {
  //     if (typeof e === 'string') {
  //        e = JSON.stringify(e)
  //     } else if (typeof e === 'object' && Array.isArray(e)) {

  //         e.forEach((item, index) => {
  //             if (typeof item === 'string') {
  //                 e[index] = capitalize(item);
  //             }
  //         });
  //     }
  // })
  //POST to make User in database
  try {
    // JSON Stringify is in POST request in dispatcher
    // unwrap to manage request errors or payload
    const userCreated = await dispatch(createUser(data)).unwrap();
    console.log(userCreated);

    // put in localstorage user id
    localStorage.setItem('userCreated', JSON.stringify(userCreated));
    //get random quiz to show quiz
    quizList = await dispatch(getQuizRandomAndList()).unwrap();
    console.log(quizList)
    // navigate to question form
    nav("/quiz/questions/");

  } catch (err) {
    toast.error(`Error al crear el usuario y enviar el form. ${err}`)
  } finally {
    setLoadingSpin(false)
  }
}

if (loading) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Spinner animation="border" size="lg" />
      <p className="text-center">Cargando...</p>
    </div>
  )
}

return (
  <Container fluid id="user_form">
    <div id="header">
      <MyNavbar nameBrand={"Datos demográficos"}></MyNavbar>
    </div>
    <div id="content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="basic-data">
          <Row className="mb-3 align-items-center">
            <Row>
              <h2 className="section-form">Datos principales:</h2>
            </Row>
            <Col>
              {basic_data.map((e, index) => (
                <FormControlFloatingLabel
                  register={register}
                  errors={errors}
                  key={`basic_data_${index}`}
                  name={e.name}
                  label={e.label}
                  placeholder={e.label}
                  type={e.type}
                  value={index}
                />
              ))}
            </Col>
          </Row>
        </div>
        <Row className="mb-3 align-items-center">
          <Col>
            <div id="nacionalities">
              <SelectField
                name='nationality'
                ariaLabel='Nacionalidad'
                options={nationalities}
                register={register}
                errors={errors}
                onChange={handleSelect}
              />
            </div>
          </Col>
        </Row>
        <div id="level_PBE">
          <Row className="mb-3 pregunta">
            <h3 className="tittle-quest">
              ¿Qué nivel de conocimientos en práctica basada en la evidencia
              considera que tiene del 1 al 5? (1: mínimo y 5: muy elevado):
            </h3>
          </Row>
          <Row className="mb-3">
            <Col>
              {level_PBE.map((e, index) => (
                <CheckBox
                  inline
                  register={register}
                  errors={errors}
                  id={`level_PBE_${index}`}
                  key={`level_PBE_${e}`}
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
        <div id="profiles">
          <Row className="mb-3">
            <h3 className="tittle-quest">
              Seleccione el perfil que defina mejor su situación actual:
            </h3>
          </Row>
          <Row className="mb-3">
            <Col>
              {Object.entries(perfil).map(([key, val], index) => (
                <CheckBox
                  inline
                  register={register}
                  errors={errors}
                  id={`profile_${index}`}
                  key={`profile_${key}`}
                  name={"profile"}
                  type="radio"
                  label={val}
                  value={key}
                  index={index}
                //onChange={isTypeSelected}
                />
              ))}
            </Col>
          </Row>
        </div>
        <div id="profarea">
          <Row className="mb-3">
            <h3 className="tittle-quest">
              Selecciona tu área profesional, ya sea en ejercicio o en
              estudio:
            </h3>
          </Row>
          <Row className="mb-3">
            <Col>
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
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControlFloatingLabel
                register={register}
                errors={errors}
                key="speciality"
                // id={`basic_data_${index}`}
                name="speciality"
                label="Especialida(si procede)"
                placeholder="Especialidad(si procede)"
                type="text"
              //value={e.value}
              />
            </Col>
          </Row>
        </div>
        <div id="academic_level">
          <Row className="mb-3">
            <h3 className="tittle-quest">
              Especifique su mayor nivel académico obtenido: (si es estudiante
              de grado dejar en blanco){" "}
            </h3>
          </Row>
          <Row className="mb-3">
            <Col>
              {Object.entries(academic_levels).map(([key, val], index) => (
                <CheckBox
                  register={register}
                  errors={errors}
                  id={`academic_level_${index}`}
                  key={`academic_level_${index}`}
                  name={"academic_level"}
                  type="radio"
                  label={val}
                  value={key}
                  index={index}
                //onChange={isTypeSelected}
                //onCheck={handleOnCheck}
                />
              ))}
              {master === "Máster" && (
                <Row id="descriptions" className="mt-3">
                  <Row>
                    <h3 className="tittle-quest">
                      Si ha seleccionado Máster de que tipo:
                    </h3>
                  </Row>
                  <Col>
                    {descriptions.map((e, index) => (
                      <CheckBox
                        register={register}
                        errors={errors}
                        id={`description_${index}`}
                        key={`description_${e.type}`}
                        name={"description"}
                        type="radio"
                        label={e.label}
                        value={e.type}
                        index={index}
                      />
                    ))}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </div>
        <div id="year_academic_lvl">
          <Row className="mb-3">
            {/* <Form.Group
                as={Row}
                className="mb-3"
                controlId="academic_lvl_form"
              > */}
            <Form.Label column sm="6" className="pr-0 fw-bold">
              Año de obtención de dicho nivel académico obtenido:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="number"
                placeholder="Año(número)"
                {...errors["year_academic_lvl"]}
                name="year_academic_lvl"
                isInvalid={!!errors["year_academic_lvl"]}
                {...register("year_academic_lvl")}
                min={new Date().getFullYear() - 80}
                max={new Date().getFullYear() + 50}
              />
              {errors["year_academic_lvl"] && (
                <Form.Control.Feedback type="invalid">
                  {errors["year_academic_lvl"].message}
                  {/* {errors[name] && errors[name]?.message} */}
                </Form.Control.Feedback>
              )}
            </Col>
            {/* </Form.Group> */}
          </Row>
        </div>
        <div id="PBE_knownledge">
          <Row className="mb-3">
            <h3 className="tittle-quest">
              ¿Ha realizado usted algún tipo de formación específica en
              Práctica Basada en la Evidencia?{" "}
            </h3>
          </Row>
          <Row className="mb-3">
            <Col>
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
                // onChange={isTypeSelected}
                />
              ))}
            </Col>
          </Row>
          {PBE_knownledge === "Sí" && (
            <div id="PBE_training">
              <Row className="mb-3">
                <h3 className="tittle-quest">
                  En caso de que haya respondido de forma afirmativa a la
                  pregunta anterior, escoja la respuesta que considere más
                  adecuada teniendo en cuenta toda la formación que usted ha
                  recibido sobre este material;
                  {/* <br />  */}
                  tanto durante su carrera universitaria como también a lo
                  largo de toda su carrera profesional (formación continuada…)
                  <br />
                  <span>Seleccione una de las siguientes opciones:</span>
                </h3>
              </Row>
              <Row className="mb-3">
                <Col>
                  {Object.entries(training).map((e, index) => (
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
                </Col>
              </Row>
            </div>
          )}
        </div>
        <div id="satisfation_table">
          <Row>
            <h2 className="section-form">Satisfacción laboral (o académica):</h2>
          </Row>
          <Container>
            <Row>
              <FormTable register={register} errors={errors} />
            </Row>
            <Row>
              <Row>
                <h3 className="tittle-quest">
                  En una escala de 1 a 10, rodee el valor que representa el
                  grado de satisfacción que tiene con su trabajo (o estudio):
                </h3>
              </Row>
              <Row>
                <Col>
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
                </Col>
              </Row>
            </Row>
          </Container>
        </div>
        {/* Only show rest form for Profesional users*/}
        {profesional === "Profesional" && (
          <div id="profesional_area">
            <Row>
              <h2 className="section-form">Para profesionales:</h2>
            </Row>

            <Container>
              <div id="supervisor">
                <Row className="mb-3">
                  <h3 className="tittle-quest">
                    ¿Tiene usted o ha tenido funciones directivas, de mando
                    intermedio, o de supervisión?
                  </h3>
                </Row>
                <Row className="mb-3">
                  <Col>
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
                  </Col>
                </Row>
              </div>
              <div id="profesional_years">
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

              <div id="profesional_dedication">
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

              <div id="profesional_enviroments">
                <Row className="mb-3">
                  <h3 className="tittle-quest">
                    ¿En cuál de los siguientes entornos realiza usted la mayor
                    parte de su actividad profesional?{" "}
                  </h3>
                </Row>
                <Row className="mb-3">
                  <Col>
                    {enviroments.map((e, index) => (
                      <CheckBox
                        inline
                        register={register}
                        errors={errors}
                        id={`enviroments_${index}`}
                        key={`enviroments_${e}`}
                        name={"enviroment"}
                        type="checkbox"
                        label={e}
                        value={e}
                        index={index}
                      />
                    ))}
                    {otherEnviroment.includes("Otros") && (
                      <OtherCheck
                        name={"other_env"}
                        errors={errors}
                        register={register}
                      />
                    )}
                  </Col>
                </Row>
              </div>

              <div id="profesional_sectors">
                <Row className="mb-3">
                  <h3 className="tittle-quest">
                    ¿A qué sector pertenece su entorno de trabajo principal
                    actualmente?
                  </h3>
                </Row>
                <Row className="mb-3">
                  <Col>
                    {sectors.map((e, index) => (
                      <CheckBox
                        inline
                        register={register}
                        errors={errors}
                        id={`sectors_${index}`}
                        key={`sectors_${e}`}
                        name={"sector"}
                        type="checkbox"
                        label={e}
                        value={e}
                        index={index}
                      //onCheck={handleOnCheck}
                      />

                    ))}
                    {otherSector.includes("Otros") && (
                      <OtherCheck
                        name={"other_sec"}
                        errors={errors}
                        register={register}
                      />
                    )}
                  </Col>
                </Row>
              </div>

              <div id="profesional_activities">
                <Row className="mb-3">
                  <h3 className="tittle-quest">
                    Por favor, indique el porcentaje aproximado del tiempo
                    total de trabajo que invierte usted en cada tipo de
                    actividad en la actualidad:
                  </h3>
                  <span>(Recuerde: La suma debe ser igual a 100)</span>
                </Row>
                <Row className="mb-3">
                  <Col>
                    {activities.map((e, index) => (
                      <React.Fragment key={`activities_wrapped_${index}`}>
                        <CheckBox
                          register={register}
                          errors={errors}
                          id={`activity_${index}`}
                          key={`activity_${index}`}
                          name={"activity"}
                          type="checkbox"
                          label={e}
                          value={e}
                          index={index}
                        //onChange={updatedActivities}
                        />
                        {activitiesChecked.includes(e) && (
                          <FormInputGroup
                            register={register}
                            errors={errors}
                            // label={e}
                            name={`activity_val_${index}`}
                            key={`activity_val_${index}`}
                            index={index}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        )}
        <div className="d-flex justify-content-end pe-3">
          <Button type="submit" disabled={loadingSpin}>
            {loadingSpin ? <Spinner load={loadingSpin} /> : "Enviar"}
          </Button>
        </div>
      </form>
    </div>
  </Container>
);

};
