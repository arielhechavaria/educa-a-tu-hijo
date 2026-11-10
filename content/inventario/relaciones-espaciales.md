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
