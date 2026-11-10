# contenido-cuadernos
Objetivo: 12 PDFs bajo Git LFS → banco de fichas y metas JSON validado, listo para revisión. Rama: `feat/contenido-cuadernos`.
Estrategia de entrega: ask-on-risk. Runner de tests: por definir en T04 (node:test o pytest).

## Specs
- S1: "Tener en el repo los 12 PDFs oficiales bajo Git LFS y convertirlos en un banco de fichas de actividades y metas en JSON, validado y listo para que yo lo revise."
- S2: "Descarga (T02): usa las URLs de la tabla de fuentes de `PLAN.md` y verifica que los bytes coincidan. Si el dominio no responde desde este entorno, detente y avísame"
- S3: "Delegación: usa el modelo que asigna `PLAN.md` a cada tarea. T03, T05–T08 se pueden repartir en paralelo por cuaderno."
- S4: "Orden de extracción (T08): primero los cuadernos del quinto año (patrones sensoriales, preescritura, lectura de imágenes 4–5, aprendo con mi entorno) y después el resto."
- S5: Esquema de ficha y de meta (verbatim del usuario):
```json
{
  "id": "patrones-sensoriales-p012-a",
  "cuaderno": "patrones-sensoriales",
  "pagina_pdf": 12,
  "pagina_impresa": "10",
  "anio_vida": "quinto",
  "dimension": "relacion_entorno",
  "subarea": "patrones sensoriales: forma",
  "orden": 12,
  "titulo": "Encuentra los círculos",
  "objetivo": "Identificar la forma circular entre varias figuras",
  "materiales": ["lámina del cuaderno", "lápiz de color"],
  "soporte": "papel | pantalla | objetos | movimiento | conversacion",
  "duracion_min": 3,
  "instruccion_padre": "Breve, en segunda persona, dirigida al padre.",
  "variante_sin_lamina": "Cómo hacerla con objetos de la casa.",
  "senal_logro": "Qué observar para marcar 'lo hizo solo'.",
  "metas_relacionadas": ["meta-id"],
  "texto_fuente": "Instrucción original del cuaderno, tal cual (solo para revisión).",
  "confianza": "alta | media | baja"
}
```
Meta (`content/metas.json`): `{ "id": "egreso-relacion-entorno-01", "cuaderno": "diagnostico-egreso-5-6", "pagina_pdf": 4, "dimension": "relacion_entorno", "descripcion": "…", "texto_fuente": "…" }`
- S6: "Una ficha por actividad, y `soporte = "papel"` para trazos y preescritura." / "`duracion_min` realista (entre 1 y 5)" / "Dimensión o año de vida inciertos → `confianza: "baja"`."
- S7: Aceptación: PDFs en `sources/pdf/` bajo LFS y `MANIFEST.json` coincide en bytes y sha256; `content/INVENTARIO.md` completo con año de vida; fichas y metas pasan el validador con tests en verde; revisión cruzada (T10) con un subagente distinto al que extrajo, reporte como evidencia; `content/REVISAR.md` generado por script; "Cierre en el GATE: te detienes y me pides revisar `REVISAR.md`."
- Alcance: crear/escribir en `sources/`, `content/`, `scripts/`, `.gitattributes`, `.gitignore`, `package.json`. No tocar `app/`. (`odd/tasks/` lo crea el protocolo ODD.)

## Tasks
- [x] T01 (S1) inline — repo + LFS; commit c368b5d
- [x] T02 (S2, S7) inline — 12 PDFs, bytes y sha256 verificados; commit en feat/contenido-cuadernos (1 reintento tras timeout transitorio)
- [ ] T03 (S3, S7) sonnet por PDF
- [x] T04 (S5, S6) sonnet, TDD — RED (módulo ausente) → GREEN 49/49; ver commit feat(validate)
- [ ] T05 haiku — OCR
- [ ] T06 sonnet — QC OCR
- [ ] T07 sonnet — orientaciones
- [ ] T08.a–l (S4, S5, S6) sonnet por cuaderno
- [ ] T09 opus — metas
- [ ] T10 opus — revisión cruzada (distinto al extractor)
- [ ] T11 haiku — REVISAR.md por script
- [ ] GATE — revisión humana

## Log
- L1: ver mensaje original de autorización (feature **contenido-cuadernos**, T01–T11 de PLAN.md).
- L2 (2026-11-10): faltaban git-lfs y poppler/ghostscript; el usuario los instaló. Dominio biblioteca.cubaeduca.cu responde (HTTP 206).
- L3 (2026-11-10): inventario completo. lectura-imagenes-general es 3–4 años (cuarto) → sin fichas. juegos-de-tarjetas: 131 láminas sin actividades → sin fichas (marcar en REVISAR). Usuario: pre-escritura = "quinto" (confianza baja). Ningún PDF necesita OCR para las instrucciones; T05/T06 se reducen a lectura visual de láminas por los extractores (excepción registrada).
