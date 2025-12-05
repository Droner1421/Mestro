import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormMaestro } from '../hooks/useFormMaestro';
import { MaestroData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'MaestroCRUD'>;

export const MaestroCRUDScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, handleInputChange, handleSubmit, handleDelete, setFormData } = useFormMaestro();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maestroToEdit = route.params?.maestro as MaestroData | undefined;

  React.useEffect(() => {
    if (maestroToEdit) {
      setFormData({
        id_maestro: maestroToEdit.id_maestro,
        nombre: maestroToEdit.nombre,
        apellido: maestroToEdit.apellido,
        correo: maestroToEdit.correo,
        area: maestroToEdit.area,
        nivel_academico: maestroToEdit.nivel_academico,
        fecha_ingreso: maestroToEdit.fecha_ingreso,
      });
    }
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);
    await handleSubmit();
    Alert.alert('Éxito', maestroToEdit ? 'Maestro actualizado' : 'Maestro creado');
    navigation.goBack();
    setIsSubmitting(false);
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Maestro',
      '¿Estás seguro de que deseas eliminar este maestro?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: async () => {
            setIsSubmitting(true);
            await handleDelete();
            Alert.alert('Éxito', 'Maestro eliminado');
            navigation.goBack();
            setIsSubmitting(false);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{maestroToEdit ? 'Editar Maestro' : 'Crear Maestro'}</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese nombre"
              value={state.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese apellido"
              value={state.apellido}
              onChangeText={(value) => handleInputChange('apellido', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Correo *</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              value={state.correo}
              onChangeText={(value) => handleInputChange('correo', value)}
              keyboardType="email-address"
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Área *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese área"
              value={state.area}
              onChangeText={(value) => handleInputChange('area', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nivel Académico *</Text>
            <TextInput
              style={styles.input}
              placeholder="Licenciatura / Maestría / Doctorado"
              value={state.nivel_academico}
              onChangeText={(value) => handleInputChange('nivel_academico', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha de Ingreso (YYYY-MM-DD) *</Text>
            <TextInput
              style={styles.input}
              placeholder="2024-01-15"
              value={state.fecha_ingreso}
              onChangeText={(value) => handleInputChange('fecha_ingreso', value)}
              editable={!isSubmitting}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isSubmitting && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {maestroToEdit ? 'Actualizar' : 'Crear'} Maestro
              </Text>
            )}
          </TouchableOpacity>

          {maestroToEdit && (
            <TouchableOpacity
              style={[styles.deleteButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleDeletePress}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.deleteButtonText}>Eliminar Maestro</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1f2937',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
  },
  buttonContainer: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
