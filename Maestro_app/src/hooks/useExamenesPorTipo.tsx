import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect, useRef } from "react";
import { ExamenData } from "../interfaces/reproductorInterface";

interface UseExamenesPorTipo {
    isLoading: boolean;
    LoadExamenes: () => void;
    examenes: ExamenData[];
}

export const useExamenesPorTipo = (tipo: string): UseExamenesPorTipo => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [examenes, setExamenes] = useState<ExamenData[]>([]);
    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);

    const LoadExamenes = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        
        const url = `/maestros/examenes/tipo/${tipo}?page=${pageRef.current}&limit=10`;
        const response = await maestrosApi.get<any>(url);
        const data = Array.isArray(response.data) 
            ? response.data 
            : Array.isArray(response.data?.data) 
              ? response.data.data 
              : [];
        if (data.length > 0) {
            mapExamenes(data);
            pageRef.current += 1;
        } else {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }

    const mapExamenes = (examenesList: ExamenData[]) => {
        setExamenes((prevList) => [...prevList, ...examenesList]);
        setIsLoading(false);
        isLoadingRef.current = false;
    }

    useEffect(() => {
        if (tipo) {
            pageRef.current = 1;
            setExamenes([]);
            LoadExamenes();
        }
    }, [tipo]);

    return { isLoading, LoadExamenes, examenes };
};
