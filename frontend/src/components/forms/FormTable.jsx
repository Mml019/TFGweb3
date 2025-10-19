import { Table } from "react-bootstrap"
import CheckBox from "./FormCheck";

export default function FormTable({register, errors}) {
    const RANKING_VALUES = {
        'Nunca': 0,
        'De vez en cuando': 1,
        'Menos de la mitad del tiempo': 2,
        'Más de la mitad del tiempo': 3,
        'La mayor parte del tiempo': 4,
        'Todo el tiempo': 5,
    }

    const questions = {
        "Me he sentido alegre y de buen humor": "happy_sas",
        "Me he sentido tranquilo/a y relajado/a": "calm_sas",
        "Me he sentido activo/a y enérgico/a": "active_sas",
        "Me he sentido fresco/a y renovado/a": "fresh_sas",
        "Me he sentido interesado/a y motivado/a": "interest_sas"
    }

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Durante las últimas semanas, ¿cuánto tiempo…?</th>
                    {Object.entries(RANKING_VALUES).map((e, ind) => (
                        <th key={`rank_val_${ind}`}>
                            {e[0]}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {/* every row must be registered */}
                {Object.keys(questions).map((q, ind) => (
                    <tr key={`row_${ind}`}>
                        <td key={`question_${ind}`}>{q}</td>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <td key={q[1]}>
                                <CheckBox
                                    inline
                                    register={register}
                                    errors={errors}
                                    id={`${q[1]}_${RANKING_VALUES[index]}`}
                                    key={`${q[1]}_${RANKING_VALUES[index]}`}
                                    name={q[1]}
                                    type="radio"
                                    label={index}
                                    value={index}
                                    index={index}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                {/* <tr>
                    <td>Me he sentido tranquilo/a y relajado/a</td>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <td key={index}>
                            <CheckBox
                                inline
                                register={register}
                                errors={errors}
                                id={`calm_sas_${RANKING_VALUES[index]}`}
                                key={`calm_sas_${RANKING_VALUES[index]}`}
                                name={"calm_sas"}
                                type="radio"
                                label={index}
                                value={index}
                                index={index}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Me he sentido activo/a y enérgico/a</td>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <td key={index}>
                            <CheckBox
                                inline
                                register={register}
                                errors={errors}
                                id={`active_sas_${RANKING_VALUES[index]}`}
                                key={`active_sas_${RANKING_VALUES[index]}`}
                                name={"active_sas"}
                                type="radio"
                                label={index}
                                value={index}
                                index={index}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Me he sentido activo/a y enérgico/a</td>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <td key={index}>
                            <CheckBox
                                inline
                                register={register}
                                errors={errors}
                                id={`fresh_sas_${RANKING_VALUES[index]}`}
                                key={`fresh_sas_${RANKING_VALUES[index]}`}
                                name={"fresh_sas"}
                                type="radio"
                                label={index}
                                value={index}
                                index={index}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>Me he sentido activo/a y enérgico/a</td>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <td key={index}>
                            <CheckBox
                                inline
                                register={register}
                                errors={errors}
                                id={`interest_sas_${RANKING_VALUES[index]}`}
                                key={`interest_sas_${RANKING_VALUES[index]}`}
                                name={"interest_sas"}
                                type="radio"
                                label={index}
                                value={index}
                                index={index}
                            />
                        </td>
                    ))}
                </tr> */}
            </tbody>
        </Table>);
}

