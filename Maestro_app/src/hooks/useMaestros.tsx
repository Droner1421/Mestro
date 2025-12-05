import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect, useRef } from "react";
import { MaestroData } from "../interfaces/reproductorInterface";

interface UseMaestros {
    isLoading: boolean;
    LoadMaestros: () => void;
    maestros: MaestroData[];
}

export const useMaestros = (): UseMaestros => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [maestros, setMaestros] = useState<MaestroData[]>([]);
    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);

    const LoadMaestros = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        
        const url = `/maestros?page=${pageRef.current}&limit=10`;
        const response = await maestrosApi.get<any>(url);
        const data = Array.isArray(response.data) 
            ? response.data 
            : Array.isArray(response.data?.data) 
              ? response.data.data 
              : [];
        
        if (data.length > 0) {
            setMaestros((prevList) => [...prevList, ...data]);
            pageRef.current += 1;
        }
        
        setIsLoading(false);
        isLoadingRef.current = false;
    };

    useEffect(() => {
        LoadMaestros();
    }, []);

    return { isLoading, LoadMaestros, maestros };
};
