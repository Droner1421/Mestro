import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMaestros } from '../hooks/useMaestros';
import { MaestroData } from '../interfaces/reproductorInterface';

export const HomeReproductorScreen: React.FC<any> = () => {
  const navigation = useNavigation<any>();
  const { maestros, isLoading, LoadMaestros } = useMaestros();

  useEffect(() => {
  }, []);

  const handleMaestroPress = (maestro: MaestroData) => {
    navigation.navigate('MaestroDetail', { maestro });
  };

  const handleCreateMaestro = () => {
    navigation.navigate('MaestroCRUD', {});
  };

  const renderMaestroCard = ({ item }: { item: MaestroData }) => (
    <TouchableOpacity
      style={styles.maestroCard}
      onPress={() => handleMaestroPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.maestroHeader}>
        <View style={styles.maestroInfo}>
          <Text style={styles.maestroNombre}>
            {item.nombre} {item.apellido}
          </Text>
          <Text style={styles.maestroArea}>{item.area}</Text>
        </View>
        <View style={[styles.nivelBadge, { backgroundColor: getNivelColor(item.nivel_academico) }]}>
          <Text style={styles.nivelBadgeText}>
            {item.nivel_academico.substring(0, 3).toUpperCase()}
          </Text>
        </View>
      </View>

      {item.cursos && item.cursos.length > 0 && (
        <View style={styles.cursosSection}>
          <Text style={styles.cursosTitle}>
            Cursos ({item.cursos.length})
          </Text>
          <View style={styles.cursosList}>
            {item.cursos.map((curso) => (
              <View key={curso.id_curso} style={styles.cursoItem}>
                <View style={styles.cursoItemContent}>
                  <Text style={styles.cursoNombre} numberOfLines={1}>
                    {curso.nombre}
                  </Text>
                  <View style={styles.cursoDetailsRow}>
                    <Text style={styles.cursoDetail}>📍 {curso.salon}</Text>
                    <Text style={styles.cursoDetail}>⏰ {curso.horario}</Text>
                  </View>
                </View>
                <View style={styles.grupoBadge}>
                  <Text style={styles.grupoBadgeText}>{curso.grupo}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerTitle}>📚 Maestros y Cursos</Text>
          <Text style={styles.headerSubtitle}>
            {maestros.length} maestro{maestros.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateMaestro}
        >
          <Text style={styles.createButtonText}>+ Maestro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hay maestros disponibles</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={maestros}
        keyExtractor={(item) => item.id_maestro.toString()}
        renderItem={renderMaestroCard}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const getNivelColor = (nivel: string): string => {
  switch (nivel) {
    case 'Licenciatura':
      return '#3b82f6';
    case 'Maestría':
      return '#667eea';
    case 'Doctorado':
      return '#8b5cf6';
    default:
      return '#667eea';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  createButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  maestroCard: {
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
  maestroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  maestroInfo: {
    flex: 1,
  },
  maestroNombre: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 4,
  },
  maestroArea: {
    fontSize: 13,
    color: '#667eea',
    fontWeight: '600' as const,
  },
  nivelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  nivelBadgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  cursosSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  cursosTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: 8,
  },
  cursosList: {
    gap: 8,
  },
  cursoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 8,
  },
  cursoItemContent: {
    flex: 1,
  },
  cursoNombre: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#1f2937',
    marginBottom: 4,
  },
  cursoDetailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cursoDetail: {
    fontSize: 11,
    color: '#666',
  },
  grupoBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  grupoBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 400,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

