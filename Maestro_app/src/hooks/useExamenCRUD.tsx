import { useState } from 'react';
import axios from 'axios';
import { ExamenData } from '../interfaces/reproductorInterface';

const API_BASE_URL = 'http://192.168.100.8:3000/api';

export const useExamenCRUD = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExamen = async (idCurso: number, examenData: Omit<ExamenData, 'id_examen' | 'id_curso' | 'curso'>) => {
    const dataWithCurso = { ...examenData, id_curso: idCurso };
    setIsLoading(true);
    setError(null);
    const response = await axios.post(`${API_BASE_URL}/maestros/examen`, dataWithCurso);
    setIsLoading(false);
    return response.data;
  };

  const updateExamen = async (id: number, examenData: Partial<ExamenData>) => {
    setIsLoading(true);
    setError(null);
    const response = await axios.patch(`${API_BASE_URL}/maestros/examenes/${id}`, examenData);
    setIsLoading(false);
    return response.data;
  };

  const deleteExamen = async (id: number) => {
    setIsLoading(true);
    setError(null);
    await axios.delete(`${API_BASE_URL}/examenes/${id}`);
    setIsLoading(false);
  };

  return {
    createExamen,
    updateExamen,
    deleteExamen,
    isLoading,
    error,
  };
};
