#!/usr/bin/env python3
"""Download the 12 official PDFs, verify their size, and write sources/MANIFEST.json."""
import hashlib
import json
import sys
import urllib.request
from pathlib import Path

BASE = "https://biblioteca.cubaeduca.cu/files/original/"
# (item, media, file, hash, expected bytes)
SOURCES = [
    (627, 628, "patrones-sensoriales", "18be7110eeb69cac278b42a06ad32f0d9c91ebc8", 2045320),
    (190, 475, "pre-escritura", "2166a87b62b792d8a771ff9132e1ba8bb4924cd6", 1651189),
    (619, 620, "lectura-imagenes-4-5", "68dff9ca496c85e5d2f8f53aaeac6d7bd65bbc94", 4040400),
    (621, 622, "aprendo-con-mi-entorno", "bc31c34b3c1033a90d4f4a10145878abdda86d13", 28625493),
    (192, 257, "relaciones-espaciales", "b6cd909b38f442d1f225ade6fc8bd3d9c88ec226", 12379030),
    (187, 474, "nociones-matematica", "5e94ecd34ee09356c1111eba02def265b4657fd0", 11374644),
    (550, 616, "juegos-de-tarjetas", "f8f372036f611787be56684e2a706fb8f2f95eb2", 64476882),
    (552, 615, "lectura-imagenes-general", "9e174e78648b8ffba7e1e22ecda40984d86958e1", 17145410),
    (623, 624, "lectura-imagenes-5-6", "77e57007f390362f7bcbc991744acd7118731c34", 12143302),
    (625, 626, "analisis-fonico-5-6", "09358ffb358c015f851f6138cec6cc645243dc95", 1575734),
    (629, 630, "diagnostico-egreso-5-6", "eeba35e255393acf57d0f89c71326aa8a888a05e", 809957),
    (476, 477, "tareas-diagnosticas-preescolar", "125baecfe700bd651480329e59b91946ce7c04e2", 759593),
]

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "sources" / "pdf"


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    failed = False
    for item, media, name, digest, expected in SOURCES:
        url = f"{BASE}{digest}.pdf"
        dest = PDF_DIR / f"{name}.pdf"
        if not (dest.exists() and dest.stat().st_size == expected):
            tmp = dest.with_suffix(".pdf.tmp")
            with urllib.request.urlopen(url, timeout=60) as r, tmp.open("wb") as f:
                while chunk := r.read(1 << 20):
                    f.write(chunk)
            tmp.replace(dest)
        size = dest.stat().st_size
        ok = size == expected
        failed |= not ok
        print(f"{'OK ' if ok else 'BAD'} {name}.pdf {size} (expected {expected})")
        manifest.append({
            "item": item, "media": media, "file": f"sources/pdf/{name}.pdf",
            "url": url, "bytes": size, "sha256": sha256_of(dest),
        })
    (ROOT / "sources" / "MANIFEST.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
