import * as yup from "yup";
import toast from "react-hot-toast";

//---------- VARIABLES -----------

export const enviroments = [
  "Atención especializada",
  "Atención Primaria/ domiciliaria",
  "Centro sociosanitario",
  "Sistema escolar",
  "Universidad",
  "Consulta propia",
  "Otros"
];
export const sectors = [
  "Público",
  "Privado",
  "Centro concertado o mixto",
  "Otros"
];
export const activities = [
  "Asistencial",
  "Investigación",
  "Docencia",
  "Administración",
  "Otra"
];

// export const activity_dic = {
//   "Asistencial": 0,
//   "Investigación": 0,
//   "Docencia": 0,
//   "Administración": 0,
//   "Otra": 0
// }

export const training = {
  Bibliográfica:
    "Formación sobre búsqueda bibliográfica en bases de datos electrónicas o similar, y en general cursos introductorios.",
  Metodológica:
    "Además de lo anterior, formación en introducción a la metodología de investigación: formulación de la pregunta de investigación, lectura crítica de artículos científicos, e interpretación de resultados estadísticos.",
  Investigación:
    "Además de lo anterior, formación avanzada en investigación: implementación de diseños de investigación, estadística y manejo de software informático, escritura de artículos científicos, etc.",
};
export const academic_levels = {
  Grado: "Grado/Licenciatura-Diplomatura",
  Máster: "Máster (Programa de ≥ 60 ECTS con evaluación y proyecto final)",
  Doctorado: "Doctorado",
};

export const descriptions = [
  { label: 'En investigación, innovación y/o práctica basada en la evidencia', type: 'Investigación' },
  { label: 'Oficial (de 60-120 ECTS con trabajo de investigación que habilita el acceso al doctorado)', type: 'Oficial' },
  { label: 'No oficial pero que incluya créditos relacionados con investigación, estadística…', type: 'No oficial con créditos en investigación' },
  { label: 'No oficiales, exclusivamente profesionalizantes', type: 'No oficial, profesionalizante' }
]

export const descriptionTypes = descriptions.map((desc) => (desc.type))

export const booleans = [true, false]

export const sexs = ["Femenino", "Masculino"];
export const profareas = [
  "Psicología",
  "Enfermería",
  "Fisioterapia",
  "Medicina",
  "Terapia Ocupacional",
  "Logopedia",
  "Veterinaria",
  "Farmacia",
  "Biología",
  "Dietética y Nutrición"
];
export const perfil = {
  Estudiante: "Estudiante de grado de ciencias de la salud",
  Profesional: "Profesional de ciencias de la salud",
};
export const level_PBE = [1, 2, 3, 4, 5];

// Returns tipish nacionalities from txt the other txt has 1
export function loadNacionalities(nameFile = "nacionalidad.txt") {
  if (!nameFile.endsWith("txt")) {
    return toast.error("El fichero debe ser un tipo txt");
    // return toast.error("El fichero debe ser un tipo txt")
  }

  let dirName = "/data";
  dirName += `/${nameFile.split(".").pop()}/${nameFile}`;
  return fetch(dirName)
    .then((response) => {
      if (!response.ok) {
        console.log(`Error al recibir respuesta status ${response.status}`);
        return toast.error(
          `Error al recibir respuesta status ${response.status}`
        );
      }
      return response.text();
    })
    .then((data) => {
      let mi_array = [];
      mi_array = data.split("\r\n");
      return Promise.resolve(mi_array);
    })
    .catch((error) => {
      console.log(
        `Error: ${error}.\n No se encuentra el fichero ${nameFile} en ${dirName}`
      );
      return toast.error(
        `Error: ${error}.\n No se encuentra el fichero ${nameFile} en ${dirName}`
      );
    });
}

// Provide a nameFile and returns an array of dictionary objects {nom_oficial: Mallorca, codi: 07 }
export function loadCCAA(nameFile = "CCAA.xml") {
  if (!nameFile.endsWith("xml")) {
    console.log("El fichero debe ser un tipo xml");
    return toast.error("El fichero debe ser un tipo xml");
  }

  let dirName = "/data";
  dirName += `/${nameFile.split(".").pop()}/${nameFile}`;
  return fetch(dirName)
    .then((response) => {
      if (!response.ok) {
        console.log(`Error al recibir respuesta status ${response.status}`);
        return toast.error(
          `Error al recibir respuesta status ${response.status}`
        );
      }
      return response.text();
    })
    .then((str) => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(str, "application/xml");
      let rows = xml.getElementsByTagName("row");
      let CCAA = [];

      Array.from(rows).forEach((row) => {
        let ccaa = {};
        ccaa["nom_oficial"] = row.querySelector("nom_oficial").textContent;
        ccaa["codi"] = row.querySelector("codi").textContent;

        CCAA.push(ccaa);
      });
      return Promise.resolve(CCAA);
    })
    .catch((err) => {
      console.log(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
      return toast.error(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
    });
}

// Return an array of dictionary of all cities {nom: Sineu, codi_prov_ncia:07 } if pass a nameFile
export function loadAllCities(nameFile = "municipios.xml") {
  if (!nameFile.endsWith("xml")) {
    console.log("El fichero debe ser un tipo xml");
    return toast.error("El fichero debe ser un tipo xml");
  }

  let dirName = "/data";
  dirName += `/${nameFile.split(".").pop()}/${nameFile}`;
  return fetch(dirName)
    .then((response) => {
      if (!response.ok) {
        console.log(`Error al recibir respuesta status ${response.status}`);
        return toast.error(
          `Error al recibir respuesta status ${response.status}`
        );
      }
      return response.text();
    })
    .then((str) => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(str, "application/xml");
      let rows = xml.getElementsByTagName("row");
      let cities = [];

      Array.from(rows).forEach((row) => {
        let city = {};
        city = row.querySelector("nom").textContent;
        // city["codi_prov"] = row.querySelector("codi_prov_ncia").textContent;

        cities.push(city);
      });
      return Promise.resolve(cities);
    })
    .catch((err) => {
      console.log(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
      return toast.error(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
    });
}

// CCAA.xml codi == codi_prov_ncia municipios.xml
export function loadCitiesByCCAA(nameFile = "municipios.xml", code) {
  if (!nameFile.endsWith("xml")) {
    console.log("El fichero debe ser un tipo xml");
    return toast.error("El fichero debe ser un tipo xml");
  }

  let dirName = "/data";
  dirName += `/${nameFile.split(".").pop()}/${nameFile}`;

  return fetch(dirName)
    .then((response) => {
      if (!response.ok) {
        console.log(`Error al recibir respuesta status ${response.status}`);
        return `Error al recibir respuesta status ${response.status}`;
      }
      // this return is catched by the other then
      return response.text();
    })
    .then((str) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, "application/xml");
      const rows = xml.getElementsByTagName("row");
      // cities_code = xml.getElementsByTagName("row[codi_prov_ncia]=04");

      let cities = [];
      Array.from(rows).forEach((row) => {
        let city = {};
        if (row.querySelector("codi_prov_ncia").textContent == code) {
          city = row.querySelector("nom").textContent;
          //console.log(row.querySelector("nom").textContent)
          // city["cp"] = row.querySelector("codi").textContent;
          cities.push(city);
        }
      });
      return Promise.resolve(cities);
    })
    .catch((err) => {
      console.log(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
      return toast.error(
        `Error en fetch ${err} del fichero ${nameFile} ruta ${dirName}`
      );
    });
}

// -------------------- SCHEMA --------------
// const activities_schema = yup.object({
//   activity_val_0: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0).max(100),
//   activity_val_1: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0).max(100),
//   activity_val_2: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0).max(100),
//   activity_val_3: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0).max(100),
//   activity_val_4: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0).max(100),
// }).test(
//     'sumar-100',
//     'La suma de los valores debe ser 100',
//     (val) =>{
//       console.log(val)
//       const { activity_val_0, activity_val_1, activity_val_2, activity_val_3, activity_val_4 } = val;
//       const total = activity_val_0 + activity_val_1 + activity_val_2 + activity_val_3 + activity_val_4;
//       console.log("Suma total:", total);
//       return total <= 100 || total <=100.00;
//     }
//   );

export const yupSchema = yup.object({
  sex: yup.string("Debe escribir su sexo").oneOf(sexs, "Solo puede ser Femenino o Masculino").required("Debe escribir su sexo"),
  age: yup.number("Debe ser un número").transform(v => isNaN(v) ? 0 : v).integer().max(120, "No puede superar los 120 años").min(16, "Debes tener al menos 16 años").required("Debe escribir su edad en números"),
  level_PBE: yup.number("Debe ser un número del 1 al 5").transform(v => isNaN(v) ? 1 : v).positive().min(1, "Debe estar entre 1 y 5").max(5, "Debe estar entre 1 y 5").required("Debe seleccionar una de las opciones."),
  profile: yup.string("Debe ser un texto").oneOf(Object.keys(perfil), "Debe seleccionar entre Estudiante o Profesional de la salud").required("Debe seleccionar entre Estudiante o Profesional de la salud"),
  speciality: yup.string("Deber se un texto").notRequired(),
  profarea: yup.array().of(yup.string().oneOf(profareas), "Debe seleccionar").required().min(1, "Debe seleccionar al menos una area profesional o de estudio, pueden ser varias"),
  PBE_knownledge: yup.boolean("Deber ser un valor true o false").required("Debe contestar Sí o No"),
  PBE_training: yup.string("Debe ser un texto")
    .when('PBE_knownledge', {
      is: (val) => val && val != 'false',
      then: schema => schema
        .oneOf(Object.keys(training), "Debe seleccionar una de las opciones si marcó sí en la regunta anterior")
        .required("Debe seleccionar una de las opciones si marcó sí en la regunta anterior"),
      // .test('hasPBE_knowledge', "Debe seleccionar una de las opciones si marcó sí en la regunta anterior",
      //     (val)=>{
      //       return Object.keys(training).includes(val)
      //     }
      //   ),
      otherwise: schema => schema.notRequired()
    }),
  academic_level: yup.string("Debe ser un texto")
    .when('hasAcademic',
      {
        is: (val) => val && val != undefined,
        then: schema => schema.required(`Debe escoger entre ${Object.keys(academic_levels)}`),
        otherwise: schema => schema.notRequired()
      }),
  // .test('hasAcademic', `Debe escoger entre ${Object.keys(academic_levels)}`,
  //   (val) => {
  //     if (val !== undefined) {
  //       return (Object.keys(academic_levels).includes(val))
  //     }
  //     return true
  //   }),
  description: yup.string().when('academic_level', {
    is: (val) => val && val == 'Máster',
    then: schema => schema.oneOf(descriptionTypes, `Debe escoger entre ${descriptionTypes}`).required(`Debe escoger entre ${descriptionTypes}`),
    otherwise: schema => schema.notRequired()
  }),
  year_academic_lvl: yup
    .number("Debe ser un número")
    .transform(v => isNaN(v) ? undefined : v)
    .integer("Debe ser un año válido")
    .when('academic_level', {
      is: (val) => val && val !== '',
      then: schema =>
        schema
          .required("Debe indicar el año del nivel académico")
          .test(
            "min",
            `Debe ser mayor a ${new Date().getFullYear() - 80}`,
            val => val >= new Date().getFullYear() - 80
          )
          .test(
            "max",
            `Debe ser menor a ${new Date().getFullYear() + 50}`,
            val => val <= new Date().getFullYear() + 50
          ),
      otherwise: schema => schema.notRequired(),
    }),
  satisfation: yup.number("Debe valorar su satisfacción entre 1 y 10").transform(v => isNaN(v) ? 1 : v).integer().positive()
    .min(1, "Debe valorar su satisfacción entre 1 y 10")
    .max(10, "Debe valorar su satisfacción entre 1 y 10")
    .required("Debe valorar su satisfacción entre 1 y 10"),
  active_sas: yup.number("Debe valorar su satisfacción entre 0 y 5").transform(v => isNaN(v) ? 0 : v).integer().positive().min(0).max(5).required("Debe valorar su satisfacción entre 0 y 5"),
  calm_sas: yup.number("Debe valorar su satisfacción entre 0 y 5").transform(v => isNaN(v) ? 0 : v).integer().positive().min(0).max(5).required("Debe valorar su satisfacción entre 0 y 5"),
  fresh_sas: yup.number("Debe valorar su satisfacción entre 0 y 5").transform(v => isNaN(v) ? 0 : v).integer().positive().min(0).max(5).required("Debe valorar su satisfacción entre 0 y 5"),
  happy_sas: yup.number("Debe valorar su satisfacción entre 0 y 5").transform(v => isNaN(v) ? 0 : v).integer().positive().min(0).max(5).required("Debe valorar su satisfacción entre 0 y 5"),
  interest_sas: yup.number("Debe valorar su satisfacción entre 0 y 5").transform(v => isNaN(v) ? 0 : v).integer().positive().min(0).max(5).required("Debe valorar su satisfacción entre 0 y 5"),
  activity: yup.array().when('profile', {
    is: val => val === 'Profesional',
    then: schema => schema.min(1, "Debe seleccionar una actividad").required(),
    //.of(yup.string().oneOf(activities, "Debe seleccionar al menos una actividad o marcar otros")).required("Debe seleccionar al menos una actividad o marcar otros"),
    otherwise: schema => schema.notRequired()
  }),
  activity_val_0: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0, "Mínimo 0%").max(100, "Máximo 100%"),
  activity_val_1: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0, "Mínimo 0%").max(100, "Máximo 100%"),
  activity_val_2: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0, "Mínimo 0%").max(100, "Máximo 100%"),
  activity_val_3: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0, "Mínimo 0%").max(100, "Máximo 100%"),
  activity_val_4: yup.number().transform(v => isNaN(v) ? 0 : ((parseFloat(v) * 100) / 100) || 0).min(0, "Mínimo 0%").max(100, "Máximo 100%"),
  sector: yup.array().of(yup.string().oneOf(sectors, "Debe seleccioanr mínimo un sector o especificar otros"))
    .when('profile', {
      is: val => val && val === 'Profesional',
      then: schema => schema
        .required("Debe seleccionar mínimo un sector o especificar otros").min(1, "Debe seleccionar al menos un sector"),
      otherwise: schema => schema.notRequired()
    }),
  other_sec: yup
    .string("Debe ser texto")
    .when('sector', {
      is: (sector) => sector.includes('Otros'),
      then: schema => schema
        .required("Debe incluir otros sectores")
        .matches(
          /^([A-Za-z][a-z]*)(\s?,\s?([A-Za-z][a-z]*))*$/,
          "Debe incluir sectores separados por comas, "
        ),
      otherwise: schema => schema.notRequired(),
    }),
  enviroment: yup.array().of(yup.string().oneOf(enviroments, "Debe seleccionar a menos un entorno o especifar otros"))
    .when('profile', {
      is: val => val && val === 'Profesional',
      then: schema => schema
        .required("Debe seleccionar a menos un entorno o especifar otros").min(1, "Debe seleccionar al menos un entorno"),
      otherwise: schema => schema.notRequired()
    }),
  other_env: yup.string()
    .when('enviroment', {
      is: (env) => env.includes('Otros'),
      then: schema => schema
        .required("Debe incluir otros entornos")
        .matches(
          /^([A-Za-z][a-z]*)(\s?,\s?([A-Za-z][a-z]*))*$/,
          'Debe incluir entornos separados por comas',
        ),
      otherwise: schema => schema.notRequired(),
    }),
  supervisor: yup.boolean().when('profile', {
    is: (val) => val && val === 'Profesional',
    then: schema => schema.required("Debe responder Sí o No"),
    otherwise: schema => schema.notRequired()
  }),
  dedicationW: yup.number("Debe ser un número").transform(v => isNaN(v) ? undefined : v)
    .when('profile', {
      is: val => val && val === 'Profesional',
      then: schema => schema.required("Debe completar la dedicación en horas")
        .positive('Mayor a 0')
        .integer('Sin decimales')
        .test('isPositiveDed', 'Debe ser mayor o igual a 0', val => val >= 0),
      // .positive('Debe ser mayor a 0')
      // .integer('Sin decimales').test('', 'Debe ser mayor o igual a 0', val => val > 0),
      // .matches(val => /^\d+(\.\d{1,2})?$/, 'Puede poner un número separado por punto y 2 decimales máximo',)
      otherwise: schema => schema.notRequired()
    }),
  years: yup.number("Debe ser un número").transform(v => isNaN(v) ? undefined : v)
    .positive('Mayor a 0')
    // .integer('Sin decimales')
    // .test('isGreater', 'Debe ser mayor o igual a 0', val => val > 0)
    // .transform(v => isNaN(v) ? undefined : v)
    .when('profile', {
      is: val => val && val === 'Profesional',
      then: schema => schema.required("Debe completar los años en activo")
        // .positive('Mayor a 0')
        .integer('Sin decimales')
        .test('isPositive', 'Debe ser mayor o igual a 0', val => val >= 0),
      // .transform(v => isNaN(v) ? undefined : v),
      // .positive('Debe ser mayor a 0')
      // .integer('Sin decimales').test('', 'Debe ser mayot o igual a 0', val => val > 0),
      // .matches(val => /^\d+(\.\d{1,2})?$/, 'Puede poner un número separado por punto y 2 decimales máximo',)
      otherwise: schema => schema.notRequired()
    }),
})
