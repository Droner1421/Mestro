// To parse this data:
//
//   import { Convert, Maestros, Cursos, Examenes } from "./file";
//
//   const maestros = Convert.toMaestros(json);
//   const cursos = Convert.toCursos(json);
//   const examenes = Convert.toExamenes(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// ============================================================================
//                              MAESTROS
// ============================================================================

export interface Maestros {
    pagination: Pagination;
    data:       MaestroData[];
}

export interface MaestroData {
    id_maestro:      number;
    nombre:          string;
    apellido:        string;
    correo:          string;
    area:            string;
    nivel_academico: string;
    fecha_ingreso:   string;
    cursos:          Curso[];
}

export interface Curso {
    id_curso:   number;
    id_maestro: number;
    nombre:     string;
    clave:      string;
    grupo:      string;
    horario:    string;
    salon:      string;
}

export interface Pagination {
    total:       number;
    limit:       number;
    currentPage: number;
    totalPages:  number;
    next:        string | null;
    prev:        string | null;
}


// ============================================================================
//                              CURSOS
// ============================================================================

export interface Cursos {
    pagination: Pagination;
    data:       CursoData[];
}

export interface CursoData {
    id_curso:   number;
    id_maestro: number;
    nombre:     string;
    clave:      string;
    grupo:      string;
    horario:    string;
    salon:      string;
    maestro:    MaestroData;
    examenes:   Examen[];
}


// ============================================================================
//                              EXÁMENES
// ============================================================================

export interface Examenes {
    pagination: Pagination;
    data:       ExamenData[];
}

export interface ExamenData {
    id_examen:   number;
    id_curso:    number;
    tipo:        TipoExamen;
    fecha:       string;
    promedio:    number;
    comentarios: string | null;
    curso:       CursoConMaestro;
}

export interface Examen {
    id_examen:   number;
    id_curso:    number;
    tipo:        TipoExamen;
    fecha:       string;
    promedio:    number;
    comentarios: string | null;
}

export interface CursoConMaestro {
    id_curso:   number;
    id_maestro: number;
    nombre:     string;
    clave:      string;
    grupo:      string;
    horario:    string;
    salon:      string;
    maestro:    MaestroData;
}

export type TipoExamen = "Parcial" | "Final" | "Extraordinario";


// ============================================================================
//                         RESPUESTAS INDIVIDUALES
// ============================================================================

export interface MaestroResponse {
    id_maestro:      number;
    nombre:          string;
    apellido:        string;
    correo:          string;
    area:            string;
    nivel_academico: string;
    fecha_ingreso:   string;
}

export interface CursoResponse {
    id_curso:   number;
    id_maestro: number;
    nombre:     string;
    clave:      string;
    grupo:      string;
    horario:    string;
    salon:      string;
}

export interface ExamenResponse {
    id_examen:   number;
    id_curso:    number;
    tipo:        TipoExamen;
    fecha:       string;
    promedio:    number;
    comentarios: string | null;
}

export interface MessageResponse {
    message: string;
}

export interface CountExamenResponse {
    id_curso:       number;
    total_examenes: number;
}


// ============================================================================
//                              CONVERTERS
// ============================================================================

export class Convert {
    public static toMaestros(json: string): Maestros {
        return cast(JSON.parse(json), r("Maestros"));
    }

    public static maestrosToJson(value: Maestros): string {
        return JSON.stringify(uncast(value, r("Maestros")), null, 2);
    }

    public static toCursos(json: string): Cursos {
        return cast(JSON.parse(json), r("Cursos"));
    }

    public static cursosToJson(value: Cursos): string {
        return JSON.stringify(uncast(value, r("Cursos")), null, 2);
    }

    public static toExamenes(json: string): Examenes {
        return cast(JSON.parse(json), r("Examenes"));
    }

    public static examenestoJson(value: Examenes): string {
        return JSON.stringify(uncast(value, r("Examenes")), null, 2);
    }

    public static toMaestro(json: string): MaestroResponse {
        return cast(JSON.parse(json), r("MaestroResponse"));
    }

    public static maestroToJson(value: MaestroResponse): string {
        return JSON.stringify(uncast(value, r("MaestroResponse")), null, 2);
    }

    public static toCurso(json: string): CursoResponse {
        return cast(JSON.parse(json), r("CursoResponse"));
    }

    public static cursoToJson(value: CursoResponse): string {
        return JSON.stringify(uncast(value, r("CursoResponse")), null, 2);
    }

    public static toExamen(json: string): ExamenResponse {
        return cast(JSON.parse(json), r("ExamenResponse"));
    }

    public static examenToJson(value: ExamenResponse): string {
        return JSON.stringify(uncast(value, r("ExamenResponse")), null, 2);
    }

    public static toCountExamen(json: string): CountExamenResponse {
        return cast(JSON.parse(json), r("CountExamenResponse"));
    }

    public static countExamenToJson(value: CountExamenResponse): string {
        return JSON.stringify(uncast(value, r("CountExamenResponse")), null, 2);
    }
}


// ============================================================================
//                         HELPER FUNCTIONS
// ============================================================================

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Maestros": o([
        { json: "pagination", js: "pagination", typ: r("Pagination") },
        { json: "data", js: "data", typ: a(r("MaestroData")) },
    ], false),
    "MaestroData": o([
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "apellido", js: "apellido", typ: "" },
        { json: "correo", js: "correo", typ: "" },
        { json: "area", js: "area", typ: "" },
        { json: "nivel_academico", js: "nivel_academico", typ: "" },
        { json: "fecha_ingreso", js: "fecha_ingreso", typ: "" },
        { json: "cursos", js: "cursos", typ: a(r("Curso")) },
    ], false),
    "Curso": o([
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "clave", js: "clave", typ: "" },
        { json: "grupo", js: "grupo", typ: "" },
        { json: "horario", js: "horario", typ: "" },
        { json: "salon", js: "salon", typ: "" },
    ], false),
    "Pagination": o([
        { json: "total", js: "total", typ: 0 },
        { json: "limit", js: "limit", typ: 0 },
        { json: "currentPage", js: "currentPage", typ: 0 },
        { json: "totalPages", js: "totalPages", typ: 0 },
        { json: "next", js: "next", typ: u(null, "") },
        { json: "prev", js: "prev", typ: u(null, "") },
    ], false),
    "Cursos": o([
        { json: "pagination", js: "pagination", typ: r("Pagination") },
        { json: "data", js: "data", typ: a(r("CursoData")) },
    ], false),
    "CursoData": o([
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "clave", js: "clave", typ: "" },
        { json: "grupo", js: "grupo", typ: "" },
        { json: "horario", js: "horario", typ: "" },
        { json: "salon", js: "salon", typ: "" },
        { json: "maestro", js: "maestro", typ: r("MaestroData") },
        { json: "examenes", js: "examenes", typ: a(r("Examen")) },
    ], false),
    "Examenes": o([
        { json: "pagination", js: "pagination", typ: r("Pagination") },
        { json: "data", js: "data", typ: a(r("ExamenData")) },
    ], false),
    "ExamenData": o([
        { json: "id_examen", js: "id_examen", typ: 0 },
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "tipo", js: "tipo", typ: r("TipoExamen") },
        { json: "fecha", js: "fecha", typ: "" },
        { json: "promedio", js: "promedio", typ: 3.14 },
        { json: "comentarios", js: "comentarios", typ: u(null, "") },
        { json: "curso", js: "curso", typ: r("CursoConMaestro") },
    ], false),
    "Examen": o([
        { json: "id_examen", js: "id_examen", typ: 0 },
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "tipo", js: "tipo", typ: r("TipoExamen") },
        { json: "fecha", js: "fecha", typ: "" },
        { json: "promedio", js: "promedio", typ: 3.14 },
        { json: "comentarios", js: "comentarios", typ: u(null, "") },
    ], false),
    "CursoConMaestro": o([
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "clave", js: "clave", typ: "" },
        { json: "grupo", js: "grupo", typ: "" },
        { json: "horario", js: "horario", typ: "" },
        { json: "salon", js: "salon", typ: "" },
        { json: "maestro", js: "maestro", typ: r("MaestroData") },
    ], false),
    "MaestroResponse": o([
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "apellido", js: "apellido", typ: "" },
        { json: "correo", js: "correo", typ: "" },
        { json: "area", js: "area", typ: "" },
        { json: "nivel_academico", js: "nivel_academico", typ: "" },
        { json: "fecha_ingreso", js: "fecha_ingreso", typ: "" },
    ], false),
    "CursoResponse": o([
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "id_maestro", js: "id_maestro", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "clave", js: "clave", typ: "" },
        { json: "grupo", js: "grupo", typ: "" },
        { json: "horario", js: "horario", typ: "" },
        { json: "salon", js: "salon", typ: "" },
    ], false),
    "ExamenResponse": o([
        { json: "id_examen", js: "id_examen", typ: 0 },
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "tipo", js: "tipo", typ: r("TipoExamen") },
        { json: "fecha", js: "fecha", typ: "" },
        { json: "promedio", js: "promedio", typ: 3.14 },
        { json: "comentarios", js: "comentarios", typ: u(null, "") },
    ], false),
    "CountExamenResponse": o([
        { json: "id_curso", js: "id_curso", typ: 0 },
        { json: "total_examenes", js: "total_examenes", typ: 0 },
    ], false),
    "TipoExamen": u("Parcial", "Final", "Extraordinario"),
};
