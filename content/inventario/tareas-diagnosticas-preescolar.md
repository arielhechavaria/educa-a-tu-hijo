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
