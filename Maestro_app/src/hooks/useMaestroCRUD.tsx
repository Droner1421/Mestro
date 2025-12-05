import { useState } from 'react';
import axios from 'axios';
import { MaestroData } from '../interfaces/reproductorInterface';

const API_BASE_URL = 'http://192.168.100.8:3000/api';

export const useMaestroCRUD = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMaestro = async (maestroData: Omit<MaestroData, 'id_maestro' | 'cursos'>) => {
    setIsLoading(true);
    setError(null);
    const response = await axios.post(`${API_BASE_URL}/maestros`, maestroData);
    setIsLoading(false);
    return response.data;
  };

  const updateMaestro = async (id: number, maestroData: Partial<MaestroData>) => {
    setIsLoading(true);
    setError(null);
    const response = await axios.patch(`${API_BASE_URL}/maestros/${id}`, maestroData);
    setIsLoading(false);
    return response.data;
  };

  const deleteMaestro = async (id: number) => {
    setIsLoading(true);
    setError(null);
    await axios.delete(`${API_BASE_URL}/maestros/${id}`);
    setIsLoading(false);
  };

  return {
    createMaestro,
    updateMaestro,
    deleteMaestro,
    isLoading,
    error,
  };
};
