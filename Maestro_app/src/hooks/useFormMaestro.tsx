import { useReducer } from "react";
import { useMaestroCRUD } from "./useMaestroCRUD";

export interface FormMaestroData {
    id_maestro:      number;
    nombre:          string;
    apellido:        string;
    correo:          string;
    area:            string;
    nivel_academico: string;
    fecha_ingreso:   string;
}

interface UseFormMaestro {
    state:              FormMaestroData;
    handleInputChange:  ( fieldName: keyof FormMaestroData, value: string | number ) => void;
    handleSubmit:       () => Promise<any>;
    handleDelete:       () => Promise<void>;
    setFormData:        ( data: FormMaestroData ) => void;
}

export const useFormMaestro = (): UseFormMaestro => {
    
    const { createMaestro, deleteMaestro, updateMaestro } = useMaestroCRUD();

    const initialForm: FormMaestroData = {
        id_maestro:      0,
        nombre:          "",
        apellido:        "",
        correo:          "",
        area:            "",
        nivel_academico: "",
        fecha_ingreso:   "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormMaestroData, value: string | number } }
        | { type: "setFormData", payload: FormMaestroData };

    const formReducer = ( state: FormMaestroData, action: Action ) => {
        switch( action.type ){
            case "handleInputChange":
                return {
                    ...state,
                    [ action.payload.fieldName ]: action.payload.value
                }
            case "setFormData":
                return action.payload;
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer( formReducer, initialForm );

    const handleInputChange = ( fieldName: keyof FormMaestroData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const setFormData = ( data: FormMaestroData ) => {
        dispatch({ type: "setFormData", payload: data });
    }

    const handleSubmit = async () => {
        const submitData = {
            nombre: state.nombre,
            apellido: state.apellido,
            correo: state.correo,
            area: state.area,
            nivel_academico: state.nivel_academico,
            fecha_ingreso: state.fecha_ingreso,
        };

        return ( state.id_maestro === 0 ) 
            ? createMaestro(submitData) 
            : updateMaestro(state.id_maestro, submitData);
    };

    const handleDelete = () => deleteMaestro(state.id_maestro);

    return { state, handleInputChange, handleSubmit, handleDelete, setFormData };

}
