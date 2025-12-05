import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaestroData } from '../interfaces/reproductorInterface';

interface MaestroCardProps {
  maestro: MaestroData;
  onPress: (maestro: MaestroData) => void;
}

export const MaestroCard: React.FC<MaestroCardProps> = ({ maestro, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(maestro)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {maestro.nombre.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={1}>
            {maestro.nombre} {maestro.apellido}
          </Text>
          <Text style={styles.id}>ID: {maestro.id_maestro}</Text>
          <Text style={styles.area}>{maestro.area}</Text>
          <View style={styles.nivelTag}>
            <Text style={styles.nivelText}>{maestro.nivel_academico}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    fontWeight: '500',
    color: '#667eea',
    marginBottom: 4,
  },
  area: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  nivelTag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  nivelText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
});
