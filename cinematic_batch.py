import base64
import os
import sys
import time
from pathlib import Path

from openai import OpenAI


INPUT_DIR = Path("./input_images")
OUTPUT_DIR = Path("./output_cinematic")
SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg"}
MODEL = "gpt-image-1"
DELAY_SECONDS = 1.5

PROMPT = """Transform this image into a true professional photo studio cinematic
shot. Apply high-end commercial photography lighting: soft key light
with controlled shadow falloff, subtle rim light separating the subject
from the background, and balanced fill light eliminating harsh flat
areas. Increase perceived depth with a shallow depth-of-field feel on
background elements while keeping the main subject critically sharp.
Elevate color grading to a polished, cinematic commercial look: rich
contrast, clean neutral-to-warm color balance, no color casts, no
oversaturation. Refine surface detail and texture realism (skin, wood,
metal, fabric as applicable) to match premium advertising photography
standards. Preserve the original composition, subject positioning,
camera angle, and all existing content elements exactly as they are —
do not add, remove, or relocate any element. This is a lighting,
color-grading, and photographic-quality enhancement only, not a
content or composition change."""


def collect_images(input_dir: Path) -> tuple[list[Path], list[Path]]:
    files = sorted((path for path in input_dir.iterdir() if path.is_file()), key=lambda path: path.name.lower())
    images = [path for path in files if path.suffix.lower() in SUPPORTED_EXTENSIONS]
    skipped = [path for path in files if path.suffix.lower() not in SUPPORTED_EXTENSIONS]
    return images, skipped


def output_path_for(source: Path) -> Path:
    return OUTPUT_DIR / f"{source.stem}_cinematic.png"


def process_image(client: OpenAI, source: Path) -> Path:
    destination = output_path_for(source)
    with source.open("rb") as image_file:
        result = client.images.edit(
            model=MODEL,
            image=image_file,
            prompt=PROMPT,
        )

    if not result.data or not result.data[0].b64_json:
        raise RuntimeError("API-Antwort enthält keine Bilddaten.")

    destination.write_bytes(base64.b64decode(result.data[0].b64_json))
    return destination


def main() -> int:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Fehler: Umgebungsvariable OPENAI_API_KEY ist nicht gesetzt.", file=sys.stderr)
        return 1

    if not INPUT_DIR.exists() or not INPUT_DIR.is_dir():
        print(f"Fehler: Eingabeordner fehlt: {INPUT_DIR.resolve()}", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    images, skipped = collect_images(INPUT_DIR)

    for path in skipped:
        print(f"Übersprungen: {path.name} (nicht unterstütztes Format)")

    if not images:
        print(f"Keine unterstützten Bilder in {INPUT_DIR.resolve()} gefunden.")
        return 0

    client = OpenAI(api_key=api_key)
    successful = 0
    failed = 0

    print(f"Gefunden: {len(images)} unterstützte Bilder")

    for index, source in enumerate(images, start=1):
        print(f"[{index}/{len(images)}] Verarbeite: {source.name} ... ", end="", flush=True)
        try:
            destination = process_image(client, source)
            successful += 1
            print(f"fertig -> {destination.name}")
        except Exception as error:
            failed += 1
            print(f"fehlgeschlagen: {error}")

        if index < len(images):
            time.sleep(DELAY_SECONDS)

    print("\nZusammenfassung")
    print(f"Verarbeitet: {len(images)}")
    print(f"Erfolgreich: {successful}")
    print(f"Fehlgeschlagen: {failed}")
    print(f"Übersprungen: {len(skipped)}")
    print(f"Ausgabeordner: {OUTPUT_DIR.resolve()}")

    return 0 if failed == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
