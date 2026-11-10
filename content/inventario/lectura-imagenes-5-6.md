# Inventario: lectura-imagenes-5-6

Archivo: `sources/pdf/lectura-imagenes-5-6.pdf`. Título: "Lectura de imágenes. Cuaderno de actividades, cinco a seis años de edad" (Pueblo y Educación / MINED, 2024, ISBN 978-959-13-4563-9).

## 1. Datos

- Total de páginas PDF: 35 (formato apaisado, 791 x 594 pt).
- Texto nativo (>= 80 caracteres): pdf 3-5, 7, 9, 11, ..., 33 (todas las impares de 3 a 33).
- Sin texto útil (láminas ilustradas, 0-2 caracteres): pdf 1, 6, 8, 10, ..., 34 (pares de 6 a 34) y 35 (contracubierta). pdf 2 tiene 157 caracteres (portada interior con título y autoras).
- Necesitan OCR: ninguna página con texto. Las láminas (pares) se leen visualmente, no hay texto que extraer.
- Desfase: `pagina_impresa = pagina_pdf - 4` (pdf 5 = pág. 1; pdf 6 = pág. 2; pdf 33 = pág. 29). Las páginas pdf 1-4 y 35 no llevan número impreso. Sin irregularidades observadas.

## 2. Índice

No hay índice impreso. Estructura observada:

| pagina_pdf | Contenido |
|---|---|
| 1 | Cubierta |
| 2 | Portada interior (título, autoras) |
| 3 | Créditos, edición, ISBN |
| 4 | Orientaciones al educador |
| 5-34 | 15 actividades, cada una en un par: texto (impar) + lámina (par) |
| 35 | Contracubierta |

## 3. Unidades o secciones de actividades

Sin unidades temáticas. Son 15 actividades numeradas (ACTIVIDAD 1 a 15). Cada una: página impar con las instrucciones al adulto y página par con la lámina a color y, a la derecha, un recuadro punteado con figuras para seleccionar.

| Act. | pdf texto | pdf lámina |
|---|---|---|
| 1 | 5 | 6 |
| 2 | 7 | 8 |
| 3 | 9 | 10 |
| 4 | 11 | 12 |
| 5 | 13 | 14 |
| 6 | 15 | 16 |
| 7 | 17 | 18 |
| 8 | 19 | 20 |
| 9 | 21 | 22 |
| 10 | 23 | 24 |
| 11 | 25 | 26 |
| 12 | 27 | 28 |
| 13 | 29 | 30 |
| 14 | 31 | 32 |
| 15 | 33 | 34 |

No hay sección de evaluación.

## 4. Orientaciones al adulto

- pdf 4: "Orientaciones al educador". Propósito del cuaderno (descubrir el significado de las imágenes y realizar actividades que contribuyen al desarrollo social-personal, estético, motriz y a la relación con el entorno, con la comunicación como eje); cómo usarlo: jugar a "leer" las imágenes, el adulto lee una parte y el niño comunica lo que ve.
- Dentro de cada actividad (pdf 5-33, impares) el texto es a la vez orientación y guion de la actividad, no hay bloques separados.

## 5. Año de vida real

**sexto** (5-6 años). Evidencia: portada interior "CUADERNO DE ACTIVIDADES, cinco a seis años de edad" (pdf 2) y pdf 4: "dirigido a los niños de 5 a 6 años". El nombre de archivo (`5-6`) coincide. Nota: sirve como material para el año que viene; el niño actual (quinto año) aún no lo trabaja como tal.

## 6. Notas para la extracción de fichas

- Una ficha por actividad: unas 15 fichas (la lámina de la página par es el material; la página impar da la instrucción).
- Dimensión principal: `comunicacion` (lectura de imágenes, narración). Secundarias frecuentes: `relacion_entorno` y `social_personal` (ej. act. 1 ordenar juguetes; act. 15 abuelos y vida de Martí, `social_personal`); `estetica`/`motricidad` cuando se pide rellenar con colores (ej. act. 2: rellenar papalotes y pelotas; esto va en papel/lápiz).
- Patrón repetido: leer la imagen con preguntas, luego descubrir las figuras del borde derecho y marcarlas con color o ficha, y releer. Soporte: lámina (`soporte` según esquema; el marcado con color es en papel).
- Todo el texto es nativo; no hace falta OCR. La lámina de cada actividad hay que verla (pdf pares 6-34) para citar la "página de la lámina" en la ficha.
- Revisar `confianza: baja` solo si la dimensión es ambigua (varias actividades mezclan dimensiones).
