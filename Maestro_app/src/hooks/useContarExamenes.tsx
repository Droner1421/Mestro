import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect } from "react";
import { CountExamenResponse } from "../interfaces/reproductorInterface";

interface UseContarExamenes {
    isLoading: boolean;
    conteo: CountExamenResponse | null;
}

export const useContarExamenes = (idCurso: number): UseContarExamenes => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [conteo, setConteo] = useState<CountExamenResponse | null>(null);

    const LoadConteo = async () => {
        try {
            setIsLoading(true);
            const url = `/maestros/examenes/contar/${idCurso}`;
            const response = await maestrosApi.get<CountExamenResponse>(url);
            setConteo(response.data);
        } catch (error) {
            console.error('Error al contar exámenes:', error);
            setConteo(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (idCurso) {
            LoadConteo();
        }
    }, [idCurso]);

    return { isLoading, conteo };
};
