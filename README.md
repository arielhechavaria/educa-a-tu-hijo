# Educa a tu Hijo

App Android 100 % offline, de uso personal, que guía al padre para trabajar **10 minutos al día** con su hijo de 4 años (quinto año de vida del programa *Educa a tu Hijo*, Primera Infancia, MINED). El año que viene pasa al sexto año de vida (grado preescolar).

El contenido sale de los cuadernos oficiales de Primera Infancia (Editorial Pueblo y Educación, 2024). La app no inventa actividades: solo redacta la instrucción al padre, la variante sin lámina y la señal de logro.

## Video de introducción

<video src="https://github.com/arielhechavaria/educa-a-tu-hijo/raw/main/app/public/intro/educa-a-tu-hijo.mp4" controls width="560">
  Tu navegador no reproduce video. <a href="app/public/intro/educa-a-tu-hijo.mp4">Descargar el video</a>.
</video>

La app lo muestra al abrirla por primera vez, con un botón **Saltar** siempre visible. Se puede volver a verlo desde Ajustes. El archivo va dentro del APK (`app/public/intro/educa-a-tu-hijo.mp4`, unos 2.6 MB), así que funciona sin red.

## Principios

- La app es para el padre, no para el niño: dice qué hacer, con qué materiales y en qué página está la lámina.
- Trazos y preescritura se hacen en papel, nunca con el dedo en la pantalla.
- Sin gamificación, puntajes, porcentajes ni lenguaje de "atraso".
- Sin backend, cuentas, analítica ni red.

## Descargar el APK

Cada push a `main` compila el APK debug y lo publica en la release **latest**:

<https://github.com/arielhechavaria/educa-a-tu-hijo/releases/tag/latest>

Al instalarlo, Android pedirá permitir orígenes desconocidos. Requiere Android 8+.

## Estructura

| Carpeta | Contenido |
|---|---|
| `sources/pdf/` | PDFs originales (Git LFS) y `sources/MANIFEST.json` (url, tamaño, sha256) |
| `content/` | Banco de fichas (`actividades/`), orientaciones al adulto, metas e inventarios por cuaderno |
| `scripts/` | Descarga de fuentes y validador del esquema de fichas |
| `app/` | App Vite + TypeScript + Capacitor (ver `app/README.md`) |
| `odd/tasks/` | Documentos de seguimiento de cada feature |
| `PLAN.md` | Plan maestro de tareas |

## Comandos (desde la raíz)

```bash
npm run validate   # valida fichas y metas contra el esquema
npm test           # tests del validador
```

La app, su build y la compilación del APK están documentados en [`app/README.md`](app/README.md).

## Flujo de contenido

1. Los PDFs se descargan a `sources/pdf/` (`scripts/fetch_sources.py`) y se inventarían en `content/inventario/`.
2. Las fichas se extraen a `content/actividades/{cuaderno}.json` y deben pasar `npm run validate`.
3. `npm run assets` (en `app/`) las une en un solo JSON y comprime los PDFs a `app/public/pdf/` para el APK (presupuesto: menos de 60 MB).

## Aviso sobre los PDFs

Los PDFs son material con ISBN de Pueblo y Educación, de distribución gratuita en la Biblioteca CubaEduca. Este repositorio es de uso personal y educativo; no se hace nada para redistribuirlos fuera de la propia app.
