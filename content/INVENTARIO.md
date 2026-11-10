# Inventario de cuadernos

Generado por concatenación de `content/inventario/*.md` (T03). Páginas en `pagina_pdf`.

| Cuaderno | Págs | Año de vida | Notas |
|---|---|---|---|
| patrones-sensoriales | 69 | quinto | evidencia explícita; 25 entradas |
| lectura-imagenes-4-5 | 39 | quinto | 15 actividades |
| aprendo-con-mi-entorno | 94 | mixto (quinto + sexto) | 25 actividades; instrucciones separadas por año |
| pre-escritura | 55 | **verificar** (sexto, baja) | sin edad impresa; decisión pendiente |
| lectura-imagenes-general | 45 | **cuarto (3–4 años)** | fuera del rango quinto/sexto |
| juegos-de-tarjetas | 262 | **verificar** | 131 láminas sin actividades ni orientaciones |
| nociones-matematica | 66 | sexto | 29 ejercicios |
| relaciones-espaciales | 37 | sexto (deducido) | ~17 actividades |
| lectura-imagenes-5-6 | 35 | sexto | 15 actividades |
| analisis-fonico-5-6 | 41 | sexto | 18 actividades |
| diagnostico-egreso-5-6 | 11 | sexto | hojas de trabajo, sin metas escritas |
| tareas-diagnosticas-preescolar | 14 | sexto (media) | 9 láminas, sin consignas |

Ningún PDF requiere OCR para sus instrucciones; las láminas se leen visualmente.


---

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

---

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

---

# Inventario: diagnostico-egreso-5-6

Archivo: `sources/pdf/diagnostico-egreso-5-6.pdf`. Título: "Actividades diagnósticas para niños que egresan de la Primera Infancia. Cuaderno de Trabajo, cinco a seis años de vida" (M. Sc. Juana Cristina Menéndez Díaz y Lic. Yenisey de la Caridad González Fermín; © MINED / Editorial Pueblo y Educación, 2024).

## 1. Datos

- Total de páginas: **11** (formato apaisado, 4:3).
- Texto nativo (umbral ~80 caracteres): solo pdf 3 (1802 car., créditos y copyright) y pdf 2 (171 car., portadilla). El resto no tiene texto útil: pdf 1 (101, portada), 4 (8), 5 (12), 6 (24), 7 (35), 8 (200, pero solo 2 viñetas de orientación y el número de página), 9 (45), 10 (1), 11 (0).
- Páginas que requieren lectura visual u OCR: **4–7 y 9–10** (láminas con títulos en imagen, sin texto extraíble o casi). 8 tiene texto nativo corto. 11 es contraportada ilustrada.
- Desfase: `pagina_impresa = pagina_pdf − 3` para pdf 4–10 (pdf 4 = impresa 1, pdf 8 = 5, pdf 9 = 6, pdf 10 = 7; verificado). Las páginas 1–3 y 11 no llevan número impreso.

## 2. Índice

No hay índice impreso. Estructura observada:

| pdf | Contenido |
|---|---|
| 1 | Portada |
| 2 | Portadilla con autores |
| 3 | Créditos, ISBN, copyright |
| 4 | TRAZADO |
| 5 | FORMA Y COLOR |
| 6 | ORGANIZACIÓN PERCEPTUAL |
| 7 | RELACIONES CUANTITATIVAS |
| 8 | PRODUCCIÓN: RECORTE, RASGADO, DIBUJO Y COLOREADO (indicaciones) |
| 9 | PRODUCCIÓN: ... (lámina de trabajo; sin texto salvo el título) |
| 10 | Lámina sin título (circo/payaso, trazo, conjuntos de puntos: 9 rojos y 5+4 verdes) |
| 11 | Contraportada |

## 3. Secciones de actividades

Son láminas de evaluación para que el niño responda, sin consignas escritas para el adulto salvo en pdf 8.

- **pdf 4 (impr. 1) Trazado**: líneas guía con modelo (zigzag, arcos, lazos, óvalos) y renglón vacío al lado para copiar. Papel.
- **pdf 5 (impr. 2) Forma y color**: figuras (triángulo, cuadrado, círculo, rectángulo, óvalo) y seis construcciones con formas (camión, payaso, casa, tren, perro, pájaro).
- **pdf 6 (impr. 3) Organización perceptual**: cuadrículas de puntos (2x3 y 3x3) con modelo para reproducir uniendo puntos.
- **pdf 7 (impr. 4) Relaciones cuantitativas**: tira numérica 1–10 con casillas vacías debajo.
- **pdf 8–9 (impr. 5–6) Producción**: recorte, rasgado, dibujo y coloreado. La pdf 9 no tiene instrucciones; su lámina (recortable) hay que verla.
- **pdf 10 (impr. 7)**: probablemente continúa Relaciones cuantitativas / trazo (laberinto del payaso al circo; comparación de conjuntos). Sin título ni consigna: **verificar** a qué sección pertenece.

## 4. Orientaciones al adulto

Prácticamente no hay. Solo pdf 8: "El rectángulo se recorta por el adulto y se le entrega al niño para que lo rasgue por el doblez." y "El círculo se entrega separado de la hoja del cuaderno para que el niño lo recorte." No existen consignas de aplicación ni criterios de evaluación en este PDF (probablemente están en otro documento metodológico, no incluido). Para `content/orientaciones/` solo hay material en pdf 8.

## 5. Año de vida real

**`sexto`**. Evidencia: portada y portadilla dicen "cinco a seis años de vida"; título "para niños que egresan de la Primera Infancia" (egreso al grado preescolar). No es material del quinto año.

## 6. Notas para la extracción

- No contiene metas ni indicadores escritos: es un cuaderno de láminas diagnósticas. Las metas de egreso no se pueden extraer de aquí por texto; solo se infieren de la tarea de cada lámina (confianza baja).
- Estimación de metas implícitas por dimensión: motricidad ~2 (trazado, recorte/rasgado), relacion_entorno ~3 (forma y color, organización perceptual, relaciones cuantitativas), estetica ~1 (dibujo y coloreado), comunicacion 0, social_personal 0. Total ~6, todas inferidas.
- Lectura visual necesaria en pdf 4–7, 9 y 10. No hay texto que OCR pueda leer; basta render a baja resolución.
- Como ficha: material de evaluación, no de trabajo diario. Para un niño de 4–5 años sirve de referencia hacia dónde va el 6.º año, no como actividades del quinto.
- Para metas reales de egreso (con texto) buscar en otros cuadernos del sexto año.

---

# Inventario: juegos-de-tarjetas.pdf

Fuente: `sources/pdf/juegos-de-tarjetas.pdf` (título interno: "juego de tarjetas NUEVO.indd"). Es un mazo de tarjetas ilustradas, no un cuaderno con texto.

## 1. Datos

- Páginas PDF: 262 (424 x 595 pt, formato tarjeta).
- Texto nativo: ninguna página llega al umbral de 80 caracteres. Solo las páginas pares (2, 4, ..., 262) tienen texto nativo, de 5 a 33 caracteres: el número de tarjeta y su nombre (ejemplo p. 2: "1 / Cuchara"). Las páginas impares son una imagen CMYK de página completa sin texto.
- Páginas que necesitan OCR: ninguna es necesaria para el texto. El texto de las páginas pares ya se extrae con `pdftotext` (lista completa de 131 nombres en 3). Las imágenes (páginas impares) requieren lectura visual solo si se quiere describir la lámina.
- Numeración impresa: no hay números de página impresos. Lo que se imprime es el número de tarjeta N. Regla: tarjeta N = imagen en `pagina_pdf = 2N - 1`, nombre/número en `pagina_pdf = 2N`.
- Irregularidades: no hay portada, índice, créditos ni introducción en el PDF. La página 1 ya es la lámina de la tarjeta 1 (cuchara).

## 2. Índice

No tiene índice impreso. Estructura deducida de los nombres (pagina_pdf, imagen + nombre):

| Tarjetas | pagina_pdf | Tema (deducido de los nombres) |
|---|---|---|
| 1-26 | 1-52 | Objetos del hogar (cuchara, plato, vaso, mesa, plancha ... cuna) |
| 27-40 | 53-80 | Animales (pato, gallo, perro ... chivo) |
| 41-46 | 81-92 | Alimentos (pan, huevo, galletas, helado, caramelo, cake) |
| 47-56 | 93-112 | Medios de transporte (avión ... carreta con caballo) |
| 57-69 | 113-138 | Niño y niña, ropa y pelota (niño, niña, zapatos ... medias) |
| 70-76 | 139-152 | Aseo (peine, cepillo dental, taza sanitaria, orinal, jabón, toalla) |
| 77-82 | 153-164 | Naturaleza (sol, lluvia, nubes, flores: rosa, girasol, marpacífico) |
| 83-89 | 165-178 | Frutas (naranja, guayaba, frutabomba, piña, melón, platanitos, mango) |
| 90-101 | 179-202 | Viandas y vegetales (pepino ... yuca) |
| 102-109 | 203-218 | Animales con sus crías (yegua con potrico ... pata con paticos) |
| 110-117 | 219-234 | Acciones del adulto con el niño (dar de comer, bañar, lavar, tender, planchar, vestir, pasear, dormir) |
| 118-124 | 235-248 | Acciones y estados del niño (abrazarse, jugar con pelota, llorar, sonreír, cruzar la calle, mamá con bebé) |
| 125-131 | 249-262 | Partes del cuerpo (ojos, oreja, brazo, mano, pierna, pie, dedo) |

Los límites entre temas son una agrupación mía a partir de los nombres, no títulos del documento. Ej.: 68 Pelota y 69 Medias quedan en "ropa", y 90 Pepino y 91 Plátano vianda pueden verse como fruta o vianda.

## 3. Unidades o secciones de actividades

No hay unidades. Todo el PDF (pp. 1-262) es una sola sección: 131 tarjetas con lámina a color (impar) y nombre (par). No hay actividades, instrucciones ni evaluación escritas. El PDF solo trae las láminas.

## 4. Orientaciones al adulto

No hay ninguna en el PDF (ni texto nativo ni páginas de texto en imagen). Nada que extraer a `content/orientaciones/` de este archivo. Si hubiera una guía de uso del mazo, estaría en otro cuaderno (verificar en `PLAN.md` / inventario de los demás PDFs).

## 5. Año de vida real

`verificar`. Evidencia: el PDF no trae portada, introducción, ni mención de año de vida o edad. Los contenidos (objetos cotidianos, animales, familias de animales, partes del cuerpo, acciones familiares) son vocabulario básico de nominación, plausible en edades tempranas, pero eso no prueba el año. Falta: la guía de uso o el cuaderno complementario de Educa a tu Hijo que indique para qué año/edad se usan estas tarjetas, o la ficha del catálogo en la Biblioteca CubaEduca.

## 6. Notas para la extracción de fichas

- Disposición: una tarjeta = 2 páginas (imagen en 2N-1, nombre en 2N). Sin texto de actividad.
- Fichas: no hay actividades en el cuaderno, así que de aquí no salen fichas sin inventar. Recomendación: tratar el mazo como **material de lámina** (131 láminas con nombre) que otras fichas puedan referenciar (por ejemplo "nombrar objetos", "animales y sus crías", "partes del cuerpo"). Una ficha por actividad redactada exigiría inventar la actividad, lo que el proyecto prohíbe. Decisión pendiente para el padre/parent: si estas láminas se usan solo como apoyo visual de otras fichas.
- Dimensión probable si se usa como apoyo: `comunicacion` (vocabulario, nominación, lectura de imágenes); algunas tarjetas de `relacion_entorno` (animales, naturaleza, alimentos) y `social_personal` (110-124: rutinas y emociones, 121-122 llorar/sonreír).
- OCR/lectura visual: ninguno para el texto. Lectura visual solo si se quiere describir láminas (impares).
- Número de actividades estimado: 0 explícitas; 131 láminas utilizables.
- Peso: el mayor del lote de imágenes CMYK; revisar compresión para el APK (la lámina es un JPEG de 300 ppi por página).

---

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

---

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

---

# Inventario: lectura-imagenes-general

Fuente: `sources/pdf/lectura-imagenes-general.pdf`. Cuaderno de actividades "Lectura de imágenes", Primera Infancia, Editorial Pueblo y Educación, 2023 (ISBN 978-959-13-3808-2).

## 1. Datos

- Páginas PDF: 45 (formato apaisado, 792 x 594 pt).
- Texto nativo (>80 caracteres): p. 2-4 y todas las pares de la 6 a la 44 (20 páginas, 721-1157 caracteres cada una).
- Sin texto (0 caracteres): p. 1 (portada), p. 5 y todas las impares hasta la 43 (láminas ilustradas), p. 45 (contraportada). Son imágenes: no hay nada que "OCRear" salvo que se quiera leer rótulos dentro de la ilustración; se necesita lectura visual de la lámina.
- Páginas que requieren OCR para el texto: ninguna.
- Página impresa = página_pdf − 4, solo en las páginas de instrucciones (pares 6-44 → impresas 2-40). Las láminas (impares) y las páginas 1-4 y 45 no muestran número impreso. La p. 4 (Orientaciones) no tiene número.

## 2. Índice (por página_pdf)

| pagina_pdf | Contenido |
|---|---|
| 1 | Portada |
| 2 | Portada interior: autoras |
| 3 | Créditos, ISBN |
| 4 | Orientaciones al educador |
| 5-44 | 20 pares lámina (impar) + instrucciones (par) |
| 45 | Contraportada |

## 3. Unidades o secciones de actividades

No hay unidades ni evaluación. Una sola secuencia de 20 pares, lámina a la izquierda en la secuencia (impar) y su texto de orientación en la página par siguiente:

| Lámina (pdf) | Instrucciones (pdf / impresa) |
|---|---|
| 5, 7, 9, ... 43 (impares) | 6/2, 8/4, 10/6, 12/8, 14/10, 16/12, 18/14, 20/16, 22/18, 24/20, 26/22, 28/24, 30/26, 32/28, 34/30, 36/32, 38/34, 40/36, 42/38, 44/40 |

Temas muestreados: playa (6), cumpleaños (8), mercado (12), cocina con la abuela (14), cortesía (22), papá baña al niño (26), policía y semáforo (34), leche y animales (40), música (44).

## 4. Orientaciones al adulto

- p. 4: "Orientaciones al educador": propósito del cuaderno, juego de "leer" las imágenes, el adulto lee una parte y el niño comunica lo que ve.
- Cada página par 6-44: pauta propia de esa lámina (pregunta inicial, tiempo para la lectura, valor a destacar, tarea final, "nueva lectura de la imagen"). Son orientaciones por ficha, no un bloque general; se extraen con la ficha.

## 5. Año de vida real

**Ni quinto ni sexto: el cuaderno es para 3-4 años (cuarto año de vida).** Evidencia:
- Portada (p. 1): "Lectura de imágenes. Tres a cuatro años de edad. Primera infancia".
- p. 2: "LECTURA DE IMÁGENES / PRIMERA INFANCIA / TRES A CUATRO AÑOS DE EDAD".
- p. 4: "El cuaderno de lectura de imágenes dirigido a los niños de 3 a 4 años...".

Valor para el campo `anio_vida`: no cabe en {quinto, sexto}. Marcar `verificar`/decisión del padre: puede usarse como repaso o no incluirse; no inventar equivalencia. Nota: el nombre del archivo ("general") no indica la edad; el PLAN.md lo da como "4–5" en la lista de S4 y hay que corregirlo contra esta evidencia.

## 6. Notas para la extracción de fichas

- Una ficha por lámina: ~20 actividades (pares pdf 5/6 a 43/44).
- Estructura de cada orientación: motivación con pregunta, lectura libre de la imagen, mensaje de valor, tarea breve (rellenar con color, marcar o unir con una línea, o colocar una ficha), nueva lectura.
- Dimensión principal: `comunicacion` (lectura de imágenes, expresión oral). Secundarias según la lámina: `relacion_entorno` (colores, partes del cuerpo, animales), `social_personal` (cortesía, familia, hábitos), `motricidad` (rellenar/unir con lápiz, en papel), `estetica` (música, colorear).
- Lectura visual necesaria en las láminas impares para describir el material. Las orientaciones citan "figuras en la parte derecha de la hoja, tapadas", pero en p. 13 la lámina no muestra esas figuras: verificar con la lámina si están en la propia página o se omiten (p. 13 solo muestra la escena).
- Soporte: lámina del cuaderno más lápiz/crayola; usar `papel` cuando se rellena o traza.

---

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

---

# Inventario: patrones-sensoriales

Cuaderno de Actividades "Los patrones sensoriales y sus variaciones" (Primera Infancia, Tercer Perfeccionamiento). Archivo: `sources/pdf/patrones-sensoriales.pdf`.

## 1. Datos

- Total de páginas: **69**.
- Texto nativo (≥ ~80 caracteres): pdf 2–6, 8, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 34, 36, 39, 41, 43, 45, 48, 51, 54, 57, 60, 63, 66. Es la página de instrucciones de cada actividad (~200–480 caracteres; la introducción en pdf 5 tiene ~2200).
- Sin texto (≤ 2 caracteres): las demás (pdf 7, 9, 11, 12, 14, 15, 17, 18, 20, 22, 24, 26, 28, 30, 31, 33, 35, 37, 38, 40, 42, 44, 46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62, 64, 65, 67, 68) y pdf 69 (vacía). Son **láminas ilustradas** (imagen pura); no hay texto que OCRear salvo que la lámina lleve rótulos (en la muestra, pdf 7, no los lleva). pdf 1 (portada, 84 caracteres) tiene texto nativo corto.
- Número impreso de página = **pagina_pdf − 4** (pdf 5 = impresa 1, introducción; pdf 6 = 2; pdf 68 = 64). pdf 1–4 sin número impreso.
- Irregularidad: los números del índice impreso (pdf 4) NO coinciden con los números impresos reales de las páginas (ej. Actividad 3 figura en 7, pero está en la impresa 6; Actividad 21.1 figura en 76, pero está en la impresa 62). Usar siempre pagina_pdf de la tabla de abajo, no el índice.

## 2. Índice

| Bloque | pagina_pdf |
|---|---|
| Portada | 1 |
| Autores ("cuatro a cinco años de vida") | 2 |
| Créditos y nota legal | 3 |
| Índice | 4 |
| Introducción | 5 |
| Actividades 1 a 21.1 | 6–68 |
| Página vacía | 69 |

## 3. Unidades o secciones de actividades

Cada actividad: una página de instrucciones (título, objetivo, tareas) seguida de 1–2 láminas para trabajar con el niño. Las tareas son de marcar, encerrar, rellenar, recortar y pegar, tapar con fichas, seriar o armar.

| Actividad | pagina_pdf | Tema (objetivo resumido) |
|---|---|---|
| 1 La cesta de flores | 6–7 | Identificar flores según el color |
| 2 Las mariposas de colores | 8–9 | Identificar mariposas según el color |
| 3 Jugando a mezclar colores | 10–12 | Mezclar primarios (rojo+amarillo = anaranjado) |
| 4 Jugando a mezclar colores | 13–15 | Mezclar primarios para obtener secundario |
| 4.1 Jugando a mezclar colores | 16–18 | Ídem, otro secundario |
| 5 Los gorros de payasín | 19–20 | Matices del rojo |
| 5.1 | 21–22 | Matices del azul |
| 5.2 | 23–24 | Matices del amarillo |
| 6 El mantel de colores | 25–26 | Color y sus variaciones, tapar con fichas |
| 7 Las pelotas de colores | 27–28 | Seriar círculos por matices |
| 8 Los globos para el cumpleaños | 29–31 | Identificar por la forma |
| 9 Las figuras geométricas | 32–33 | Figuras geométricas planas |
| 10 Las diferentes formas de los objetos | 34–35 | Variaciones de las figuras en objetos |
| 11 El collar de mamá | 36–38 | Seriar figuras según el modelo |
| 12 Ordenar las flores por su tamaño | 39–40 | Correspondencia entre dos series por tamaño (recortar y pegar) |
| 13 ¿Cuál es igual? | 41–42 | Elemento de igual tamaño en una serie |
| 14 La pirámide de igual tamaño | 43–44 | Ídem |
| 15 Armar con figuras geométricas | 45–47 | Variación de forma (triángulo) |
| 16 Adornar la blusa | 48–50 | Tamaño/color/forma, percepción analítica |
| 17 Jugar con las figuras | 51–53 | Variaciones de tamaño/color/forma |
| 18 Adornemos el mantel | 54–56 | Ídem |
| 19 Armar el tren | 57–59 | Ídem |
| 20 Armar el camión | 60–62 | Ídem |
| 21 Armar el rompecabezas | 63–65 | Modelos gráficos para armar rompecabezas |
| 21.1 Armar el rompecabezas | 66–68 | Ídem, variante |

Total: 25 entradas (actividades 1–21 más 4.1, 5.1, 5.2 y 21.1).

## 4. Orientaciones al adulto

- pdf 5 (Introducción): propósito del cuaderno (complementa el trabajo con objetos reales, no lo sustituye); el 5.º año de vida y los patrones color, forma y tamaño; tipos de ejercicio (identificar, comparar, clasificar, seriar, modelar); preparar materiales antes (recortar, lápices, témperas, agua, fichas); dar orientación clara y atender la diversidad.
- Notas dentro de actividades (en la página de instrucciones, p. ej. pdf 39 Actividad 12 sobre recortar y pegar en dos momentos; pdf 48 Actividad 16 que remite a "pasos metodológicos para la percepción analítica"): ayudas puntuales al agente educativo; extraer con cada ficha.

## 5. Año de vida real

**quinto**. Evidencia: pdf 2 "cuatro a cinco años de vida"; pdf 5 "complementar el desarrollo sensorial de los niños de 4 a 5 años de edad" y "En el 5.º año de vida los niños alcanzan un desarrollo sensorial...".

## 6. Notas para la extracción de fichas

- Una ficha por actividad (25 entradas; las variantes 4.1, 5.1, 5.2, 21.1 pueden ser fichas propias o variante de la base, decidir en T08).
- Dimensión: `relacion_entorno` (la introducción lo dice: dimensión Relación con el Entorno; patrones sensoriales de color, forma, tamaño). Actividades de recortar/rellenar/pegar tienen componente motriz fino, pero la dimensión principal sigue siendo `relacion_entorno`.
- Texto de instrucciones: extraíble nativamente (pdftotext) en la primera página de cada actividad; no hace falta OCR.
- Lectura visual necesaria: las láminas (páginas sin texto) para describir materiales y la lámina a usar; pdf 7 es una cesta con flores de colores sin texto. No hay páginas escaneadas que requieran OCR.
- Soporte: las tareas con lápiz, recortar y pegar son en papel/lámina impresa; las de fichas (Act. 6) usan objetos reales; imprimir o usar la lámina del PDF.

---

# Inventario: pre-escritura.pdf (slug `pre-escritura`)

Cuaderno "Preescritura" (M. Sc. María Antonia Rosés Garcés y Lic. Amanda María Rojas Bastard; Editorial Pueblo y Educación, 3.ª ed. 2006, © MINED 1995). Cuaderno de trabajo del niño, apaisado (596 x 448 pt).

## 1. Datos
- Total: **55 páginas PDF**.
- Texto nativo: pdf 2 (portadilla, 147 car.), pdf 3 (créditos, 368 car.), pdf 4 ("Al educador", 2385 car.).
- pdf 1 (portada) y pdf 55 (contraportada): 0 caracteres, solo imagen.
- pdf 5–54: ~55 caracteres cada una, solo el membrete de imprenta ("4P-17 Impresión… Página N"). **No hay texto útil: todo es visual**, no hace falta OCR de texto (no tiene texto que reconocer), sino lectura visual de los trazos.
- Desfase: las páginas del cuaderno no llevan número impreso visible; el membrete de imprenta da "Página N" solo en las impares: `N = 2·pagina_pdf − 9` (pdf 5 → "Página 1", pdf 54 → "Página 99"). Es numeración de imprenta, no de cuaderno; usar **pagina_pdf** como referencia. Las pdf 2 y 4 llevan "Página I" y "Página III" (preliminares).

## 2. Índice
No tiene índice impreso.
| pagina_pdf | Contenido |
|---|---|
| 1 | Portada |
| 2–3 | Portadilla y créditos |
| 4 | "Al educador" (orientaciones) |
| 5–54 | Páginas de trazado |
| 55 | Contraportada |

## 3. Secciones de actividades
- **pdf 5–54 (50 páginas)**: ejercicios de trazado de rasgos caligráficos sin unidades ni títulos. Cada página tiene un modelo arriba (rasgo ya trazado entre renglones, a veces con ilustración de cuento: coche–casa, mariposa–flor, pájaro–casita) y debajo renglones vacíos para que el niño trace; en las páginas con ilustración, abajo a la derecha están los patrones de forma (arco, raya, bucle, óvalo). Rasgos vistos: líneas, zigzag, bucles, óvalos, arcos (p. ej. pdf 12 zigzag; pdf 30 bucles; pdf 54 combinación arco-bucle en 4 renglones). Las páginas posteriores usan renglones de 4 líneas (escritura con tamaño).
- No hay evaluación ni láminas aparte.

## 4. Orientaciones al adulto
- **pdf 4 ("Al educador")**: importancia de las habilidades caligráficas (orientación espacial, coordinación viso-motora, motricidad fina); el niño construye primero el modelo del rasgo con puntos de referencia y patrón de forma, luego traza sin apoyos; mantener estado emocional positivo y motivación; origen en investigación del ICCP.
- No hay más bloques de orientación.

## 5. Año de vida real
**`sexto`** (con cautela). Evidencia: pdf 4 dice que los logros "crean condiciones propicias para el aprendizaje exitoso de la escritura en el primer grado" y que colaboraron "maestros del grado preescolar". El cuaderno no indica explícitamente "sexto año de vida" ni la edad; la inferencia viene de "grado preescolar". Falta confirmar con el PLAN/otros cuadernos si el quinto año usa trazos más simples (las primeras páginas, pdf 5–11, son rasgos básicos que podrían servir a 4–5 años). Marcar `confianza: baja` hasta que lo confirme el padre.

## 6. Notas para extracción de fichas
- Sin texto: las fichas se redactan viendo cada página; el contenido es el rasgo a trazar.
- Disposición: 1 página = 1 rasgo/ejercicio. Estimación: **~25 a 50 actividades** (agrupando por rasgo, ~20–25 fichas; una por página, 50).
- Dimensión: `motricidad` (fina, preescritura). `soporte = "papel"` siempre.
- Materiales: lápiz y la lámina impresa (la página). No se traza en pantalla.
- Requiere lectura visual: todas las pdf 5–54 (identificar el rasgo y el tipo de renglón). OCR no aplica.

---

# Inventario: Relaciones espaciales (`relaciones-espaciales`)

Fuente: `sources/pdf/relaciones-espaciales.pdf`. Cubierta: "RELACIONES ESPACIALES, Cuaderno de Trabajo, Preescolar" (J. López Hurtado, A. M. Siverio Gómez, M. T. Burke Beltrán). Pueblo y Educación, 3.ª ed. 2006. "Libro de distribución gratuita".

## 1. Datos

- Total: **37 páginas PDF**. Cada página PDF es un **pliego doble** (~1199 x 803 pt): lámina a un lado, texto del adulto al otro.
- Texto nativo: **las 37 páginas tienen capa de texto**, pero es mínima. Solo pdf 3 (créditos, ~750 car.) pasa de 80 caracteres de forma clara; las páginas de consigna (5, 7, ..., 37) tienen 66–217 car. (algunas rondan el umbral de 80: 7, 9, 11, 19, 21, 27, 29, 31, 33, 35). Las láminas (pdf 4, 6, ..., 36) tienen ~28 car. (solo la cabecera de imprenta "Tripa ... Página N"): son imágenes, **sin texto**.
- Regla de numeración: **pagina_impresa = pagina_pdf − 3**. pdf 1 = cubierta, pdf 2 = portada (impresa "I"), pdf 3 = créditos, pdf 4 = impresa 1, ..., pdf 37 = impresa 34. Verificado en render (pdf 32 muestra impresa 29). Sin irregularidades.
- Pliegos: pdf par (4–36) = lámina, impresa impar (1–33); pdf impar (5–37) = consigna, impresa par (2–34).
- Necesita OCR: **ninguna página** para el texto de consignas (es nativo). Las láminas requieren lectura visual, no OCR.

## 2. Índice

El cuaderno no trae índice ni unidades.

| pdf | Contenido |
|---|---|
| 1 | Cubierta |
| 2 | Portada y autores |
| 3 | Créditos y derechos |
| 4–37 | 17 ejercicios (lámina + consigna) |

## 3. Secciones de actividades

Pares lámina+consigna, en bloques temáticos inferidos de las consignas (no rotulados en el libro):

| pdf (lámina / consigna) | Impresa | Tema |
|---|---|---|
| 4/5 | 1–2 | Ubicar animales en cuadrícula (fila/columna), marcar |
| 6/7, 8/9 | 3–6 | Izquierda/derecha (gatico, pelota) |
| 10/11 | 7–8 | Entre (media entre delantal y saya), colorear |
| 12/13 | 9–10 | Debajo, a la derecha (posiciones respecto a la mesa) |
| 14/15, 16/17 | 11–14 | Direcciones (arriba, izquierda...) con fichas |
| 18/19, 20/21, 22/23, 24/25 | 15–22 | Laberintos y caminos guiados por modelo o flechas |
| 26/27, 28/29 | 23–26 | Colorear según modelo (pelotas, ventanas) |
| 30/31, 32/33, 34/35 | 27–32 | Trazar caminitos uniendo puntos (cuadrículas de puntos) |
| 36/37 | 33–34 | Comparar caminitos con el modelo |

## 4. Orientaciones al adulto

No hay bloque de orientaciones. Solo hay consignas de una o dos líneas en cada pdf impar (5–37). Notas metodológicas aisladas: "Aprovechar al máximo las posibilidades que brinda este ejercicio" (pdf 5, 37); "Podrán utilizarse otras órdenes" (pdf 13); "Repetir la actividad con las otras posiciones" (pdf 17); "se estimulará al niño a que explique por qué es igual o en qué se diferencia" (pdf 37). Nada que extraer a `content/orientaciones/` salvo estas frases.

## 5. Año de vida real

**`sexto`**. Evidencia: la cubierta y la portada dicen "Cuaderno de Trabajo **Preescolar**" (el grado preescolar es el 6.º año de vida, 5–6 años, según CLAUDE.md). Es una edición anterior al Tercer Perfeccionamiento (2006), sin indicación explícita de edad. Hay actividades de trazo y de orientación espacial que podrían servir al quinto año, pero la fuente no lo declara; marcar `confianza: "baja"` si se usa en `quinto`.

## 6. Notas para la extracción de fichas

- Una ficha por ejercicio: **17 actividades** (pares pdf 4/5 a 36/37). La consigna al niño está en la página impar; la lámina, en la par anterior. `pagina_pdf` de la ficha = la lámina (par).
- Dimensión: `relacion_entorno` (relaciones espaciales) en general. Los ejercicios de trazar por puntos (pdf 30–35, impresas 27–32) son `motricidad` y deben llevar `soporte = "papel"`. Los de colorear (pdf 10, 26, 28) también implican motricidad fina en papel.
- Las láminas son de un solo uso (marcar, colorear, trazar sobre el cuaderno): la variante sin lámina debe usar objetos reales (juguetes, caja, mesa) para izquierda/derecha, entre, debajo.
- Lectura visual necesaria en todas las láminas para describir qué se muestra y el modelo de laberintos; el texto de consigna sale directo con `pdftotext`.
- Los pdf 4/5 (ubicar en cuadrícula) y 36/37 (comparar caminitos) son los más abstractos; revisar con confianza media.

---

# Inventario: tareas-diagnosticas-preescolar

Archivo: `sources/pdf/tareas-diagnosticas-preescolar.pdf`. "Cuaderno de trabajo para tareas diagnósticas de preescolar", Josefina López Hurtado y Ana María Siverio Gómez. © MINED / Editorial Pueblo y Educación, 2011. ISBN 978-959-13-2211-1. "Libro de distribución gratuita, prohibida su venta" (portada).

## 1. Datos

- Total de páginas: 14 (formato apaisado, 668x469 pt aprox. en portada).
- Texto nativo (umbral ~80 caracteres): solo la pág. 4 (311 car., créditos). Las págs. 2-3 (83 y 140 car.) y 5-13 (46-68 car.) solo traen texto de marcas de imprenta ("1CT-45_Tripa 1/4/11 Página N") y el título corto de la lámina. Págs. 1 y 14: 0 car.
- Contenido real (págs. 5-13): imágenes de 1200 ppi en blanco y negro (stencil CCITT) sin texto. No hay OCR útil: son láminas para mirar, no texto que extraer.
- Desfase página PDF a página impresa: la marca "Página N" de cada lámina es 1, 3, 5, ..., 17 para las págs. PDF 5 a 13, es decir `pagina_impresa = 2*pagina_pdf - 9` (págs. PDF 5-13). Es la numeración del pliego de imprenta (las páginas pares son el reverso, que no está incluido), no un número visible para el lector. Págs. 2-4 llevan I, III, IV (romanos). Portada (1) y contraportada (14) sin número. Para la app, referirse a la lámina por `pagina_pdf`.

## 2. Índice

No hay índice impreso. Estructura deducida de los títulos de lámina:

| pagina_pdf | Marca impresa | Título |
|---|---|---|
| 1 | - | Portada |
| 2 | I | Portadilla |
| 3 | III | Autoras |
| 4 | IV | Créditos, ISBN |
| 5 | 1 | Coordinación visomotora |
| 6 | 3 | Trazado de rasgos |
| 7 | 5 | Recorte, rasgado, coloreado y trazado |
| 8 | 7 | Percepción visual de la forma |
| 9 | 9 | Semejanzas |
| 10 | 11 | Diferencias |
| 11 | 13 | Organización perceptiva |
| 12 | 15 | Relación fondo-figura |
| 13 | 17 | Relaciones cuantitativas |
| 14 | - | Contraportada |

## 3. Unidades o secciones de actividades

No hay unidades. Son 9 láminas de trabajo (págs. 5-13), una tarea diagnóstica por lámina, sin consignas escritas en el PDF:

- 5 Coordinación visomotora: unir con línea cada figura con su pareja (payaso-tren, gato-plato, auto-casa, conejo-zanahoria) siguiendo caminos recta/curva (visto).
- 6 Trazado de rasgos; 7 Recorte, rasgado, coloreado y trazado: trabajo en papel (motricidad fina). Contenido no visto.
- 8 Percepción visual de la forma; 11 Organización perceptiva; 12 Relación fondo-figura (opciones 1, 2, 3): no vistos en detalle.
- 9 Semejanzas y 10 Diferencias: filas de figuras, letras y sílabas (RUN/RON/NUR, GA/GU/AG, XS/SX, NES/SEN) para marcar la igual o la distinta.
- 13 Relaciones cuantitativas: filas A, B, C de cuadros con 0-4 círculos, X o asteriscos (cantidad).

## 4. Orientaciones al adulto

Ninguna. El cuaderno no trae texto introductorio, consignas, criterios de evaluación ni indicadores. Nada que extraer a `content/orientaciones/`. Las consignas habrá que redactarlas (instrucción al padre) a partir de la lámina.

## 5. Año de vida real

`sexto`. Evidencia: el título dice "tareas diagnósticas de preescolar" y, según el contexto del proyecto, preescolar es el grado del sexto año de vida (5-6). El PDF no dice "sexto año" ni edades en texto, así que la asignación es por el título; confianza media. Para el niño de 4-5 años es material de anticipación, no del año actual.

## 6. Notas para la extracción

- No hay tareas con texto ni indicadores. Cada lámina es una tarea; no hay metas redactadas, así que este cuaderno aporta poco a `metas.json` por sí solo (solo qué se explora, no qué se espera). Habrá que verificar si otra fuente (p. ej. orientaciones de diagnóstico) las trae.
- Estimado de fichas (una por lámina, todo papel/lámina): motricidad 3 (págs. 5-7), relacion_entorno 6 (págs. 8-13: percepción de forma, semejanzas, diferencias, organización, fondo-figura, cantidad), comunicacion 0-2 (págs. 9-10 usan letras y sílabas, posible análisis fónico/lectura), estetica 0, social_personal 0. Todo con `confianza: baja` hasta ver las láminas.
- Lectura visual necesaria en las 9 láminas (5-13): el contenido es imagen sin texto, OCR no sirve; hay que verlas. Solo se miraron las págs. 5, 9 y 13; las demás se infieren por título.
- No aplicable: portada, créditos, contraportada (págs. 1-4, 14).
