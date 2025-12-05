import { useReducer } from "react";
import { useCursoCRUD } from "./useCursoCRUD";

export interface FormCursoData {
    id_curso:   number;
    id_maestro: number;
    nombre:     string;
    clave:      string;
    grupo:      string;
    horario:    string;
    salon:      string;
}

interface UseFormCurso {
    state:              FormCursoData;
    handleInputChange:  ( fieldName: keyof FormCursoData, value: string | number ) => void;
    handleSubmit:       () => Promise<any>;
    handleDelete:       () => Promise<void>;
    setFormData:        ( data: FormCursoData ) => void;
}

export const useFormCurso = (): UseFormCurso => {
    
    const { createCurso, deleteCurso, updateCurso } = useCursoCRUD();

    const initialForm: FormCursoData = {
        id_curso:   0,
        id_maestro: 0,
        nombre:     "",
        clave:      "",
        grupo:      "",
        horario:    "",
        salon:      "",
    }

    type Action = 
        | { type: "handleInputChange", payload: { fieldName: keyof FormCursoData, value: string | number } }
        | { type: "setFormData", payload: FormCursoData };

    const formReducer = ( state: FormCursoData, action: Action ) => {
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

    const handleInputChange = ( fieldName: keyof FormCursoData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const setFormData = ( data: FormCursoData ) => {
        dispatch({ type: "setFormData", payload: data });
    }

    const handleSubmit = async () => {
        const submitData = {
            nombre: state.nombre,
            clave: state.clave,
            grupo: state.grupo,
            horario: state.horario,
            salon: state.salon,
        };

        return ( state.id_curso === 0 ) 
            ? createCurso(state.id_maestro, submitData) 
            : updateCurso(state.id_curso, submitData);
    };

    const handleDelete = () => deleteCurso(state.id_curso);

    return { state, handleInputChange, handleSubmit, handleDelete, setFormData };

}
