import { useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../../schema/UserForm.js"
import FormSmart from '../../../components/forms/FormSmart.jsx'
import yupSchema, { level_PBE, perfil, profareas } from "../../../schema/UserForm.js"
import FormControlFloatingLabel from "../../../components/forms/FormControl.jsx"
import SelectField from "../../../components/forms/FormSelectField.jsx"
import CheckButton from "../../../components/forms/CheckButton"

export default function UserForm() {
    const basic_data = [
        { placeholder: "Sexo", label: "Sexo", type: "text", value: " ", name: 'sex' },
        { placeholder: "Edad", label: "Edad(años)", type: "text", value: " ", name: 'age' },
        { placeholder: "Nacionalidad", label: "Nacionalidad", type: "text", value: " ", name: 'nationality' },
        { placeholder: "Ciudad", label: "Ciudad de residencia", type: "text", value: " ", name: 'city' },
        { placeholder: "Provincia", label: "Provincia/Región", type: "text", value: " ", name: 'province' }
    ]

    // transform to capitalize a string
    function capitalize(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
    }

    // useEffect(() => {
    //     console.log('Prueba' + nacionalities)
    //     const fetchAllData = async () => {
    //         try {
    //             let nacionalities = await loadNacionalities();
    //             let ccaa = await loadCCAA();
    //         } catch (err) {
    //             toast.error(err)
    //         }
    //     }
    //     fetchAllData();
    // }, []);


    const onSubmit = (data) => {
        console.log(data)
        //POST to make Use in database
    }


    return (
        <div id="content">
            <FormSmart onSubmit={onSubmit} resolver={yupResolver(yupSchema)}>
                <div id='basic-data'>
                    {basic_data.map((e, index) => (
                        <Row className="mb-3">
                            <Col xs={4}>
                                <FormControlFloatingLabel
                                    name={e.name}
                                    label={e.label}
                                    placeholder={e.label}
                                    type={e.type}
                                    value={e.value}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>
                <div id='level_PBE'>
                    <Row className="mb-3">
                        <h2 class='tittle-quest'>
                            ¿Qué nivel de conocimientos en práctica basada en la evidencia considera que tiene del 1 al 5? (1: mínimo y 5: muy elevado):
                        </h2>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            {level_PBE.map((e, index) => (
                                <CheckButton
                                    inline
                                    key={index}
                                    type="checkbox"
                                    item={e}
                                    index={index}
                                    checked={checkedList[index]}
                                    handleOnChange={handleOnChange}
                                />
                            ))}
                        </Col>
                    </Row>
                </div>
                <div id='profiles'>
                    <Row className="mb-3">
                        <h2 class='tittle-quest'>
                            Seleccione el perfil que defina mejor su situación actual:
                        </h2>
                    </Row>
                    <Row className="mb-3">
                        <Col> {perfil.map((e, index) => (
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

                </div >
                <div id='profarea'>
                    <Row className="mb-3">
                        <h2 class='tittle-quest'>
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
                    <Row className="mb-3">
                        
                    </Row>
                </div>
                <div id='profarea'>
                    <Row className="mb-3">
                        <Col>
                            <h2 class='tittle-quest'></h2>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col> </Col>
                    </Row>
                </div>
                <div id='profarea'>
                    <Row className="mb-3">
                        <Col>
                            <h2 class='tittle-quest'></h2>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col> </Col>
                    </Row>
                </div>
                <div id='profarea'>
                    <Row className="mb-3">
                        <Col>
                            <h2 class='tittle-quest'></h2>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col> </Col>
                    </Row>
                </div>
                <div id='profarea'>
                    <Row className="mb-3">
                        <Col>
                            <h2 class='tittle-quest'></h2>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col> </Col>
                    </Row>
                </div>
                <Button type="submit">Enviar</Button>
            </FormSmart>
        </div>
    );
}
