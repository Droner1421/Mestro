import { useReducer } from "react";
import { useExamenCRUD } from "./useExamenCRUD";
import { TipoExamen } from "../interfaces/reproductorInterface";

export interface FormExamenData {
    id_examen:   number;
    id_curso:    number;
    tipo:        TipoExamen | "";
    fecha:       string;
    promedio:    number | string;
    comentarios: string;
}

interface UseFormExamen {
    state:              FormExamenData;
    handleInputChange:  ( fieldName: keyof FormExamenData, value: string | number ) => void;
    handleSubmit:       () => Promise<any>;
    handleDelete:       () => Promise<void>;
    setFormData:        ( data: FormExamenData ) => void;
}

export const useFormExamen = (): UseFormExamen => {
    
    const { createExamen, deleteExamen, updateExamen } = useExamenCRUD();

    const initialForm: FormExamenData = {
        id_examen:   0,
        id_curso:    0,
        tipo:        "",
        fecha:       "",
        promedio:    "",
        comentarios: "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormExamenData, value: string | number } }
        | { type: "setFormData", payload: FormExamenData };

    const formReducer = ( state: FormExamenData, action: Action ) => {
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

    const handleInputChange = ( fieldName: keyof FormExamenData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const setFormData = ( data: FormExamenData ) => {
        dispatch({ type: "setFormData", payload: data });
    }

    const handleSubmit = async () => {
        const examenData = {
            tipo: state.tipo as TipoExamen,
            fecha: state.fecha,
            promedio: typeof state.promedio === 'string' ? parseFloat(state.promedio) : state.promedio,
            comentarios: state.comentarios,
        };
        return ( state.id_examen === 0 ) 
            ? createExamen(state.id_curso, examenData) 
            : updateExamen(state.id_examen, examenData);
    }

    const handleDelete = () => deleteExamen(state.id_examen);

    return { state, handleInputChange, handleSubmit, handleDelete, setFormData };

}
