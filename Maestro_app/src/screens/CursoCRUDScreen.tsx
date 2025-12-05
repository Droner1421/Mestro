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
import { useFormCurso } from '../hooks/useFormCurso';
import { CursoData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'CursoCRUD'>;

export const CursoCRUDScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, handleInputChange, handleSubmit, handleDelete, setFormData } = useFormCurso();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cursoToEdit = route.params?.curso as CursoData | undefined;
  const idMaestroParam = route.params?.idMaestro as number | undefined;

  React.useEffect(() => {
    if (cursoToEdit) {
      setFormData({
        id_curso: cursoToEdit.id_curso,
        id_maestro: cursoToEdit.id_maestro,
        nombre: cursoToEdit.nombre,
        clave: cursoToEdit.clave,
        grupo: cursoToEdit.grupo,
        horario: cursoToEdit.horario,
        salon: cursoToEdit.salon,
      });
    } else if (idMaestroParam) {
      setFormData({
        id_curso: 0,
        id_maestro: idMaestroParam,
        nombre: "",
        clave: "",
        grupo: "",
        horario: "",
        salon: "",
      });
    }
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);
    await handleSubmit();
    Alert.alert('Éxito', cursoToEdit ? 'Curso actualizado' : 'Curso creado');
    navigation.goBack();
    setIsSubmitting(false);
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Curso',
      '¿Estás seguro de que deseas eliminar este curso?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: async () => {
            setIsSubmitting(true);
            await handleDelete();
            Alert.alert('Éxito', 'Curso eliminado');
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
        <Text style={styles.title}>{cursoToEdit ? 'Editar Curso' : 'Crear Curso'}</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese nombre del curso"
              value={state.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Clave *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: MAT101"
              value={state.clave}
              onChangeText={(value) => handleInputChange('clave', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Grupo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: A, B, C"
              value={state.grupo}
              onChangeText={(value) => handleInputChange('grupo', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Salón *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 101"
              value={state.salon}
              onChangeText={(value) => handleInputChange('salon', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Horario *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 08:00-10:00"
              value={state.horario}
              onChangeText={(value) => handleInputChange('horario', value)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>ID Maestro *</Text>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              placeholder="ID del maestro"
              value={state.id_maestro.toString()}
              onChangeText={(value) => handleInputChange('id_maestro', parseInt(value) || 0)}
              editable={!isSubmitting && !cursoToEdit}
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
                {cursoToEdit ? 'Actualizar' : 'Crear'} Curso
              </Text>
            )}
          </TouchableOpacity>

          {cursoToEdit && (
            <TouchableOpacity
              style={[styles.deleteButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleDeletePress}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.deleteButtonText}>Eliminar Curso</Text>
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
  readOnlyInput: {
    backgroundColor: '#f3f4f6',
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
