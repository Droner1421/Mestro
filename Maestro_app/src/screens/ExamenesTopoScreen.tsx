import React, { useState } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useExamenesPorTipo } from '../hooks/useExamenesPorTipo';
import { ExamenCard } from '../components/ExamenCard';
import { ExamenData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'ExamenesTipo'>;

export const ExamenesTipoScreen: React.FC<Props> = ({ navigation, route }) => {
  const [tipo, setTipo] = useState<string>(route.params?.tipo || 'Parcial');
  const [searched, setSearched] = useState<boolean>(!!route.params?.tipo);

  const { isLoading, examenes, LoadExamenes } = useExamenesPorTipo(searched ? tipo : '');

  const handleLoadMore = () => {
    if (!isLoading && searched) {
      LoadExamenes();
    }
  };

  const handleSearch = () => {
    setSearched(true);
  };

  const handleNewSearch = () => {
    setTipo('Parcial');
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
        <Text style={styles.emptyText}>No hay exámenes de tipo {tipo}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!searched ? (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Buscar Exámenes por Tipo</Text>
          <View style={styles.buttonGroup}>
            {['Parcial', 'Final', 'Extraordinario'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, tipo === t && styles.typeButtonActive]}
                onPress={() => setTipo(t)}
              >
                <Text style={[styles.typeButtonText, tipo === t && styles.typeButtonTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  typeButtonActive: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#667eea',
  },
  typeButtonTextActive: {
    color: '#ffffff',
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
