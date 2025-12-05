import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExamenData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'ExamenDetail'>;

export const ExamenDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { examen } = route.params as { examen: ExamenData };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCursoPress = () => {
    if (examen.curso) {
      const cursoData: any = {
        ...examen.curso,
        examenes: [],
      };
      navigation.navigate('CursoDetail', { curso: cursoData });
    }
  };

  const handleMaestroPress = () => {
    if (examen.curso && examen.curso.maestro) {
      navigation.navigate('MaestroDetail', { maestro: examen.curso.maestro });
    }
  };

  const handleEditExamen = () => {
    navigation.navigate('ExamenCRUD', { examen });
  };

  const getTipoColor = (tipo: string): string => {
    switch (tipo) {
      case 'Parcial':
        return '#fbbf24';
      case 'Final':
        return '#ef4444';
      case 'Extraordinario':
        return '#8b5cf6';
      default:
        return '#667eea';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSection}>
          <View style={[styles.tipoContainer, { backgroundColor: getTipoColor(examen.tipo) }]}>
            <Text style={styles.tipoText}>{examen.tipo}</Text>
          </View>
          <Text style={styles.promedioText}>
            Promedio: {(Number(examen.promedio) || 0).toFixed(1)}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditExamen}>
            <Text style={styles.editButtonText}>✏️ Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Información General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información General</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.label}>ID Examen:</Text>
            <Text style={styles.value}>{examen.id_examen}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Tipo:</Text>
            <View style={[styles.tipoBadge, { backgroundColor: getTipoColor(examen.tipo) }]}>
              <Text style={styles.tipoBadgeText}>{examen.tipo}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{examen.fecha}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Promedio:</Text>
            <Text style={styles.promedioValue}>
              {(Number(examen.promedio) || 0).toFixed(1)}
            </Text>
          </View>
        </View>

        {examen.comentarios && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comentarios</Text>
            <View style={styles.comentariosCard}>
              <Text style={styles.comentariosText}>{examen.comentarios}</Text>
            </View>
          </View>
        )}

        {examen.curso && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Curso</Text>
            
            <TouchableOpacity 
              style={styles.cursoCard}
              onPress={handleCursoPress}
            >
              <Text style={styles.cursoNombre}>{examen.curso.nombre}</Text>
              
              <View style={styles.cursoDetails}>
                <View style={styles.cursoDetailItem}>
                  <Text style={styles.cursoDetailLabel}>Clave:</Text>
                  <Text style={styles.cursoDetailValue}>{examen.curso.clave}</Text>
                </View>
                
                <View style={styles.cursoDetailItem}>
                  <Text style={styles.cursoDetailLabel}>Grupo:</Text>
                  <Text style={styles.cursoDetailValue}>{examen.curso.grupo}</Text>
                </View>
                
                <View style={styles.cursoDetailItem}>
                  <Text style={styles.cursoDetailLabel}>Salón:</Text>
                  <Text style={styles.cursoDetailValue}>{examen.curso.salon}</Text>
                </View>
                
                <View style={styles.cursoDetailItem}>
                  <Text style={styles.cursoDetailLabel}>Horario:</Text>
                  <Text style={styles.cursoDetailValue}>{examen.curso.horario}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {examen.curso.maestro && (
              <TouchableOpacity 
                style={styles.maestroCard}
                onPress={handleMaestroPress}
              >
                <View style={styles.maestroAvatar}>
                  <Text style={styles.maestroAvatarText}>
                    {examen.curso.maestro.nombre.charAt(0).toUpperCase()}
                  </Text>
                </View>
                
                <View style={styles.maestroInfo}>
                  <Text style={styles.maestroNombre}>
                    {examen.curso.maestro.nombre} {examen.curso.maestro.apellido}
                  </Text>
                  <Text style={styles.maestroEmail}>{examen.curso.maestro.correo}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}

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
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tipoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  tipoText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  promedioText: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#667eea',
    marginBottom: 12,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  editButtonText: {
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
  tipoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
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
  comentariosCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  comentariosText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  cursoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cursoNombre: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 12,
  },
  cursoDetails: {
    gap: 10,
  },
  cursoDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cursoDetailLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6b7280',
  },
  cursoDetailValue: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#1f2937',
  },
  maestroCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
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
});
