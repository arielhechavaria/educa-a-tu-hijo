# Inventario: aprendo-con-mi-entorno

Archivo: `sources/pdf/aprendo-con-mi-entorno.pdf`. Título: "Aprendo con mi entorno. Cuaderno de actividades. Primera Infancia" (MINED / Editorial Pueblo y Educación, 2024, ISBN 978-959-13-4571-4). Páginas apaisadas.

## 1. Datos

- Total: **94 páginas PDF**.
- Texto nativo (umbral ~80 caracteres): pdf 2, 4, 5, 6, 8, 9, 12, 15, 18, 20, 22, 27, 31, 34, 37, 41, 44, 47, 50, 54, 57, 60, 64, 68, 74, 78, 82, 85, 89, 93. Son las portadillas, el índice, la introducción y **la página de texto de cada una de las 25 actividades**.
- Sin texto (necesitan OCR o lectura visual; son ilustraciones o páginas en blanco): todas las demás (1, 3, 7, 10, 11, 13, 14, 16, 17, 19, 21, 23-26, 28-30, 32, 33, 35, 36, 38-40, 42, 43, 45, 46, 48, 49, 51-53, 55, 56, 58, 59, 61-63, 65-67, 69-73, 75-77, 79-81, 83, 84, 86-88, 90-92, 94). Tienen solo el número de página impreso (1-2 caracteres).
- Desfase: **pagina_impresa = pagina_pdf − 8** desde la actividad 1 (pdf 9 = impresa 1; pdf 27 = impresa 19; pdf 93 = impresa 85). La introducción es pdf 8 (impresa "I"). Las páginas pdf 1-7 no llevan numeración arábiga. Última página: pdf 94 (impresa 86). Sin irregularidades observadas en las muestras.

## 2. Índice (del propio cuaderno, impresa -> pdf)

| Tema | Impresa | pdf |
|---|---|---|
| Introducción | I | 8 |
| 1 Medios de transporte | 1 | 9-17 |
| 2 Oficios y profesiones | 10 | 18-26 |
| 3 Animales | 19 | 27-36 |
| 4 Niños y niñas | 29 | 37-43 |
| 5 Lugares de la comunidad | 36 | 44-49 |
| 6 Lo vivo y no vivo del entorno | 42 | 50-53 |
| 7 Frutas y vegetales | 46 | 54-59 |
| 8 Plantas | 52 | 60-73 |
| 9 Personalidades | 66 | 74-88 |
| 10 Niños y banderas de otros países | 81 | 89-92 |
| 11 Banderas y trajes típicos | 85 | 93-94 |

pdf 1 portada, 2 portadilla, 3 en blanco, 4 autoras, 5 créditos/ISBN, 6 índice, 7 en blanco.

## 3. Unidades o secciones de actividades

25 actividades numeradas ("ACTIVIDAD 1..25"). Cada una: una página de texto (pdf) seguida de 1-3 páginas de lámina ilustrada y, a veces, una hoja en blanco para dibujar. Página de texto de cada actividad (pdf):

- Transporte: A1 p9, A2 p12, A3 p15
- Oficios y profesiones: A4 p18, A5 p20, A6 p22
- Animales: A7 p27, A8 p31, A9 p34
- Niñas y niños: A10 p37, A11 p41
- Lugares de la comunidad: A12 p44, A13 p47
- Lo vivo y no vivo: A14 p50
- Frutas y vegetales: A15 p54, A16 p57
- Plantas: A17 p60, A18 p64, A19 p68
- Personalidades: A20 p74, A21 p78, A22 p82, A23 p85
- Niños y banderas de otros países: A24 p89
- Banderas y trajes típicos: A25 p93

Las láminas son las páginas sin texto que siguen a cada página de texto (ej.: pdf 10 = lámina de medios de transporte; pdf 11 = hoja en blanco para dibujar).

## 4. Orientaciones al adulto

- pdf 8 (impresa I): Introducción. Resumen: el cuaderno apoya la dimensión "Educación y Desarrollo de la Relación con el Entorno" para niños de 4 a 5 y de 5 a 6 años, en modalidad institucional y no institucional. Las actividades sirven para sistematizar y evaluar, y son ejemplos para que el adulto elabore otras.
- No hay más bloques de orientaciones. Cada página de texto de actividad lleva solo objetivo y consignas, no guía metodológica ni indicadores de logro. Sí hay notas puntuales al adulto entre paréntesis (ej. pdf 27: "Si el niño no selecciona la ballena, el adulto puede igual ofrecer una explicación...").

## 5. Año de vida real

**mixto** (quinto y sexto). Evidencia: portadilla (pdf 2 y 4): "Cuatro a cinco y de cinco a seis años de edad"; introducción: "para los niños de 4 a 5 y de 5 a 6 años de edad". Cada actividad separa explícitamente "Actividad para 5to. año de vida:" y "Actividades para 6to. año de vida:" (pdf 9, 12, 15, 27...). Para el niño actual (quinto) sirve solo la parte "5to. año de vida"; las consignas de 6to. quedan para el año siguiente.

## 6. Notas para la extracción de fichas

- Diseño: cada página de texto = objetivo + lista de consignas del 5to año + lista de consignas del 6to año. Algunas páginas (ej. pdf 27) usan dos columnas; usar `pdftotext -layout` y separar columnas con cuidado.
- Estimación: 25 actividades, cada una con ~1-5 consignas para 5to y ~1-3 para 6to. Una ficha por consigna o por actividad agrupando sus consignas de 5to es decisión de T08. Orden de magnitud: ~25 fichas de quinto + ~25 de sexto, o ~60-90 si se separan consignas.
- Dimensión predominante: `relacion_entorno` (mundo natural y social). Algunas consignas de dibujar o encerrar/enlazar/marcar con (x) son `motricidad` (en papel); conversar o describir es `comunicacion`; personalidades y banderas, trajes típicos y niñas y niños tocan `social_personal` (figuras patrias, identidad). Marcar `confianza: "baja"` donde sea dudoso.
- Soporte: las consignas de marcar/encerrar/enlazar/dibujar/tapar con fichas se hacen sobre la lámina impresa en papel; "hoja en blanco" = hoja aparte.
- Lámina de cada actividad: páginas pdf sin texto contiguas a la de texto. La mención exacta de qué lámina (pdf) corresponde a cada consigna requiere **lectura visual** (no hay OCR útil: las láminas son ilustraciones). Verificar en T05/T08 qué páginas son lámina y cuáles hoja en blanco.
- OCR: no es necesario para el texto de las consignas (todo nativo). Solo hace falta lectura visual de las láminas para precisar qué se ve en ellas.
- Instrucción "tapa con fichas/círculos" (ej. pdf 60, 64, 93) requiere material manipulable; en la variante sin lámina se necesita redactar la adaptación.
