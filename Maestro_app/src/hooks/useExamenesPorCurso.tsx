import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect, useRef } from "react";
import { ExamenData } from "../interfaces/reproductorInterface";

interface UseExamenesPorCurso {
    isLoading: boolean;
    LoadExamenes: () => void;
    examenes: ExamenData[];
}

export const useExamenesPorCurso = (idCurso: number): UseExamenesPorCurso => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [examenes, setExamenes] = useState<ExamenData[]>([]);
    const isLoadingRef = useRef(false);

    const LoadExamenes = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        
        try {
            console.log('📚 useExamenesPorCurso.LoadExamenes - Iniciando...');
            console.log('idCurso:', idCurso);
            const url = `/maestros/cursos/${idCurso}`;
            console.log('URL:', url);
            const response = await maestrosApi.get<any>(url);
            console.log('✅ Respuesta:', response.data);
            
            const data = response.data?.examenes || [];
            console.log('📝 Exámenes encontrados:', data);
            setExamenes(data);
        } catch (error) {
            console.error('❌ Error loading examenes:', error);
        } finally {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }

    useEffect(() => {
        if (idCurso) {
            LoadExamenes();
        }
    }, [idCurso]);

    return { isLoading, LoadExamenes, examenes };
};
