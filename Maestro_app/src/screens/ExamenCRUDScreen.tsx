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
import { useFormExamen } from '../hooks/useFormExamen';
import { ExamenData, TipoExamen } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'ExamenCRUD'>;

export const ExamenCRUDScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, handleInputChange, handleSubmit, handleDelete, setFormData } = useFormExamen();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const examenToEdit = route.params?.examen as ExamenData | undefined;
  const idCursoParam = route.params?.idCurso as number | undefined;

  React.useEffect(() => {
    if (examenToEdit) {
      setFormData({
        id_examen: examenToEdit.id_examen,
        id_curso: examenToEdit.id_curso,
        tipo: examenToEdit.tipo,
        fecha: examenToEdit.fecha,
        promedio: examenToEdit.promedio,
        comentarios: examenToEdit.comentarios || '',
      });
    } else if (idCursoParam) {
      setFormData({
        id_examen: 0,
        id_curso: idCursoParam,
        tipo: "",
        fecha: "",
        promedio: "",
        comentarios: "",
      });
    }
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);
    await handleSubmit();
    Alert.alert('Éxito', examenToEdit ? 'Examen actualizado' : 'Examen creado');
    navigation.goBack();
    setIsSubmitting(false);
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Examen',
      '¿Estás seguro de que deseas eliminar este examen?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: async () => {
            setIsSubmitting(true);
            await handleDelete();
            Alert.alert('Éxito', 'Examen eliminado');
            navigation.goBack();
            setIsSubmitting(false);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const tipoOptions: TipoExamen[] = ['Parcial', 'Final', 'Extraordinario'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{examenToEdit ? 'Editar Examen' : 'Crear Examen'}</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de Examen *</Text>
            <View style={styles.buttonGroup}>
              {tipoOptions.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.tipoButton,
                    state.tipo === tipo && styles.tipoButtonActive,
                  ]}
                  onPress={() => handleInputChange('tipo', tipo)}
                  disabled={isSubmitting}
                >
                  <Text
                    style={[
                      styles.tipoButtonText,
                      state.tipo === tipo && styles.tipoButtonTextActive,
                    ]}
                  >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Fecha (YYYY-MM-DD) *</Text>
            <TextInput
              style={styles.input}
              placeholder="2024-01-15"
              value={state.fecha}
              onChangeText={(value) => handleInputChange('fecha', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Promedio *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.0 - 100.0"
              value={state.promedio.toString()}
              onChangeText={(value) => handleInputChange('promedio', value)}
              keyboardType="decimal-pad"
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Comentarios</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingrese comentarios (opcional)"
              value={state.comentarios}
              onChangeText={(value) => handleInputChange('comentarios', value)}
              multiline
              numberOfLines={4}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>ID Curso *</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              placeholder="ID del curso"
              value={state.id_curso.toString()}
              onChangeText={(value) => handleInputChange('id_curso', parseInt(value) || 0)}
              editable={!isSubmitting && !examenToEdit}
              keyboardType="numeric"
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
                {examenToEdit ? 'Actualizar' : 'Crear'} Examen
              </Text>
            )}
          </TouchableOpacity>

          {examenToEdit && (
            <TouchableOpacity
              style={[styles.deleteButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleDeletePress}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.deleteButtonText}>Eliminar Examen</Text>
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
  textArea: {
    textAlignVertical: 'top',
    paddingVertical: 12,
  },
  readOnlyInput: {
    backgroundColor: '#f3f4f6',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  tipoButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  tipoButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  tipoButtonText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6b7280',
  },
  tipoButtonTextActive: {
    color: '#ffffff',
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
