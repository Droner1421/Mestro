import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ExamenData } from '../interfaces/reproductorInterface';

interface ExamenCardProps {
  examen: ExamenData;
  onPress: (examen: ExamenData) => void;
}

export const ExamenCard: React.FC<ExamenCardProps> = ({ examen, onPress }) => {
  const getTipoColor = (tipo: string) => {
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
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(examen)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.tipoTag, { backgroundColor: getTipoColor(examen.tipo) }]}>
          <Text style={styles.tipoText}>{examen.tipo}</Text>
        </View>
        <Text style={styles.promedio}>{(Number(examen.promedio) || 0).toFixed(1)}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID Examen:</Text>
          <Text style={styles.value}>{examen.id_examen}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{examen.fecha}</Text>
        </View>
      </View>

      {examen.comentarios && (
        <View style={styles.comentariosContainer}>
          <Text style={styles.comentariosLabel}>Comentarios:</Text>
          <Text style={styles.comentariosText} numberOfLines={2}>
            {examen.comentarios}
          </Text>
        </View>
      )}

      {examen.curso && (
        <View style={styles.cursoInfo}>
          <Text style={styles.cursoLabel}>Curso:</Text>
          <Text style={styles.cursoName} numberOfLines={1}>
            {examen.curso.nombre}
          </Text>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  tipoTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tipoText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  promedio: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
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
  comentariosContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  comentariosLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#b45309',
    marginBottom: 4,
  },
  comentariosText: {
    fontSize: 12,
    color: '#78350f',
  },
  cursoInfo: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
  cursoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  cursoName: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
});
