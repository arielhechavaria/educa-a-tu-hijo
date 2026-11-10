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
