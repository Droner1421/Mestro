import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, Text, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContarExamenes } from '../hooks/useContarExamenes';
import { CountExamenResponse } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'ContarExamenes'>;

export const ContarExamenesPorCursoScreen: React.FC<Props> = ({ route }) => {
  const [idCurso, setIdCurso] = useState<string>(route.params?.idCurso?.toString() || '');
  const [searched, setSearched] = useState<boolean>(!!route.params?.idCurso);

  const { isLoading, conteo } = useContarExamenes(searched ? parseInt(idCurso) : 0);

  const handleSearch = () => {
    if (idCurso.trim()) {
      setSearched(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#667eea" />
        </View>
      );
    }

    if (!conteo) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontró información</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>ID Curso:</Text>
          <Text style={styles.value}>{conteo.id_curso}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Total de Exámenes:</Text>
          <Text style={styles.totalExamenes}>{conteo.total_examenes}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!searched ? (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Contar Exámenes por Curso</Text>
          <TextInput
            style={styles.input}
            placeholder="ID del Curso"
            placeholderTextColor="#999"
            value={idCurso}
            onChangeText={setIdCurso}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderContent()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  searchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#667eea',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '600',
  },
  totalExamenes: {
    fontSize: 36,
    color: '#667eea',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 300,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
