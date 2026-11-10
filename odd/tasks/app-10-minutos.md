# app-10-minutos
Objetivo: APK Android offline que propone ~10 min diarios de fichas, registra con un toque y da resumen semanal. Rama: `feat/app-10-minutos` (desde `feat/contenido-cuadernos`). Tareas T12–T22 de `PLAN.md`.
Estrategia de entrega: ask-on-risk. Runner de tests: vitest para `app/` (lógica pura con TDD); `node --test` sigue para `scripts/`.

## Specs
- S1: "Hacer un APK offline que cada día me proponga unos 10 minutos de actividades con mi hijo, me deje registrar cómo le fue con un toque y me dé un resumen semanal para la ejecutora del programa"
- S2: "No modifiques `content/`: si encuentras un error en una ficha, anótalo y avísame." Puedo crear y escribir en `app/` y leer `content/`.
- S3 Hoy: "3 a 5 fichas del año de vida activo que sumen unos 10 minutos, rotando dimensiones (no repetir la misma dimensión principal dos días seguidos). Botón "Empezar" con temporizador de 10:00 visible, que avisa al terminar pero no corta."
- S4 Ficha: "título, instrucción para el padre, materiales, variante sin lámina y botón "Ver lámina", que abre el PDF en `pagina_pdf`."
- S5 Registro: "`Lo hizo solo` / `Con ayuda` / `Todavía no` / `Saltar`."
- S6 Semana: "resumen por dimensión en texto simple (qué se trabajó y cómo fue), compartible como texto."
- S7 Ajustes: "año de vida activo, duración diaria (10 min por defecto), exportar e importar el progreso en JSON."
- S8 Selección (módulo puro, TDD): "`Todavía no` → vuelve a los 2–3 días. `Con ayuda` → vuelve a los 5–7 días. `Lo hizo solo` dos veces → repaso cada ~3 semanas. Primero las fichas nunca vistas, respetando el orden del cuaderno dentro de cada subárea. Es determinista para una misma fecha y un mismo estado (testeable)."
- S9 Fuera: "gamificación para el niño, sonidos, animaciones, red, cuentas y publicación en tiendas."
- S10 Aceptación: tests de selección en verde (rotación, intervalos, prioridad de nuevas); funciona en modo avión; "Ver lámina" correcta en al menos 5 fichas de distintos cuadernos (evidencia); exportar/importar conserva historial; README (regenerar contenido, `npx cap sync android` + Gradle); APK debug con ruta y tamaño (< 60 MB); T22 por subagente `opus` que no participó; preguntar antes de añadir dependencias pesadas o funciones no listadas.
- S11 (CLAUDE.md): app para el padre; motricidad fina en papel; sin gamificación/puntajes/porcentajes/lenguaje de atraso; no inventar actividades; sin red; letra grande, una mano, modo oscuro; Android 8+.

## Tasks
- [x] T12 (S11) inline (scaffold trivial; cap sync android OK) — scaffold Vite+TS+Capacitor
- [x] T13 (S4,S10) sonnet (16 MB total assets, gs /ebook) — pipeline de assets PDF
- [x] T14 (S3,S8) opus (89 tests total; decisiones: ver Log L3) — scheduler TDD
- [x] T15 (S7,S10) sonnet (27 tests; commit data layer) — capa de datos
- [x] T16 (S3) sonnet — Hoy + temporizador
- [x] T17 (S4) sonnet — Ficha + visor pdf.js
- [x] T18 (S5,S6) sonnet — registro + Semana
- [x] T19 (S7) haiku — Ajustes
- [x] T20 (S11) sonnet — pase de calidad
- [ ] T21 (S10) haiku — APK + README (bloqueo probable: sin JDK/Android SDK en el entorno)
- [ ] T22 (S10,S11) opus, independiente — revisión final

## Log
- L1 (2026-11-10): request verbatim = el mensaje de autorización "app-10-minutos" (ver Specs, citas literales).
- L2: Observado: content/ tiene 99 fichas (quinto: relacion_entorno 41, comunicacion 17, motricidad 10, social_personal 6; sexto: 25); NO hay fichas `estetica` → el scheduler debe tolerar dimensiones vacías. Entorno sin java ni Android SDK; disco libre 3.7 GB.
- L3: T14 decisiones no especificadas (confirmar con el usuario): solo×1 repasa a ~10 días; saltar vuelve al día 1–3 y va último; orden por cuaderno (no solo por subárea, casi todas las subáreas tienen 1 ficha); al menos 1 ficha nueva por día mientras queden (sin esto solo 39/74 fichas aparecían en 60 días). Plan mínimo de 3 fichas puede pasar de 10 min (3×5=15).
- L4: Evidencia (headless Chromium, 360-390px, scratchpad e2e): Hoy genera 3 fichas/11 min; temporizador 10:00 -> "+00:02" tras 10:01 sin cortar; registro 4 botones; Semana en texto sin porcentajes; exportar -> borrar -> importar -> exportar idéntico (JSON igual); cambio a sexto rehace el plan; 0 peticiones externas (offline).
- L5: "Ver lámina" abre la página correcta (canvas data-pagina == pagina_pdf): aprendo-con-mi-entorno p10, lectura-imagenes-4-5 p8, patrones-sensoriales p7, pre-escritura p5 (captura visual verificada), aprendo-con-mi-entorno p10 (ficha -b). NOTA: el contenido solo tiene fichas de 4 cuadernos, así que no hay 5 cuadernos distintos; se cubren 4 cuadernos + 1 ficha extra.
- L6 T20 checklist: letra base 20px, botones >=2.9rem, registro fijo abajo (una mano), modo oscuro por prefers-color-scheme (capturas), bundle JS 26 KB + pdf.js 444 KB lazy; sin pruebas en dispositivo gama baja real (no hay dispositivo). Descarga de archivo (blob) y navigator.share sin verificar en WebView Android: hay copiar/pegar como alternativa.
