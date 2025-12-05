import { maestrosApi } from "../api/maestrosApi";
import { useState, useEffect, useRef } from "react";
import { MaestroData } from "../interfaces/reproductorInterface";

interface UseMaestrosPorArea {
    isLoading: boolean;
    LoadMaestros: () => void;
    maestros: MaestroData[];
}

export const useMaestrosPorArea = (area: string): UseMaestrosPorArea => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [maestros, setMaestros] = useState<MaestroData[]>([]);
    const pageRef = useRef(1);
    const isLoadingRef = useRef(false);

    const LoadMaestros = async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        
        const url = `/maestros/area/${area}?page=${pageRef.current}&limit=10`;
        const response = await maestrosApi.get<any>(url);
        const data = Array.isArray(response.data) 
            ? response.data 
            : Array.isArray(response.data?.data) 
              ? response.data.data 
              : [];
        if (data.length > 0) {
            mapMaestros(data);
            pageRef.current += 1;
        } else {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }

    const mapMaestros = (maestrosList: MaestroData[]) => {
        setMaestros((prevList) => [...prevList, ...maestrosList]);
        setIsLoading(false);
        isLoadingRef.current = false;
    }

    useEffect(() => {
        if (area) {
            pageRef.current = 1;
            setMaestros([]);
            LoadMaestros();
        }
    }, [area]);

    return { isLoading, LoadMaestros, maestros };
};
