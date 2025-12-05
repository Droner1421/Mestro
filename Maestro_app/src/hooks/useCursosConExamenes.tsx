import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect, useRef } from "react";
import { CursoData } from "../interfaces/reproductorInterface";

interface UseCursosConExamenes {
    isLoading: boolean;
    LoadCursos: () => void;
    cursos: CursoData[];
}

export const useCursosConExamenes = (): UseCursosConExamenes => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursos, setCursos] = useState<CursoData[]>([]);
    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);

    const LoadCursos = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        
        const url = `/maestros/cursos/con-examenes?page=${pageRef.current}&limit=10`;
        const response = await maestrosApi.get<any>(url);
        const data = Array.isArray(response.data) 
            ? response.data 
            : Array.isArray(response.data?.data) 
              ? response.data.data 
              : [];
        if (data.length > 0) {
            mapCursos(data);
            pageRef.current += 1;
        } else {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }

    const mapCursos = (cursosList: CursoData[]) => {
        setCursos((prevList) => [...prevList, ...cursosList]);
        setIsLoading(false);
        isLoadingRef.current = false;
    }

    useEffect(() => {
        pageRef.current = 1;
        setCursos([]);
        LoadCursos();
    }, []);

    return { isLoading, LoadCursos, cursos };
};
