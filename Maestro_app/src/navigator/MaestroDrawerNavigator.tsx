import React from "react";
import { Text, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HomeReproductorScreen } from "../screens/HomeMaestrosScreen";
import { MaestrosPorAreaScreen } from "../screens/MaestrosPorAreaScreen";
import { CursosPorMaestroScreen } from "../screens/CursosPorMaestroScreen";
import { ExamenesTipoScreen } from "../screens/ExamenesTopoScreen";
import { ExamenesPorFechaScreen } from "../screens/ExamenesPorFechaScreen";
import { ContarExamenesPorCursoScreen } from "../screens/ContarExamenesPorCursoScreen";
import { CursosPorGrupoScreen } from "../screens/CursosPorGrupoScreen";
import { MaestrosPorNivelScreen } from "../screens/MaestrosPorNivelScreen";
import { CursosConExamenesScreen } from "../screens/CursosConExamenesScreen";
import { MaestroDetailScreen } from "../screens/MaestroDetailScreen";
import { CursoDetailScreen } from "../screens/CursoDetailScreen";
import { ExamenDetailScreen } from "../screens/ExamenDetailScreen";
import { MaestroCRUDScreen } from "../screens/MaestroCRUDScreen";
import { CursoCRUDScreen } from "../screens/CursoCRUDScreen";
import { ExamenCRUDScreen } from "../screens/ExamenCRUDScreen";

export type MaestroDrawerParamList = {
  HomeStack: undefined;
  MaestrosAreaStack: undefined;
  CursosMaestroStack: undefined;
  ExamenesTipoStack: undefined;
  ExamenesFechaStack: undefined;
  ContarExamenesStack: undefined;
  CursosGrupoStack: undefined;
  MaestrosNivelStack: undefined;
  CursosExamenesStack: undefined;
};

const Drawer = createDrawerNavigator<MaestroDrawerParamList>();
const Stack = createNativeStackNavigator();

const commonHeaderOptions = ({ navigation }: any): NativeStackNavigationOptions => ({
  headerShown: true,
  headerStyle: {
    backgroundColor: "#ffffff",
  },
  headerTintColor: "#667eea",
  headerTitleStyle: {
    fontWeight: "700" as const,
    fontSize: 18,
  },
  headerLeft: () => (
    <Text
      style={{
        fontSize: 24,
        marginLeft: 12,
        color: "#667eea",
      }}
      onPress={() => navigation?.openDrawer?.()}
    >
      ☰
    </Text>
  ),
});

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="Home"
        component={HomeReproductorScreen}
        options={{
          title: "Inicio",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const MaestrosAreaStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="MaestrosPorArea"
        component={MaestrosPorAreaScreen}
        options={{
          title: "Maestros por Área",
        }}
        initialParams={{ area: "" }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const CursosMaestroStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="CursosPorMaestro"
        component={CursosPorMaestroScreen}
        options={{
          title: "Cursos por Maestro",
        }}
        initialParams={{ idMaestro: 0 }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const ExamenesTipoStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="ExamenesTipo"
        component={ExamenesTipoScreen}
        options={{
          title: "Exámenes por Tipo",
        }}
        initialParams={{ tipo: "Parcial" }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const ExamenesFechaStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="ExamenesPorFecha"
        component={ExamenesPorFechaScreen}
        options={{
          title: "Exámenes por Fecha",
        }}
        initialParams={{ fecha: "" }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const ContarExamenesStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="ContarExamenes"
        component={ContarExamenesPorCursoScreen}
        options={{
          title: "Contar Exámenes",
        }}
        initialParams={{ idCurso: 0 }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const CursosGrupoStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="CursosPorGrupo"
        component={CursosPorGrupoScreen}
        options={{
          title: "Cursos por Grupo",
        }}
        initialParams={{ grupo: "" }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const MaestrosNivelStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="MaestrosPorNivel"
        component={MaestrosPorNivelScreen}
        options={{
          title: "Maestros por Nivel",
        }}
        initialParams={{ nivelAcademico: "" }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

const CursosExamenesStack = () => {
  return (
    <Stack.Navigator screenOptions={commonHeaderOptions}>
      <Stack.Screen
        name="CursosConExamenes"
        component={CursosConExamenesScreen}
        options={{
          title: "Cursos con Exámenes",
        }}
      />
      <Stack.Screen
        name="CursoDetail"
        component={CursoDetailScreen}
        options={{
          title: "Detalle del Curso",
        }}
      />
      <Stack.Screen
        name="MaestroDetail"
        component={MaestroDetailScreen}
        options={{
          title: "Detalle del Maestro",
        }}
      />
      <Stack.Screen
        name="ExamenDetail"
        component={ExamenDetailScreen}
        options={{
          title: "Detalle del Examen",
        }}
      />
      <Stack.Screen
        name="MaestroCRUD"
        component={MaestroCRUDScreen}
        options={{
          title: "Maestro",
        }}
      />
      <Stack.Screen
        name="CursoCRUD"
        component={CursoCRUDScreen}
        options={{
          title: "Curso",
        }}
      />
      <Stack.Screen
        name="ExamenCRUD"
        component={ExamenCRUDScreen}
        options={{
          title: "Examen",
        }}
      />
    </Stack.Navigator>
  );
};

export const MaestroDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          color: "#1f2937",
        },
        drawerActiveTintColor: "#667eea",
        drawerInactiveTintColor: "#6b7280",
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          drawerLabel: "Inicio",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="MaestrosAreaStack"
        component={MaestrosAreaStack}
        options={{
          drawerLabel: "Maestros por Área",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👥</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="CursosMaestroStack"
        component={CursosMaestroStack}
        options={{
          drawerLabel: "Cursos por Maestro",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📚</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="ExamenesTipoStack"
        component={ExamenesTipoStack}
        options={{
          drawerLabel: "Exámenes por Tipo",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📝</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="ExamenesFechaStack"
        component={ExamenesFechaStack}
        options={{
          drawerLabel: "Exámenes por Fecha",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📅</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="ContarExamenesStack"
        component={ContarExamenesStack}
        options={{
          drawerLabel: "Contar Exámenes",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔢</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="CursosGrupoStack"
        component={CursosGrupoStack}
        options={{
          drawerLabel: "Cursos por Grupo",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👫</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="MaestrosNivelStack"
        component={MaestrosNivelStack}
        options={{
          drawerLabel: "Maestros por Nivel",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🎓</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="CursosExamenesStack"
        component={CursosExamenesStack}
        options={{
          drawerLabel: "Cursos con Exámenes",
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📊</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
