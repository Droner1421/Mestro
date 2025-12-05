import React, { useState } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCursosPorGrupo } from '../hooks/useCursosPorGrupo';
import { CursoCard } from '../components/CursoCard';
import { CursoData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'CursosPorGrupo'>;

export const CursosPorGrupoScreen: React.FC<Props> = ({ navigation, route }) => {
  const [grupo, setGrupo] = useState<string>(route.params?.grupo || '');
  const [searched, setSearched] = useState<boolean>(!!route.params?.grupo);

  const { isLoading, cursos, LoadCursos } = useCursosPorGrupo(searched ? grupo : '');

  const handleLoadMore = () => {
    if (!isLoading && searched) {
      LoadCursos();
    }
  };

  const handleSearch = () => {
    if (grupo.trim()) {
      setSearched(true);
    }
  };

  const handleNewSearch = () => {
    setGrupo('');
    setSearched(false);
  };

  const handleCursoPress = (curso: CursoData) => {
    navigation.navigate('CursoDetail', { curso });
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
        <Text style={styles.emptyText}>No hay cursos en el grupo {grupo}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!searched ? (
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Buscar Cursos por Grupo</Text>
          <TextInput
            style={styles.input}
            placeholder="Grupo (ej: A, B, 1A)"
            placeholderTextColor="#999"
            value={grupo}
            onChangeText={setGrupo}
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
            data={cursos}
            keyExtractor={(item) => item.id_curso.toString()}
            renderItem={({ item }) => (
              <CursoCard
                curso={item}
                onPress={handleCursoPress}
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
