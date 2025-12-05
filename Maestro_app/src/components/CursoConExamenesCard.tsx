import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { CursoData } from '../interfaces/reproductorInterface';

interface CursoConExamenesCardProps {
  curso: CursoData;
  onPress: (curso: CursoData) => void;
}

export const CursoConExamenesCard: React.FC<CursoConExamenesCardProps> = ({ curso, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(curso)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.nombre} numberOfLines={2}>
          {curso.nombre}
        </Text>
        <View style={styles.claveTag}>
          <Text style={styles.claveText}>{curso.clave}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Grupo:</Text>
          <Text style={styles.value}>{curso.grupo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Horario:</Text>
          <Text style={styles.value}>{curso.horario}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Salón:</Text>
          <Text style={styles.value}>{curso.salon}</Text>
        </View>
      </View>

      {curso.maestro && (
        <View style={styles.maestroInfo}>
          <Text style={styles.maestroLabel}>Maestro:</Text>
          <Text style={styles.maestroName}>
            {curso.maestro.nombre} {curso.maestro.apellido}
          </Text>
        </View>
      )}

      {curso.examenes && curso.examenes.length > 0 && (
        <View style={styles.examenesContainer}>
          <View style={styles.examenesHeader}>
            <Text style={styles.examenesLabel}>
              Exámenes ({curso.examenes.length})
            </Text>
          </View>
          <FlatList
            data={curso.examenes}
            keyExtractor={(item) => item.id_examen.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.examenItem}>
                <View style={styles.examenTipo}>
                  <Text style={styles.examenTipoText}>{item.tipo}</Text>
                </View>
                <View style={styles.examenDetails}>
                  <Text style={styles.examenFecha}>{item.fecha}</Text>
                  <Text style={styles.examenPromedio}>Promedio: {(Number(item.promedio) || 0).toFixed(1)}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  claveTag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  claveText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  value: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '500',
  },
  maestroInfo: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    marginBottom: 10,
  },
  maestroLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  maestroName: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
  examenesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
  examenesHeader: {
    marginBottom: 8,
  },
  examenesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  examenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  examenTipo: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  examenTipoText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  examenDetails: {
    flex: 1,
  },
  examenFecha: {
    fontSize: 11,
    color: '#1f2937',
    fontWeight: '500',
  },
  examenPromedio: {
    fontSize: 10,
    color: '#667eea',
    marginTop: 2,
  },
});
