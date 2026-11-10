# Inventario: Análisis Fónico. Cuaderno de actividades, cinco a seis años de vida

Slug: `analisis-fonico-5-6` · Archivo: `sources/pdf/analisis-fonico-5-6.pdf` · Editorial Pueblo y Educación / MINED, 2024 (ISBN 978-959-13-4572-1).

## 1. Datos

- Total de páginas: **41** (formato apaisado, tipo diapositiva).
- Texto nativo (>80 caracteres): pdf 3–5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39 (todas las impares de 3 a 39). Las de instrucciones tienen entre 170 y 2058 caracteres sin espacios.
- Sin texto útil (<80 caracteres; son láminas ilustradas): pdf 1, 2, 6, 8, 10, 12, ..., 40 (todas las pares de 6 a 40, con 1–42 caracteres: sílabas o palabras sueltas, p. ej. pdf 32 "aeiou", 34 "mls", 36–40 sílabas y palabras) y pdf 41 (contracubierta, 0 caracteres). pdf 1 y 2 son portada y portadilla con 58 y 139 caracteres.
- OCR: no hace falta para las instrucciones. Las láminas pares son dibujos; leerlas visualmente (o con OCR solo en pdf 32–40, que tienen letras/sílabas dentro de la imagen).
- Desfase: `pagina_impresa = pagina_pdf − 4` en pdf 5–40 (pdf 5 = impresa 1, pdf 40 = impresa 36). Las páginas pares llevan también su número impreso (pdf 6 = impresa 2). pdf 1–4 y 41 sin numeración impresa.

## 2. Índice (pagina_pdf)

| pdf | Contenido |
|---|---|
| 1 | Portada |
| 2 | Portadilla con autores |
| 3 | Créditos, colaboración, copyright, ISBN |
| 4 | "Acerca del cuaderno" |
| 5–40 | 18 actividades, 2 páginas cada una (instrucciones + lámina) |
| 41 | Contracubierta (aula ilustrada con cubos A B C) |

## 3. Unidades o secciones de actividades

Cada actividad ocupa un par: página impar con tema, ejercicios para el educando y lista de palabras; página par con la lámina. Excepción: la actividad 18 ocupa pdf 39–40 (la lámina de pdf 40 son palabras para leer).

| Act. | pdf | Tema |
|---|---|---|
| 1 | 5–6 | Las personas que me rodean |
| 2 | 7–8 | Juguemos con las palabras |
| 3 | 9–10 | ¡Qué rico! |
| 4 | 11–12 | Más palabras |
| 5 | 13–14 | La playa |
| 6 | 15–16 | Los animales salvajes |
| 7 | 17–18 | El jardín |
| 8 | 19–20 | Mis huellas |
| 9 | 21–22 | Los juguetes |
| 10 | 23–24 | Animales domésticos |
| 11 | 25–26 | Frutas y vegetales |
| 12 | 27–28 | Igual y diferente |
| 13 | 29–30 | Juguemos con los sonidos |
| 14 | 31–32 | Las vocales |
| 15 | 33–34 | Las consonantes |
| 16 | 35–36 | Muy junticas (sílabas) |
| 17 | 37–38 | ¡A formar palabras! |
| 18 | 39–40 | ¡Ya sé leer! |

Contenido: actividades 1–4 de pronunciar palabras de las láminas (rápido, despacio, alto, bajo) y marcar la imagen que pide la educadora; 5–12 de sonidos de cada palabra (puntos por sonido, contar, lugar de cada sonido); 13–18 de vocales, consonantes, sílabas, formar y leer palabras. No hay sección de evaluación formal.

## 4. Orientaciones al adulto

- pdf 4: "Acerca del cuaderno": propósito (base de la lectura en primer grado), cuándo usarlo (actividad independiente, tercer momento de la actividad programada, tarde, encomienda a la familia), advierte que ninguna actividad se hace solo con el cuaderno y que se ofrecen orientaciones metodológicas a la educadora o promotora del Programa Educa a tu hijo.
- pdf 5–39 (impares): en cada página de actividad, la lista de viñetas ("Observar...", "Pronunciar...", "Marcar...") son las orientaciones metodológicas de esa actividad, junto con "Palabras:" a usar. No hay bloques de orientaciones aparte.

## 5. Año de vida real

**sexto.** Evidencia: portada "Análisis Fónico. Cuaderno de actividades, cinco a seis años de vida"; pdf 4: "Contiene ejercicios para cada uno de los contenidos de Análisis Fónico del sexto año de vida". Es el cuaderno para el año que viene, no para el quinto año actual.

## 6. Notas para la extracción de fichas

- Una ficha por actividad: unas 18 fichas, todas `anio_vida: sexto`. Posible subdividir las actividades largas (8–12) solo si el tutor lo pide; por defecto 1 por actividad.
- Dimensión: `comunicacion` (análisis fónico, lectura de palabras). Las actividades 1–4 también trabajan expresión oral; todas `comunicacion`.
- Soporte: el niño marca con lápiz, cuenta puntos, tapa con fichas; la mayoría usa lámina impresa (la lámina está en la página par siguiente). No son trazos de preescritura, pero marcar/colocar puntos va en papel; el trabajo oral no requiere papel.
- Para cada ficha, `pagina_pdf` = página impar (instrucciones) y la lámina es la siguiente (+1); act. 18 usa pdf 39 y 40.
- Lectura visual necesaria: pdf 6–40 (pares) para saber qué imágenes hay; en las actividades de sonidos (8–12) las palabras ya están en el texto de la página impar. OCR solo para pdf 32–40 si se quieren las sílabas/palabras de las láminas (ya salen con pdftotext).
- Sin OCR para extraer instrucciones: todas las impares 5–39 tienen texto nativo.
