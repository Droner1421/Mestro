import React, { useState } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useExamenesPorFecha } from '../hooks/useExamenesPorFecha';
import { ExamenCard } from '../components/ExamenCard';
import { ExamenData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'ExamenesPorFecha'>;

export const ExamenesPorFechaScreen: React.FC<Props> = ({ navigation, route }) => {
  const [fecha, setFecha] = useState<string>(route.params?.fecha || '');
  const [searched, setSearched] = useState<boolean>(!!route.params?.fecha);

  const { isLoading, examenes, LoadExamenes } = useExamenesPorFecha(searched ? fecha : '');

  const handleLoadMore = () => {
    if (!isLoading && searched) {
      LoadExamenes();
    }
  };

  const handleSearch = () => {
    if (fecha.trim()) {
      setSearched(true);
    }
  };

  const handleNewSearch = () => {
    setFecha('');
    setSearched(false);
  };

  const handleExamenPress = (examen: ExamenData) => {
    navigation.navigate('ExamenDetail', { examen });
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    ) : null;
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay exámenes para la fecha {fecha}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!searched ? (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Buscar Exámenes por Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
            value={fecha}
            onChangeText={setFecha}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.newSearchButton} onPress={handleNewSearch}>
            <Text style={styles.newSearchButtonText}>← Nueva Búsqueda</Text>
          </TouchableOpacity>
          <FlatList
            data={examenes}
            keyExtractor={(item) => item.id_examen.toString()}
            renderItem={({ item }) => (
              <ExamenCard
                examen={item}
                onPress={handleExamenPress}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            scrollEnabled={true}
          />
        </View>
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  newSearchButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  newSearchButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#667eea',
  },
});
