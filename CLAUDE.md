# Proyecto "10 minutos": contexto estable

## Qué es

App Android 100 % offline, de uso personal, que me guía a mí (el padre) para trabajar **10 minutos al día** con mi hijo de 4 años. Él está en el **quinto año de vida** (4–5 años) del programa cubano **Educa a tu Hijo** (Primera Infancia, MINED). El año que viene pasa al **sexto año de vida** (grado preescolar).

La fuente de contenido son los cuadernos oficiales de Primera Infancia del MINED (Editorial Pueblo y Educación, 2024), publicados en la Biblioteca CubaEduca.

## Principios del producto (no negociables)

- **La app es para el padre, no para el niño.** La pantalla dice qué hacer, con qué materiales y dónde está la lámina. La actividad se hace con él, casi siempre con lápiz, papel u objetos reales.
- **La motricidad fina (trazos, preescritura, rellenar) se hace en papel**, nunca con el dedo en la pantalla.
- **Nada de gamificación, puntajes, porcentajes ni lenguaje de "atraso".** Los resúmenes describen y no califican.
- **No se inventan actividades.** Todo sale de los cuadernos. Lo único redactado por el agente es la instrucción al padre, la variante sin lámina y la señal de logro.
- **Uso personal.** Los PDFs son material con ISBN de Pueblo y Educación. No se preparan para redistribuir ni se publica nada.

## Marco curricular (Tercer Perfeccionamiento)

Dimensiones (campo `dimension`):
- `comunicacion`: lenguaje, lectura de imágenes, narración, análisis fónico
- `motricidad`: fina (preescritura, trazos) y gruesa
- `relacion_entorno`: patrones sensoriales (color, forma, tamaño), relaciones espaciales, nociones matemáticas, mundo natural y social
- `estetica`: plástica, música, expresión
- `social_personal`: hábitos, normas, emociones, identidad, figuras patrias

Año de vida (campo `anio_vida`): `quinto` (4–5) o `sexto` (5–6).

## Stack

- Vite + TypeScript + Capacitor para generar el APK. Persistencia local con Capacitor Preferences o SQLite.
- **Repositorio privado.** Los PDFs originales (~157 MB en total, el mayor de 64 MB) viven en `sources/pdf/` bajo **Git LFS**, con `sources/MANIFEST.json` (url, tamaño, sha256).
- En el APK van **versiones comprimidas** de los PDFs (Ghostscript), no los originales. Presupuesto del APK: menos de 60 MB.
- Visor de PDF con pdf.js, que abre directo en la página de la ficha.
- Sin backend, sin cuentas, sin analítica y sin red.
- Objetivo: Android 8+ de gama baja, letra grande, uso con una mano y modo oscuro.
- Scripts de extracción en Node/TypeScript o Python, lo que sea más simple para PDF y OCR (`tesseract -l spa`).

## Testing

- TDD sí para la **lógica pura**: validador del esquema de fichas y algoritmo de selección diaria y repetición espaciada.
- TDD no para la UI ni para los scripts de extracción de un solo uso (basta con validar su salida contra el esquema).

## Plan de trabajo y modelos

El plan maestro está en `PLAN.md`: todas las tareas, sus dependencias, el modelo asignado por complejidad y los criterios de cierre. Cada feature de ODD toma sus tareas de ahí. Al delegar a un subagente, usa el modelo que indica la tarea. Si una tarea falla dos veces con su modelo, sube un nivel (haiku → sonnet → opus) y anótalo en la evidencia.

## Idioma

Código e identificadores en inglés. Contenido, UI y documentos de tareas en español de Cuba.
