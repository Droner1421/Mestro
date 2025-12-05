import { useState } from 'react';
import axios from 'axios';
import { CursoData } from '../interfaces/reproductorInterface';

const API_BASE_URL = 'http://192.168.100.8:3000/api';

export const useCursoCRUD = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCurso = async (idMaestro: number, cursoData: Omit<CursoData, 'id_curso' | 'maestro' | 'examenes'>) => {
    const dataWithMaestro = { ...cursoData, id_maestro: idMaestro };
    setIsLoading(true);
    setError(null);
    const response = await axios.post(`${API_BASE_URL}/maestros/curso`, dataWithMaestro);
    setIsLoading(false);
    return response.data;
  };

  const updateCurso = async (id: number, cursoData: Partial<CursoData>) => {
    setIsLoading(true);
    setError(null);
    const response = await axios.patch(`${API_BASE_URL}/cursos/${id}`, cursoData);
    setIsLoading(false);
    return response.data;
  };

  const deleteCurso = async (id: number) => {
    setIsLoading(true);
    setError(null);
    await axios.delete(`${API_BASE_URL}/cursos/${id}`);
    setIsLoading(false);
  };

  return {
    createCurso,
    updateCurso,
    deleteCurso,
    isLoading,
    error,
  };
};
