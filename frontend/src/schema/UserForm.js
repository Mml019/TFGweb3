import * as yup from "yup";
import toast from "react-hot-toast";

export const enviroments = [
  "Atención especializada",
  "Atención Primaria/ domiciliaria",
  "Centro sociosanitario",
  "Sistema escolar",
  "Universidad",
  "Consulta propia",
  "Otro",
];
export const sectors = [
  "Público",
  "Privado",
  "Centro concertado o mixto",
  "Otro",
];
export const activities = [
  "Asistencial",
  "Investigacion",
  "Docencia",
  "Administracion",
  "Otra",
];
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
  "Dietética y Nutrición",
];
export const perfil = {
  Estudiante: "Estudiante de grado de ciencias de la salud",
  Profesional: "Profesional de ciencias de la salud",
};
export const level_PBE = [1, 2, 3, 4, 5];

// Returns tipish nacionalities from txt the other txt has 1
export function loadNacionalities(nameFile = "nacionalidad_tipica.txt") {
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
      parser = new DOMParser();
      xml = parser.parseFromString(str);
      rows = xml.getElementsByTagName("row");
      let CCAA = [];

      Array.from(rows).forEach((row) => {
        let ccaa = {};
        ccaa["nom_oficial"] = row.querySelector("nom_oficial").textContent;
        ccaa["codi"] = row.querySelector("codi");

        CCAA.push(ccaa);
        console.log(CCAA);
        return Promise.resolve(CCAA);
      });
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
      parser = new DOMParser();
      xml = parser.parseFromString(str);
      rows = xml.getElementsByTagName("row");
      let cities = [];

      Array.from(rows).forEach((row) => {
        let city = {};
        city["nom"] = row.querySelector("nom").textContent;
        city["codi_prov"] = row.querySelector("codi_prov_ncia").textContent;
        cities.push(city);
        console.log(cities);
        return Promise.resolve(cities);
      });
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
  dirName += `/${endsWith(nameFile)}/${nameFile}`;

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
      parser = new DOMParser();
      xml = parser.parseFromString(str);
      rows = xml.getElementsByTagName("row");
      cities_code = xml.getElementsByTagName("row[codi_prov_ncia]=04");

      let cities = [];
      Array.from(rows).forEach((row) => {
        let city = {};
        if (row.querySelector("codi_prov_ncia").textContent == code) {
          city["nom"] = row.querySelector("nom").textContent;
          city["cp"] = row.querySelector("codi").textContent;
        }
        cities.push(city);
        console.log(cities);
        return Promise.resolve(cities);
      });
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
export const yupSchema = yup.object({
  sex: yup
    .string()
    .oneOf(sexs, "Solo puede ser Femenino o Masculino")
    .required(),
  age: yup
    .number()
    .integer()
    .max(120, "No puede superar los 120 años")
    .min(16, "Debes tener al menos 16 años")
    .required(),
  nacionality: yup.string(), //.oneOf(nacionalities, "Seleccione una de las ocpiones").required(),
  city: yup.string(), //.oneOf().required(),
  province: yup.string(), //.oneOf().required(),
  level_PBE: yup
    .number()
    .positive()
    .min(1, "Debe estar entre 1 y 5")
    .max(5, "Debe estar entre 1 y 5")
    .required(),
  //profile: yup.array().oneOf(await loadAllCities(), "Debe seleccionar entre Estudiante o Profesional de la salud")
  // PBE_knownledge: yup.boolean().required(),
  // // PBE_training: yup.string().ondeOf().required(),
  // academic_level: yup.string().oneOf(academic_levels, 'Debe escoger entre Grado, Máster o Doctorado').required(),
  // speciality: yup.string().required(),
  // // profarea: yup.string().oneOf().required(),
  // satisfation: yup.number().integer().positive().min(1).max(10).required(),
  // // enviroment: yup.string().oneOf().required(),
  // // sector: yup.string().oneOf().required(),
  // // activity: yup.string().oneOf(),
  // supervisor: yup.boolean().required(),
  // dedicationW: yup.number().positive('No puede tener horas negativas').min(0).max(120).required(),
  // years: yup.number().integer().min(1).max(100).required()
});
