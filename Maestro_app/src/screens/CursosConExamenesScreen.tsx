import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCursosConExamenes } from '../hooks/useCursosConExamenes';
import { CursoConExamenesCard } from '../components/CursoConExamenesCard';
import { CursoData } from '../interfaces/reproductorInterface';

type Props = NativeStackScreenProps<any, 'CursosConExamenes'>;

export const CursosConExamenesScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoading, cursos, LoadCursos } = useCursosConExamenes();

  useEffect(() => {
    
    if (cursos.length === 0 && !isLoading) {
      LoadCursos();
    }
  }, []);

  const handleLoadMore = () => {
    if (!isLoading) {
      LoadCursos();
    }
  };

  const handleCursoPress = (curso: CursoData) => {
    navigation.navigate('CursoDetail', { curso });
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    ) : null;
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay cursos con exámenes</Text>
      </View>
    );
  };

  if (isLoading && cursos.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.initialLoaderContainer}>
          <ActivityIndicator size="large" color="#667eea" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id_curso.toString()}
        renderItem={({ item }) => (
          <CursoConExamenesCard
            curso={item}
            onPress={handleCursoPress}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  initialLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
