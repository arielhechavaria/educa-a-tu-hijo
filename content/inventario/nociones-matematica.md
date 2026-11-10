# Inventario: Cuaderno de nociones elementales de Matemática

Archivo: `sources/pdf/nociones-matematica.pdf` (slug `nociones-matematica`). Autoras: Elena Cruz Ruiz, Mercedes Molina Rivas, Lourdes Cartaya Greciet. Editorial Pueblo y Educación (tercera edición 2006, séptima reimpresión 2013).

## 1. Datos

- Páginas PDF: 66 (hojas apaisadas, ~791 x 594 pt).
- Texto nativo (>80 caracteres): pdf 1, 2, 4–7, 9, 11, 13, 15, 17, 19, ..., 63, 66 (cubiertas, créditos, presentación y todas las páginas de instrucciones, que son las impares del 7 al 63).
- Sin texto útil (solo número de página/cabecera, ~55 caracteres): pdf 3, 8, 10, 12, 14 y todas las pares hasta la 64, y la 65. Son láminas ilustradas (imagen JPEG a 150 ppi) o páginas en blanco. No necesitan OCR para extraer texto, pero la lámina solo se lee mirándola.
- OCR necesario: ninguno para el texto. Lectura visual necesaria para las láminas.
- Desfase: `pagina_impresa = pagina_pdf − 5` (pdf 6 = pág. 1, pdf 7 = pág. 2, pdf 64 = pág. 59). Irregularidades: pdf 1–5 y 65–66 no llevan número impreso; la cabecera interna del PDF dice "Página I/III/1..." de la maqueta original y no es fiable.

## 2. Índice

| pagina_pdf | Contenido |
|---|---|
| 1 | Portada |
| 2–4 | Anteportada, página en blanco, portadilla con autoras |
| 5 | Créditos y ISBN |
| 6 | "A los maestros del grado preescolar" (presentación) |
| 7–64 | 29 ejercicios (ver sección 3) |
| 65 | Sin contenido (blanca) |
| 66 | Contraportada |

No hay índice impreso.

## 3. Unidades o secciones de actividades

Estructura repetida: cada ejercicio ocupa un par de páginas. Ejercicio N: instrucción (texto) en pdf 5+2N y lámina (ilustración a color) en pdf 6+2N.

| Ejercicios | pagina_pdf | Tema |
|---|---|---|
| 1–4 | 7–14 | Formación de conjuntos por una característica común, aspecto cualitativo (color, tamaño, dirección) y cuantitativo |
| 5–8 | 15–22 | Comparación de conjuntos (global; correspondencia, enlazar) |
| 9 | 23–24 | Reconocimiento de conjuntos, pertenencia |
| 10–17 | 25–40 | Aspecto cuantitativo: reconocimiento de cantidades (hasta 10), acción de contar, formar y comparar conjuntos |
| 18–24 | 41–54 | Relación parte-todo |
| 25–29 | 55–64 | Comparación de longitudes, acción de medir, solución de problemas |

## 4. Orientaciones al adulto

- pdf 6: presentación a los maestros (uso del cuaderno, selección de tareas según nivel del niño, dibujar/marcar con lápiz para reutilizar, tapar con fichas). Una sola página.
- Cada página de instrucciones (pdf 7–63 impares) trae la consigna al maestro dentro del propio ejercicio; no hay bloques de orientaciones independientes.

## 5. Año de vida real

**sexto**. Evidencia: pdf 6, "A los maestros del grado preescolar"; "Este cuaderno se ha elaborado con el fin de facilitar tu labor y la ejercitación de los niños en los contenidos de Nociones Elementales de Matemática". El grado preescolar corresponde al sexto año de vida. Contenidos (cantidades hasta 10, contar, parte-todo, medir longitudes y resolver problemas) coherentes con ese nivel. Algunas tareas iniciales (conjuntos por color y tamaño, ejercicios 1–9) podrían servir al quinto año, pero el cuaderno no lo declara; se mantiene `sexto`.

## 6. Notas para la extracción de fichas

- Una ficha por ejercicio (29), aunque cada ejercicio contiene varias tareas ("tapar con fichas los aviones rojos y grandes...", etc.); la consigna es texto nativo y se puede extraer sin OCR. Posible subdivisión a criterio del extractor.
- Dimensión: `relacion_entorno` (nociones matemáticas) en todas. Alguna tarea de dibujar o marcar con lápiz (ej. ejercicios 25–29) puede tener componente `motricidad`, con confianza baja.
- Soporte: lámina del cuaderno más fichas/objetos para tapar o marcar con lápiz; las tareas se hacen sobre la lámina, con lápiz, no con el dedo en pantalla. El ejercicio 29 pide una unidad de medida impresa de longitud fija (hay que conservar la escala de la lámina).
- Lámina de cada ejercicio: pdf 6+2N (ej. ejercicio 5, lámina en pdf 16). Páginas pdf 8 y 10 contienen imagen de lámina (ejercicios 1 y 2).
- Lectura visual solo para identificar qué muestra la lámina (objetos, cantidades), no por OCR.
- Los niveles de dificultad crecen con el número de ejercicio; los primeros (1–9) son los más cercanos al quinto año, útiles para el año siguiente de práctica.
