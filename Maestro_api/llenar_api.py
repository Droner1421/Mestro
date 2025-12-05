import requests
import json
from datetime import datetime, timedelta

# URL base de la API
BASE_URL = "http://localhost:3000/api/maestros"

# Headers para las solicitudes
HEADERS = {
    "Content-Type": "application/json"
}

# Datos de maestros
maestros_data = [
    {
        "nombre": "Juan",
        "apellido": "Pérez",
        "correo": "juan.perez@escola.com",
        "area": "Matemáticas",
        "nivel_academico": "Maestría",
        "fecha_ingreso": "2020-01-15"
    },
    {
        "nombre": "María",
        "apellido": "García",
        "correo": "maria.garcia@escola.com",
        "area": "Español",
        "nivel_academico": "Doctorado",
        "fecha_ingreso": "2019-08-20"
    },
    {
        "nombre": "Carlos",
        "apellido": "López",
        "correo": "carlos.lopez@escola.com",
        "area": "Matemáticas",
        "nivel_academico": "Licenciatura",
        "fecha_ingreso": "2021-02-10"
    },
    {
        "nombre": "Ana",
        "apellido": "Rodríguez",
        "correo": "ana.rodriguez@escola.com",
        "area": "Inglés",
        "nivel_academico": "Maestría",
        "fecha_ingreso": "2020-06-15"
    },
    {
        "nombre": "Pedro",
        "apellido": "Martínez",
        "correo": "pedro.martinez@escola.com",
        "area": "Ciencias",
        "nivel_academico": "Doctorado",
        "fecha_ingreso": "2018-09-01"
    }
]

# Datos de cursos (se asociarán con los maestros creados)
cursos_data = [
    {
        "nombre": "Cálculo I",
        "clave": "MAT101",
        "grupo": "A",
        "horario": "09:00-10:30",
        "salon": "101"
    },
    {
        "nombre": "Cálculo II",
        "clave": "MAT102",
        "grupo": "B",
        "horario": "10:30-12:00",
        "salon": "102"
    },
    {
        "nombre": "Álgebra Lineal",
        "clave": "MAT201",
        "grupo": "A",
        "horario": "13:00-14:30",
        "salon": "103"
    },
    {
        "nombre": "Literatura Española",
        "clave": "ESP101",
        "grupo": "C",
        "horario": "14:30-16:00",
        "salon": "104"
    },
    {
        "nombre": "Redacción",
        "clave": "ESP102",
        "grupo": "A",
        "horario": "16:00-17:30",
        "salon": "105"
    },
    {
        "nombre": "English Conversation",
        "clave": "ENG101",
        "grupo": "B",
        "horario": "09:00-10:30",
        "salon": "106"
    },
    {
        "nombre": "Grammar",
        "clave": "ENG102",
        "grupo": "C",
        "horario": "10:30-12:00",
        "salon": "107"
    },
    {
        "nombre": "Biología General",
        "clave": "BIO101",
        "grupo": "A",
        "horario": "13:00-14:30",
        "salon": "108"
    }
]

# Tipos de exámenes y fechas
tipos_examen = ["Parcial", "Final", "Extraordinario"]
base_date = datetime(2024, 9, 1)

def crear_maestros():
    """Crea maestros en la API"""
    maestros_ids = []
    print("Creando maestros...")
    
    for maestro in maestros_data:
        try:
            response = requests.post(
                BASE_URL,
                json=maestro,
                headers=HEADERS,
                timeout=5
            )
            
            if response.status_code == 201:
                data = response.json()
                maestros_ids.append(data['id_maestro'])
                print(f"✓ Maestro creado: {maestro['nombre']} {maestro['apellido']} (ID: {data['id_maestro']})")
            else:
                print(f"✗ Error al crear maestro {maestro['nombre']}: {response.status_code}")
                print(f"  Respuesta: {response.text}")
        
        except requests.exceptions.ConnectionError:
            print("✗ Error: No se pudo conectar a la API. ¿Está corriendo en http://localhost:3000?")
            return []
        except Exception as e:
            print(f"✗ Error al crear maestro: {str(e)}")
    
    return maestros_ids

def crear_cursos(maestros_ids):
    """Crea cursos asociados con los maestros"""
    cursos_ids = []
    print("\nCreando cursos...")
    
    # Distribuir cursos entre maestros
    maestro_idx = 0
    
    for curso in cursos_data:
        try:
            # Asignar maestro de manera cíclica
            curso_con_maestro = {
                **curso,
                "id_maestro": maestros_ids[maestro_idx % len(maestros_ids)]
            }
            
            response = requests.post(
                f"{BASE_URL}/curso",
                json=curso_con_maestro,
                headers=HEADERS,
                timeout=5
            )
            
            if response.status_code == 201:
                data = response.json()
                cursos_ids.append(data['id_curso'])
                print(f"✓ Curso creado: {curso['nombre']} - {curso['clave']} (ID: {data['id_curso']})")
            else:
                print(f"✗ Error al crear curso {curso['nombre']}: {response.status_code}")
                print(f"  Respuesta: {response.text}")
            
            maestro_idx += 1
        
        except Exception as e:
            print(f"✗ Error al crear curso: {str(e)}")
    
    return cursos_ids

def crear_examenes(cursos_ids):
    """Crea exámenes asociados con los cursos"""
    print("\nCreando exámenes...")
    
    examen_count = 0
    current_date = base_date
    
    for curso_id in cursos_ids:
        # Crear múltiples exámenes por curso
        for tipo in tipos_examen:
            if examen_count >= 20:
                break
            
            try:
                examen_data = {
                    "id_curso": curso_id,
                    "tipo": tipo,
                    "fecha": current_date.strftime("%Y-%m-%d"),
                    "promedio": round(6.5 + (examen_count % 3) * 0.7, 2),
                    "comentarios": f"Evaluación de {tipo.lower()} - Resultados satisfactorios"
                }
                
                response = requests.post(
                    f"{BASE_URL}/examen",
                    json=examen_data,
                    headers=HEADERS,
                    timeout=5
                )
                
                if response.status_code == 201:
                    data = response.json()
                    print(f"✓ Examen creado: {tipo} - Curso {curso_id} - Fecha {examen_data['fecha']} (ID: {data['id_examen']})")
                else:
                    print(f"✗ Error al crear examen: {response.status_code}")
                    print(f"  Respuesta: {response.text}")
                
                examen_count += 1
                current_date += timedelta(days=15)
            
            except Exception as e:
                print(f"✗ Error al crear examen: {str(e)}")
            
            if examen_count >= 20:
                break

def main():
    """Función principal"""
    print("=" * 80)
    print("SCRIPT DE LLENADO DE API - MÓDULO MAESTROS")
    print("=" * 80)
    print(f"\nConectando a: {BASE_URL}")
    print("Comenzando a crear datos de prueba...\n")
    
    # Crear maestros
    maestros_ids = crear_maestros()
    
    if not maestros_ids:
        print("\n✗ No se pudieron crear maestros. Abortando...")
        return
    
    # Crear cursos
    cursos_ids = crear_cursos(maestros_ids)
    
    if not cursos_ids:
        print("\n✗ No se pudieron crear cursos. Abortando...")
        return
    
    # Crear exámenes
    crear_examenes(cursos_ids)
    
    print("\n" + "=" * 80)
    print("✓ PROCESO COMPLETADO EXITOSAMENTE")
    print("=" * 80)
    print(f"\nResumen:")
    print(f"  - Maestros creados: {len(maestros_ids)}")
    print(f"  - Cursos creados: {len(cursos_ids)}")
    print(f"  - Exámenes creados: ~20")
    print("\nPuedes validar los datos en:")
    print(f"  - GET {BASE_URL}")
    print(f"  - GET {BASE_URL}/cursos/all")
    print(f"  - GET {BASE_URL}/examenes/all")

if __name__ == "__main__":
    main()
