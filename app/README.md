# Educa a tu Hijo (app)

Offline Android app (Vite + TypeScript + Capacitor) that proposes ~10 minutes of activities per day.
Content comes from `../content/` (not edited here); PDFs from `../sources/pdf/` (Git LFS).

## Commands (run inside `app/`)

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server in the browser |
| `npm test` | Unit tests (scheduler, summary, timer, data layer) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate content and compressed PDFs (see below) |
| `npm run build` | Typecheck + production build into `dist/` |

## Regenerate content and PDFs

1. Update the fichas in `../content/actividades/*.json` (validate with `npm run validate` from the repo root).
2. `npm run assets` merges them into `public/content/fichas.json`, copies `metas.json`, and compresses the PDFs of the cuadernos that have fichas with Ghostscript (`/ebook`) into `public/pdf/`. It fails if a page count changes, a `pagina_pdf` is out of range, or assets exceed 55 MB. Requires `gs`.

## Build the debug APK

Requires JDK 17+ and the Android SDK (`ANDROID_HOME`, platform + build-tools).

```bash
cd app
npm run assets && npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

Keep the APK under 60 MB. Without a local JDK/SDK, the workflow `.github/workflows/apk.yml` builds it on GitHub Actions (artifact `app-debug-apk`).

## Notes

- No network, accounts or analytics. Progress lives in Capacitor Preferences (localStorage fallback in the browser).
- Settings → Progress: export to text/file and import it back (history, daily plans and settings are preserved).
- The timer warns (banner + short vibration) at the end and keeps counting; it never cuts the session.
