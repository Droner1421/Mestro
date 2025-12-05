import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaestroData, Curso } from '../interfaces/reproductorInterface';
import { useCursosPorMaestro } from '../hooks/useCursosPorMaestro';

type Props = NativeStackScreenProps<any, 'MaestroDetail'>;

export const MaestroDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { maestro } = route.params as { maestro: MaestroData };
  const { cursos, isLoading: isLoadingCursos, LoadCursos } = useCursosPorMaestro(maestro.id_maestro);

  useEffect(() => {
    LoadCursos();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCursoPress = (curso: Curso) => {
    const cursoData: any = {
      ...curso,
      maestro: maestro,
      examenes: [],
    };
    navigation.navigate('CursoDetail', { curso: cursoData });
  };

  const handleEditMaestro = () => {
    navigation.navigate('MaestroCRUD', { maestro });
  };

  const handleCreateCurso = () => {
    navigation.navigate('CursoCRUD', { idMaestro: maestro.id_maestro });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {maestro.nombre.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditMaestro}>
              <Text style={styles.actionButtonText}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCreateCurso}>
              <Text style={styles.actionButtonText}>➕ Curso</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.label}>Nombre Completo:</Text>
            <Text style={styles.value}>
              {maestro.nombre} {maestro.apellido}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>ID Maestro:</Text>
            <Text style={styles.value}>{maestro.id_maestro}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>{maestro.correo}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Área:</Text>
            <Text style={styles.value}>{maestro.area}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Nivel Académico:</Text>
            <View style={[styles.badge, { backgroundColor: getNivelColor(maestro.nivel_academico) }]}>
              <Text style={styles.badgeText}>{maestro.nivel_academico}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Fecha de Ingreso:</Text>
            <Text style={styles.value}>{maestro.fecha_ingreso}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Cursos ({cursos.length})
          </Text>
          
          {isLoadingCursos ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#667eea" />
              <Text style={styles.loadingText}>Cargando cursos...</Text>
            </View>
          ) : cursos.length > 0 ? (
            cursos.map((curso) => (
              <TouchableOpacity 
                key={curso.id_curso} 
                style={styles.cursoCard}
                onPress={() => handleCursoPress(curso)}
              >
                <View style={styles.cursoHeader}>
                  <Text style={styles.cursoNombre} numberOfLines={2}>
                    {curso.nombre}
                  </Text>
                  <View style={styles.claveBadge}>
                    <Text style={styles.claveBadgeText}>{curso.clave}</Text>
                  </View>
                </View>

                <View style={styles.cursoDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Grupo:</Text>
                    <Text style={styles.detailValue}>{curso.grupo}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Horario:</Text>
                    <Text style={styles.detailValue}>{curso.horario}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Salón:</Text>
                    <Text style={styles.detailValue}>{curso.salon}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCoursesText}>No hay cursos disponibles</Text>
          )}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#374151',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  label: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1f2937',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  cursoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cursoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cursoNombre: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  claveBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  claveBadgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  cursoDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#1f2937',
  },
  backButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#667eea',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6b7280',
  },
  noCoursesText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9ca3af',
    paddingVertical: 20,
  },
});
