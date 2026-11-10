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
