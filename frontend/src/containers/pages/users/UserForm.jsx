import "../../../assets/styles/UserForm.css";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import React from "react";
import toast from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LayoutUser from "../../../hocs/LayoutUser";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm, useWatch, Controller } from "react-hook-form";
import { replace, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { yupSchema, descriptionTypes, academic_levels, level_PBE, loadCCAA, loadAllCities, loadNacionalities, loadCitiesByCCAA, perfil, profareas, sexs, activities, enviroments, training, sectors, descriptions, booleans } from "../../../schema/UserForm.js"
import FormControlFloatingLabel from "../../../components/forms/FormControl.jsx"
import FormInputGroup from "../../../components/forms/FormInputGroup.jsx";
import FormTable from "../../../components/forms/FormTable.jsx";
import SelectField from "../../../components/forms/FormSelectField.jsx";
import CheckBox from "../../../components/forms/FormCheck.jsx";
import OtherCheck from "../../../components/forms/OtherCheck.jsx";
import Spinner from "../../../components/Spinner.jsx";
import MyNavbar from "../../../components/navigation/MyNavbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../reduxToolkit/slices/user.js";

export default function UserForm() {
  const [loading, setLoading] = useState(true);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const nav = useNavigate();
  const [nationalities, setNationalities] = useState([])
  const [provincia, setProv] = useState([])
  const [provincia_names, setProvname] = useState([])
  const [cities, setCities] = useState([])
  const [citiesAll, setCitiesAll] = useState([])
  const dispatch = useDispatch();
  let [total, setTotal] = useState(false)

  const { currentUser, statusUser, errorUser } = useSelector((state) => state.user)

  const basic_data = [
    { placeholder: "Sexo", label: "Sexo", type: "text", name: "sex" },
    { placeholder: 18, label: "Edad(años)", type: "number", name: "age" },
    // { placeholder: "Nacionalidad", label: "Nacionalidad", type: "text", name: "nationality", },
    // { placeholder: "Ciudad", label: "Ciudad de residencia", type: "text", name: "city", },
    // { placeholder: "Provincia", label: "Provincia/Región", type: "text", name: "province", },
  ];

  async function fetchAllData() {
    try {
      let [nationalitiesData, provinciaData, cities_all, balear_cities] = await Promise.all(
        [
          loadNacionalities(),
          loadCCAA(),
          loadAllCities(),
          // Load only Illes Balears towns
          loadCitiesByCCAA('municipios.xml', '07')
        ])
      let provincia_name = []
      let provincia_codis = []
      provinciaData.forEach((e) => {
        provincia_name.push(e.nom_oficial)
        provincia_codis.push(e.codi)
      })

      setNationalities(nationalitiesData);
      setProv(provinciaData)
      setProvname(provincia_name)
      setCities(balear_cities)
      setCitiesAll(cities_all)
    } catch (err) {
      toast.error(`Use effect error${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Load all data before showing the quiz
  useEffect(() => {
    setLoading(true)
    if (currentUser) {
      nav('/quiz/questions/')
      return toast.error('Ya ha rellenado un formulario de usuario continúe con las preguntas, por favor')
    } else if (loading) {
      fetchAllData()
    } else {
      if (statusUser === 'failed') {
        return nav('/quiz/time-out-response/')
      }
    };
  }, []);

  const yupLoadData = yup.object({
    nationality: yup.string().required("Debe seleccionar uno de los valores disponibles"),
    city: yup.string().required("Debe escribir una ciudad de residencia o seleccionar uno de los valores disponibles"),
    province: yup.string().required("Debe escribir o seleccionar una provincia o región"),
    // city: yup.string().when("nationality", {
    //   is: "Española",
    //   then: yup.string().oneOf(citiesAll, "Debe seleccionar uno de los valores disponibles").required(),
    //   otherwise: yup.string().required("Debe escribir una ciudad de residencia")
    // }),
    // province: yup.string().when("nationality", {
    //   is: "Española",
    //   then: yup.string().oneOf(provincia_names, "Debe seleccionar uno de los valores disponibles").required(),
    //   otherwise: yup.string().required("Debe escribir una provincia o región de residencia")
    // }),
    ...yupSchema.fields
  })

  const {
    register,
    // watch,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupLoadData),
    defaultValues: {
      age: 18,
      sex: 'Femenino',
      nationality: 'Española',
      city: 'Palma',
      province: 'Illes Balears',
      level_PBE: '1',
      profile: 'Profesional',
      PBE_knownledge: 'true',
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
      satisfation: "1",
      activity: ["Asistencial", "Investigación", "Docencia", "Administración", "Otra"],
      activity_val_0: 50,
      activity_val_1: 50,
      activity_val_2: 50,
      activity_val_3: 50,
      activity_val_4: 50,
      enviroment: ["Atención especializada"],
      other_env: "",
      sector: ["Privado"],
      other_sec: "",
      dedicationW: 5,
      supervisor: 'true',
      years: 0,
    },
    // Only executes validator when submits the form not in every render
    mode: 'onSubmit',
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
  const nationality = useWatch({ name: 'nationality', control })

  // return true if activities percentage sum more than 100%
  const not100 = () => {
    // Show message total sum 100 of percentage activity
    if (activitiesChecked !== undefined || activitiesChecked !== null || activitiesChecked.length !== 0) {
      console.log(activitiesChecked)
      const positions = activitiesChecked.map(act_check => activities.indexOf(act_check));
      getValues([''])
      let suma = 0
      let values = []
      for (let i = 0; i < positions.length; i++) {

        values.push(Math.round(parseFloat(getValues([`activity_val_${positions[i]}`])) * 100) / 100)
        suma += values[i]
      }
      // setTotal((suma <= 100 || suma <= 100.00))
      return ((suma !== 100 || suma !== 100.00))
    }
  }

  const onSubmit = (data) => {
    setLoadingSpin(true);
    // Show alert if sum total more than 100
    if (not100()) {
      setLoadingSpin(false)
      return toast.error("Deben sumar las actividades un total de 100% ni más ni menos")
    } else {
      // nav("/quiz/questions/");
      // POST to make User in database
      try {
        console.log(data)
        // JSON Stringify is in POST request in dispatcher
        // unwrap to manage request errors or payload
        dispatch(createUser(data));
        // put in localstorage user id is in REDUX not necessary
        // localStorage.setItem('userCreated', JSON.stringify(userCreated));
      } catch (err) {
        if (statusUser === 'failed') {
          nav('/quiz/error/', { replace: true })
        }
        toast.error(`Error ${err} al crear el usuario y enviar el form. ${err.message}`)
      } finally {
        setLoadingSpin(false)
      }
      // navigate to question form
      nav("/quiz/questions/");
      // nav('/quiz/questions/', { replace: true })
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
    <LayoutUser>
      {/* <div id="header"> */}
      <MyNavbar nameBrand={"Datos demográficos"}></MyNavbar>
      {/* </div> */}
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
                //onChange={(e)=>{ nationality = e.target.value}}
                // onChange={handleSelect}
                />
              </div>
            </Col>
          </Row>
          {
            nationality === 'Español' || nationality === 'Española'
              ?
              <>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <div id="provinces">

                      <SelectField
                        name='province'
                        ariaLabel='Provincia/Región'
                        options={provincia_names}
                        register={register}
                        errors={errors}
                        onChange={async (e) => {
                          if (e.target.value !== ('Seleccione una Provincia/Región')) {
                            let code = (provincia.find(item => item.nom_oficial === e.target.value)).codi
                            let arr = []
                            arr = await loadCitiesByCCAA('municipios.xml', code)
                            setCities(arr)
                          }
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <div id="cities">
                      <SelectField
                        name='city'
                        ariaLabel='Ciudad de residencia'
                        options={cities.length > 0 ? cities : all_cities}
                        register={register}
                        errors={errors}
                      />
                    </div>
                  </Col>
                </Row>
              </>
              :
              <>
                <Row className="mb-3 align-items-center">
                  <Col>
                    <div id="province">
                      <FormControlFloatingLabel
                        register={register}
                        errors={errors}
                        key={'pronvince_input'}
                        name={'province'}
                        label={'Provincia/Región'}
                        placeholder={'Provincia/Región'}
                        type={'text'}
                      />
                    </div>
                  </Col>
                </Row><Row className="mb-3 align-items-center">
                  <Col>
                    <div id="cities">
                      <FormControlFloatingLabel
                        register={register}
                        errors={errors}
                        key={'city_input'}
                        name={'city'}
                        label={'Ciudad de residencia'}
                        placeholder={'Ciudad'}
                        type={'text'}
                      />
                    </div>
                  </Col>
                </Row>
              </>
          }
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
                      {!!errors['description'] && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {errors['description'].message}
                        </Form.Control.Feedback>
                      )}
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
                    key={`PBE_knownledge_${index}`}
                    name={"PBE_knownledge"}
                    type="radio"
                    label={(e === true ? 'Sí' : 'No')}
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
                        id={`satisfation_${index + 1}`}
                        key={`satisfation_${index + 1}`}
                        name={"satisfation"}
                        type="radio"
                        label={index + 1}
                        value={index + 1}
                        index={index + 1}
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
                          label={(e === true ? 'Sí' : 'No')}
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
                      {!!errors['enviroment'] && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {errors['enviroment'].message}
                        </Form.Control.Feedback>
                      )}
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
                            // onChange = {(e) =>{

                            // }}
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
    </LayoutUser>
  );
}