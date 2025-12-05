import React, { useState } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMaestrosPorNivel } from '../hooks/useMaestrosPorNivel';
import { MaestroCard } from '../components/MaestroCard';
import { MaestroData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'MaestrosPorNivel'>;

export const MaestrosPorNivelScreen: React.FC<Props> = ({ navigation, route }) => {
  const [nivelAcademico, setNivelAcademico] = useState<string>(route.params?.nivelAcademico || 'Licenciatura');
  const [searched, setSearched] = useState<boolean>(!!route.params?.nivelAcademico);

  const { isLoading, maestros, LoadMaestros } = useMaestrosPorNivel(searched ? nivelAcademico : '');

  const handleLoadMore = () => {
    if (!isLoading && searched) {
      LoadMaestros();
    }
  };

  const handleSearch = () => {
    setSearched(true);
  };

  const handleNewSearch = () => {
    setNivelAcademico('Licenciatura');
    setSearched(false);
  };

  const handleMaestroPress = (maestro: MaestroData) => {
    navigation.navigate('MaestroDetail', { maestro });
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
        <Text style={styles.emptyText}>No hay maestros con nivel {nivelAcademico}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!searched ? (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Buscar Maestros por Nivel</Text>
          <View style={styles.buttonGroup}>
            {['Licenciatura', 'Maestría', 'Doctorado'].map((nivel) => (
              <TouchableOpacity
                key={nivel}
                style={[styles.nivelButton, nivelAcademico === nivel && styles.nivelButtonActive]}
                onPress={() => setNivelAcademico(nivel)}
              >
                <Text style={[styles.nivelButtonText, nivelAcademico === nivel && styles.nivelButtonTextActive]}>
                  {nivel}
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
            data={maestros}
            keyExtractor={(item) => item.id_maestro.toString()}
            renderItem={({ item }) => (
              <MaestroCard
                maestro={item}
                onPress={handleMaestroPress}
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
    flexDirection: 'column' as const,
    gap: 12,
    marginBottom: 24,
  },
  nivelButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  nivelButtonActive: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },
  nivelButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#667eea',
  },
  nivelButtonTextActive: {
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
