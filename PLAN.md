# PLAN.md: plan de trabajo "10 minutos"

Plan maestro del proyecto. Las features de ODD (`odd/tasks/*.md`) toman sus tareas de aquí. Si el plan cambia, se actualiza este archivo y se anota el motivo al final.

## Criterio de asignación de modelos

| Modelo | Cuándo | Ejemplos |
|---|---|---|
| `haiku` | Tareas mecánicas, deterministas, con salida fácil de verificar | Descargas, scaffolding, generar tablas, compilar |
| `sonnet` | Implementación normal y extracción guiada por un esquema claro | Leer un cuaderno y sacar fichas, pantallas, capa de datos |
| `opus` | Juicio pedagógico, diseño de algoritmos, decisiones que afectan todo lo demás, revisión independiente | Metas de egreso, clasificación cruzada, scheduler, revisión final |

Regla de escalado: si una tarea falla dos veces con su modelo, sube un nivel y anótalo en la evidencia.
Regla de revisión: una tarea marcada `opus` como revisión **no la revisa el mismo subagente que hizo el trabajo**.

---

## Feature 1: `contenido-cuadernos`

| ID | Tarea | Modelo | Depende de | Paralelizable | Cierre |
|---|---|---|---|---|---|
| T01 | Inicializar el repo privado, Git LFS (`*.pdf`), `.gitattributes`, `.gitignore` y la estructura `sources/ content/ scripts/ app/` | haiku | — | — | `git lfs track` muestra `*.pdf` |
| T02 | Descargar los 12 PDFs a `sources/pdf/` con nombres legibles y generar `sources/MANIFEST.json` (item, media, url, bytes, sha256) | haiku | T01 | sí | 12 archivos con los bytes de la tabla de fuentes; commit por LFS |
| T03 | Inventario por PDF: páginas, si hay texto extraíble o hace falta OCR, índice, unidades, orientaciones al adulto y año de vida real → `content/INVENTARIO.md` | sonnet | T02 | sí (por PDF) | Los 12 inventariados; los "verificar" ya tienen año de vida |
| T04 | Validador del esquema de ficha y de meta, con TDD | sonnet | T01 | sí | Tests en verde con casos válidos e inválidos |
| T05 | OCR (`tesseract -l spa`) de los PDFs escaneados → `sources/ocr/{cuaderno}/p{n}.txt` | haiku | T03 | sí | Un txt por página escaneada |
| T06 | Control de calidad del OCR: muestrear páginas, marcar las ilegibles y decidir cuáles se leen como imagen | sonnet | T05 | sí | Lista de páginas a leer visualmente |
| T07 | Extraer las orientaciones al adulto → `content/orientaciones/{cuaderno}.md` | sonnet | T03 | sí | Una por cuaderno que las tenga |
| T08 | Extraer fichas, **una subtarea por cuaderno** (T08.a … T08.l), empezando por los de prioridad del quinto año → `content/actividades/{cuaderno}.json` | sonnet | T03, T04, T06 | sí (por cuaderno) | Todas pasan el validador y tienen `pagina_pdf` y `texto_fuente` |
| T09 | Extraer las metas de egreso de los diagnósticos (630, 477) → `content/metas.json`, mapeadas a dimensión | opus | T03, T04 | — | Cada meta con cuaderno, página y dimensión |
| T10 | Revisión cruzada: coherencia de dimensión y año de vida entre cuadernos, duplicados, `duracion_min` realistas, y relación fichas ↔ metas | opus | T08, T09 | — | Reporte de cambios aplicados y confianza recalculada |
| T11 | Generar `content/REVISAR.md`: tabla completa, dudosas arriba, conteos por cuaderno, dimensión, año de vida y confianza, y metas sin fichas que las trabajen | haiku | T10 | — | Archivo generado por script (reproducible) |
| GATE | **Revisión humana de `REVISAR.md`. La Feature 2 no empieza sin mi aprobación.** | — | T11 | — | Mi OK explícito |

## Feature 2: `app-10-minutos`

| ID | Tarea | Modelo | Depende de | Paralelizable | Cierre |
|---|---|---|---|---|---|
| T12 | Scaffold Vite + TS + Capacitor Android, lint, test runner y estructura `app/` | haiku | GATE | — | `npx cap sync android` funciona |
| T13 | Pipeline de assets: comprimir los PDFs con Ghostscript a `app/public/pdf/`, copiar `content/` y medir tamaños | sonnet | T12 | sí | Total de assets < 55 MB; páginas legibles en el móvil |
| T14 | **Scheduler** (módulo puro, TDD): plan diario de unos 10 min (3 a 5 fichas), rotación de dimensiones, repetición espaciada, prioridad de fichas nuevas en orden de cuaderno, y determinista por fecha y estado | opus | T12 | sí | Tests en verde con casos límite: pocas fichas, todo dominado, cambio de año de vida |
| T15 | Capa de datos: progreso, historial, exportar e importar JSON y migraciones de versión | sonnet | T12 | sí | Exportar → importar conserva todo (test) |
| T16 | Pantalla **Hoy** + temporizador de 10:00 que avisa al terminar pero no corta | sonnet | T14, T15 | — | Funciona en modo avión |
| T17 | Pantalla **Ficha** + visor pdf.js en `pagina_pdf` | sonnet | T13, T16 | — | 5 fichas de cuadernos distintos abren la página correcta (evidencia) |
| T18 | Registro en un toque + pantalla **Semana** (resumen por dimensión, compartible como texto) | sonnet | T15, T16 | — | El resumen no usa notas ni porcentajes |
| T19 | Pantalla **Ajustes**: año de vida, duración (10 min por defecto), exportar e importar | haiku | T15 | sí | — |
| T20 | Pase de calidad: rendimiento en gama baja, letra grande, una mano, modo oscuro | sonnet | T16–T19 | — | Checklist con evidencia |
| T21 | Compilar el APK debug + README (regenerar contenido, comprimir PDFs, compilar) | haiku | T20 | — | Ruta del APK y su tamaño |
| T22 | **Revisión final independiente** contra los principios de `CLAUDE.md` (app para el padre, motricidad en papel, sin gamificación, sin inventar actividades) | opus | T21 | — | Reporte con hallazgos por riesgo; yo decido la entrega |

## Fuentes (URLs directas verificadas)

| Item | Media | Archivo sugerido | URL | Bytes |
|---|---|---|---|---|
| 627 | 628 | patrones-sensoriales.pdf | https://biblioteca.cubaeduca.cu/files/original/18be7110eeb69cac278b42a06ad32f0d9c91ebc8.pdf | 2045320 |
| 190 | 475 | pre-escritura.pdf | https://biblioteca.cubaeduca.cu/files/original/2166a87b62b792d8a771ff9132e1ba8bb4924cd6.pdf | 1651189 |
| 619 | 620 | lectura-imagenes-4-5.pdf | https://biblioteca.cubaeduca.cu/files/original/68dff9ca496c85e5d2f8f53aaeac6d7bd65bbc94.pdf | 4040400 |
| 621 | 622 | aprendo-con-mi-entorno.pdf | https://biblioteca.cubaeduca.cu/files/original/bc31c34b3c1033a90d4f4a10145878abdda86d13.pdf | 28625493 |
| 192 | 257 | relaciones-espaciales.pdf | https://biblioteca.cubaeduca.cu/files/original/b6cd909b38f442d1f225ade6fc8bd3d9c88ec226.pdf | 12379030 |
| 187 | 474 | nociones-matematica.pdf | https://biblioteca.cubaeduca.cu/files/original/5e94ecd34ee09356c1111eba02def265b4657fd0.pdf | 11374644 |
| 550 | 616 | juegos-de-tarjetas.pdf | https://biblioteca.cubaeduca.cu/files/original/f8f372036f611787be56684e2a706fb8f2f95eb2.pdf | 64476882 |
| 552 | 615 | lectura-imagenes-general.pdf | https://biblioteca.cubaeduca.cu/files/original/9e174e78648b8ffba7e1e22ecda40984d86958e1.pdf | 17145410 |
| 623 | 624 | lectura-imagenes-5-6.pdf | https://biblioteca.cubaeduca.cu/files/original/77e57007f390362f7bcbc991744acd7118731c34.pdf | 12143302 |
| 625 | 626 | analisis-fonico-5-6.pdf | https://biblioteca.cubaeduca.cu/files/original/09358ffb358c015f851f6138cec6cc645243dc95.pdf | 1575734 |
| 629 | 630 | diagnostico-egreso-5-6.pdf | https://biblioteca.cubaeduca.cu/files/original/eeba35e255393acf57d0f89c71326aa8a888a05e.pdf | 809957 |
| 476 | 477 | tareas-diagnosticas-preescolar.pdf | https://biblioteca.cubaeduca.cu/files/original/125baecfe700bd651480329e59b91946ce7c04e2.pdf | 759593 |

Total aproximado: 157 MB.

## Registro de cambios del plan

- (vacío)
