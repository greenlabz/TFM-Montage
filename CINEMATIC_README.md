# Cinematic Batch

## Einrichtung

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements-cinematic.txt
```

API-Key nur für aktuelles PowerShell-Fenster setzen:

```powershell
$env:OPENAI_API_KEY="dein-api-key"
```

API-Key dauerhaft für dein Windows-Benutzerkonto setzen:

```powershell
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "dein-api-key", "User")
```

Nach dauerhaftem Setzen neues Terminal öffnen.

## Ordner

Bilder hier ablegen:

```text
input_images/
```

Unterstützt: `.png`, `.jpg`, `.jpeg`.

## Start

```powershell
py cinematic_batch.py
```

Ergebnisse landen hier:

```text
output_cinematic/
```

Beispiel: `projekt.jpg` wird `projekt_cinematic.png`.

Das Skript verarbeitet nur Dateien direkt im Eingabeordner, keine Unterordner. Jede API-Anfrage kann Kosten verursachen. Bereits vorhandene gleichnamige Ausgabedateien werden überschrieben.
