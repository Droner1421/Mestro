import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CursoData } from '../interfaces/reproductorInterface';
import { useExamenesPorCurso } from '../hooks/useExamenesPorCurso';

type Props = NativeStackScreenProps<any, 'CursoDetail'>;

export const CursoDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { curso } = route.params as { curso: CursoData };
  const { examenes, isLoading: isLoadingExamenes, LoadExamenes } = useExamenesPorCurso(curso.id_curso);

  useEffect(() => {
    LoadExamenes();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMaestroPress = () => {
    if (curso.maestro) {
      navigation.navigate('MaestroDetail', { maestro: curso.maestro });
    }
  };

  const handleEditCurso = () => {
    navigation.navigate('CursoCRUD', { curso });
  };

  const handleCreateExamen = () => {
    navigation.navigate('ExamenCRUD', { idCurso: curso.id_curso });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView}>
        {/* Curso Header */}
        <View style={styles.headerSection}>
          <View>
            <View style={styles.claveContainer}>
              <Text style={styles.claveText}>{curso.clave}</Text>
            </View>
            <Text style={styles.nombreCurso}>{curso.nombre}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditCurso}>
              <Text style={styles.actionButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCreateExamen}>
              <Text style={styles.actionButtonText}>➕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información General</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.label}>ID Curso:</Text>
            <Text style={styles.value}>{curso.id_curso}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Clave:</Text>
            <Text style={styles.value}>{curso.clave}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Grupo:</Text>
            <View style={styles.grupoBadge}>
              <Text style={styles.grupoBadgeText}>{curso.grupo}</Text>
            </View>
          </View>
        </View>

        {/* Ubicación y Horario */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación y Horario</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.label}>Salón:</Text>
            <Text style={styles.value}>{curso.salon}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Horario:</Text>
            <Text style={styles.value}>{curso.horario}</Text>
          </View>
        </View>

        {/* Información del Maestro */}
        {curso.maestro && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maestro a Cargo</Text>
            
            <TouchableOpacity 
              style={styles.maestroCard}
              onPress={handleMaestroPress}
            >
              <View style={styles.maestroAvatar}>
                <Text style={styles.maestroAvatarText}>
                  {curso.maestro.nombre.charAt(0).toUpperCase()}
                </Text>
              </View>
              
              <View style={styles.maestroInfo}>
                <Text style={styles.maestroNombre}>
                  {curso.maestro.nombre} {curso.maestro.apellido}
                </Text>
                <Text style={styles.maestroEmail}>{curso.maestro.correo}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Exámenes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Exámenes ({examenes.length})
          </Text>
          
          {isLoadingExamenes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#667eea" />
              <Text style={styles.loadingText}>Cargando exámenes...</Text>
            </View>
          ) : examenes.length > 0 ? (
            examenes.map((examen) => (
              <TouchableOpacity 
                key={examen.id_examen}
                style={styles.examenCard}
                onPress={() => navigation.navigate('ExamenDetail', { examen })}
              >
                <View style={styles.examenHeader}>
                  <View style={[styles.tipoBadge, { backgroundColor: getTipoColor(examen.tipo) }]}>
                    <Text style={styles.tipoBadgeText}>{examen.tipo}</Text>
                  </View>
                  <Text style={styles.promedioValue}>
                    {examen.promedio ? (typeof examen.promedio === 'number' ? examen.promedio.toFixed(2) : parseFloat(examen.promedio).toFixed(2)) : 'N/A'}
                  </Text>
                </View>
                <View style={styles.examenDetails}>
                  <Text style={styles.examenFecha}>{examen.fecha}</Text>
                  {examen.comentarios && (
                    <Text style={styles.examenComentarios} numberOfLines={2}>
                      {examen.comentarios}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noExamsText}>No hay exámenes disponibles</Text>
          )}
        </View>

        {/* Botón volver */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  claveContainer: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  claveText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  nombreCurso: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1f2937',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 18,
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
  grupoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  grupoBadgeText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  maestroCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  maestroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  maestroAvatarText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  maestroInfo: {
    flex: 1,
  },
  maestroNombre: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 4,
  },
  maestroEmail: {
    fontSize: 12,
    color: '#6b7280',
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
  examenCard: {
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
  examenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tipoBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  promedioValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#667eea',
  },
  examenDetails: {
    gap: 6,
  },
  examenFecha: {
    fontSize: 13,
    color: '#6b7280',
  },
  examenComentarios: {
    fontSize: 12,
    color: '#9ca3af',
  },
  noExamsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9ca3af',
    paddingVertical: 20,
  },
});

const getTipoColor = (tipo: string): string => {
  switch (tipo) {
    case 'Parcial':
      return '#3b82f6';
    case 'Final':
      return '#667eea';
    case 'Extraordinario':
      return '#ec4899';
    default:
      return '#6b7280';
  }
};
