# Inventario: lectura-imagenes-4-5

Cuaderno de Actividades "Lectura de imágenes", cuatro a cinco años de edad (MINED / Editorial Pueblo y Educación, 2024). Archivo: `sources/pdf/lectura-imagenes-4-5.pdf`.

## 1. Datos

- Total de páginas: 39 (formato apaisado, 792 x 594 pt).
- Texto nativo (pdftotext, umbral ~80 caracteres): páginas pdf 2 (71 caracteres, solo título), 4–7, 9, 11, 13, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37. Son la portadilla, créditos, orientaciones y las 15 páginas de texto de actividad.
- Sin texto o menos de 80 caracteres (solo imagen o solo número de página): 1, 3, 8, 10, 12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 39. Las pares 8–14 y 18–38 son las láminas de las actividades (solo imagen, el número impreso es el único texto). 1, 3, 15, 16 y 39 son portada, fondos con patrón decorativo o en blanco, y contraportada (vistos en render).
- OCR: no hace falta para el texto. Las láminas se leen visualmente, no por OCR.
- Desfase: `pagina_impresa = pagina_pdf − 5` en las páginas de actividad (pdf 7 = 2; pdf 8 = 3; pdf 38 = 33). Irregularidad: las páginas pdf 15 y 16 (impresas 10 y 11 según la regla) son relleno decorativo/blanco sin número, y la numeración impresa sigue (pdf 17 = 12). Las páginas 1–6 y 39 no llevan número impreso.

## 2. Índice

El cuaderno no trae índice. Estructura observada:

| pagina_pdf | Contenido |
|---|---|
| 1 | Portada |
| 2 | Portadilla: "LECTURA DE IMÁGENES / CUADERNO DE ACTIVIDADES / cuatro a cinco años de edad" |
| 3 | Sin contenido (patrón decorativo) |
| 4–5 | Autores, edición, diseño, créditos, ISBN |
| 6 | Orientaciones al educador |
| 7–14 | Actividades 1 a 4 (texto en página impar, lámina en la siguiente) |
| 15–16 | Relleno decorativo / blanco |
| 17–38 | Actividades 5 a 15 (texto + lámina) |
| 39 | Contraportada |

## 3. Unidades o secciones de actividades

No hay unidades ni evaluación. Una sola secuencia de 15 actividades, cada una con página de texto al adulto y una página de lámina para "leer":

| Actividad | pdf texto | pdf lámina |
|---|---|---|
| 1 | 7 | 8 |
| 2 | 9 | 10 |
| 3 | 11 | 12 |
| 4 | 13 | 14 |
| 5 | 17 | 18 |
| 6 | 19 | 20 |
| 7 | 21 | 22 |
| 8 | 23 | 24 |
| 9 | 25 | 26 |
| 10 | 27 | 28 |
| 11 | 29 | 30 |
| 12 | 31 | 32 |
| 13 | 33 | 34 |
| 14 | 35 | 36 |
| 15 | 37 | 38 |

Cada actividad: motivar, "jugar a leer" la imagen con preguntas, dar tiempo, y una tarea breve (marcar o colocar una ficha, rellenar, recortar y pegar), y cerrar con una nueva lectura. Ejemplos vistos: A1 parque (elegir juguete, rellenar pelota), A2 payaso Colorín (rellenar botones), A3 mariposas (ficha sobre las de igual color), A4 cesta de frutas (rellenar, recortar y pegar en hoja en blanco).

## 4. Orientaciones al adulto

| pagina_pdf | Resumen |
|---|---|
| 6 | "Orientaciones al educador": propósito del cuaderno (disfrutar y descubrir el significado de las imágenes, eje en la comunicación, aporta a lo social-personal, estético, motriz y a la relación con el entorno); las imágenes son sugerencias; organizar a los niños individual y colectivamente; iniciar motivando a "jugar a leer", el adulto lee una parte y el niño continúa. |
| 7, 9, 11, 13, 17 … 37 | Indicaciones por actividad (motivación, preguntas, tarea). Son a la vez la guía de cada ficha, no un bloque general. |

## 5. Año de vida real

**quinto**. Evidencia: portadilla (pdf 2) y portada: "cuatro a cinco años de edad"; pdf 6: "dirigido a los niños de cuatro a cinco años". El slug `4-5` coincide. No hay indicios de sexto año.

## 6. Notas para la extracción de fichas

- Una ficha por actividad: unas 15 fichas (A1–A15), con lámina en `pagina_pdf` impar+1 (ej. A1: texto pdf 7, lámina pdf 8). La ficha debe abrir el visor en la página de la lámina.
- Dimensión principal: `comunicacion` (lectura de imágenes, narración). Secundarias según tarea: `motricidad` (rellenar, recortar y pegar, en papel), `relacion_entorno` (colores, comparación), `social_personal` (cuidado de la naturaleza, abuelos, hábitos), `estetica`. Verificar la dimensión por actividad al extraer; si es dudosa, `confianza: baja`.
- Rellenar/recortar: `soporte = "papel"`.
- Texto de las actividades 1–4, 5–15 ya extraíble con pdftotext (sin OCR). Solo las láminas necesitan lectura visual para describir qué hay en ellas (pdf 8, 10, 12, 14, 18 … 38); se renderizaron como muestra solo 8 y 39.
- Páginas a ignorar: 1, 3, 4, 5, 15, 16, 39.
