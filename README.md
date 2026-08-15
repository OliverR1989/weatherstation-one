# 🌤️ Wetterstation

Eine selbstgebaute, webbasierte Wetterstation mit ESP32 und BME280-Sensor. Misst Temperatur, Luftfeuchtigkeit und Luftdruck und zeigt die Werte live in einem eigenen Web-Dashboard an.

**[➜ Live-Dashboard ansehen](https://DEIN-GITHUB-NAME.github.io/DEIN-REPO-NAME/)**

---

## 📋 Überblick

Dieses Projekt verbindet Hardware, Firmware und Web-Entwicklung zu einer kompletten, eigenständigen Wetterstation:

```
Sensor (BME280) → ESP32 → WLAN → Supabase (Datenbank) → Dashboard (HTML/CSS/JS)
```

Die Messwerte werden minütlich vom ESP32 erfasst, per HTTP an eine Supabase-Datenbank gesendet und dort dauerhaft gespeichert. Das Dashboard ruft die Daten per REST-API ab und zeigt sie live an – inklusive automatischer Aktualisierung und Temperaturverlauf als Diagramm.

## ✨ Funktionen

- **Live-Werte**: Aktuelle Temperatur, Luftfeuchtigkeit und Luftdruck auf einen Blick
- **Automatische Aktualisierung**: Das Dashboard lädt sich selbstständig alle 60 Sekunden neu
- **Verlaufsdiagramm**: Temperaturverlauf der letzten Messungen als Liniendiagramm (Chart.js)
- **Zeitstempel**: Anzeige, wann die letzte Messung erfolgt ist
- **Responsives Design**: Funktioniert auf Desktop, Tablet und Smartphone

## 🛠️ Hardware

| Komponente | Modell |
|---|---|
| Mikrocontroller | ESP32 NodeMCU (WROOM-32) |
| Sensor | BME280 (Temperatur, Luftfeuchtigkeit, Luftdruck), I2C, Qwiic |
| Verbindung | Qwiic-zu-Dupont-Adapterkabel |
| Stromversorgung | USB (5V) |

### Verkabelung (I2C)

| Sensor-Pin | ESP32-Pin |
|---|---|
| VCC (Rot) | 3,3V |
| GND (Schwarz) | GND |
| SDA (Blau) | GPIO 21 |
| SCL (Gelb) | GPIO 22 |

## 💻 Software-Stack

- **Firmware**: C++ (Arduino Framework), entwickelt in der Arduino IDE
- **Backend**: [Supabase](https://supabase.com) (PostgreSQL-Datenbank mit REST-API)
- **Frontend**: HTML, CSS, JavaScript (Vanilla, kein Framework)
- **Diagramme**: [Chart.js](https://www.chartjs.org/)
- **Hosting**: GitHub Pages

## 🚀 Setup

### 1. Hardware verkabeln

BME280 wie oben beschrieben per I2C an den ESP32 anschließen.

### 2. Supabase einrichten

1. Neues Projekt auf [supabase.com](https://supabase.com) anlegen
2. Tabelle `messungen` erstellen mit den Spalten:
   - `temperatur` (float4)
   - `luftfeuchtigkeit` (float4)
   - `luftdruck` (float4)
   - `id` und `created_at` werden automatisch angelegt
3. Row Level Security (RLS) aktivieren mit Policies für `SELECT` und `INSERT` (öffentlich lesbar/schreibbar für den `anon`-Key)

### 3. Firmware flashen

1. Arduino IDE installieren, ESP32-Boardunterstützung hinzufügen (Boardverwalter-URL: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`)
2. Bibliotheken installieren: `Adafruit BME280 Library`, `Adafruit Unified Sensor`
3. In der Firmware (`wetterstation.ino`) folgende Werte anpassen:
   ```cpp
   const char* ssid = "DEIN-WLAN-NAME";
   const char* password = "DEIN-WLAN-PASSWORT";
   const char* supabaseUrl = "https://DEIN-PROJEKT.supabase.co/rest/v1/messungen";
   const char* supabaseKey = "DEIN-ANON-KEY";
   ```
4. Auf den ESP32 hochladen

### 4. Dashboard einrichten

1. In `script.js` die Supabase-URL und den `anon`-Key eintragen
2. Repository auf GitHub hochladen
3. GitHub Pages aktivieren (Settings → Pages → Deploy from branch → main)

## 📁 Projektstruktur

```
├── index.html          # Dashboard-Struktur
├── style.css            # Layout und Farben
├── styles/
│   ├── typography.css   # Schriftarten
│   └── mediaquery.css   # Responsives Verhalten
├── script.js             # Datenabruf von Supabase, Diagramm
├── assets/
│   └── fonts/            # Selbst gehostete Web Fonts
└── firmware/
    └── wetterstation.ino # ESP32-Code
```

## 🔒 Sicherheit

Der im Frontend verwendete Supabase-Key ist der öffentliche **`anon`-Key** mit eingeschränkten Rechten (nur Lesen/Schreiben über Row Level Security). Der `service_role`-Key wird nirgends verwendet.

## 🗺️ Geplante Erweiterungen

- [ ] Icons für die Werte-Karten
- [ ] Tabelle mit den letzten Messwerten
- [ ] Solarbetrieb mit Deep-Sleep-Modus für energieautarken Betrieb
- [ ] Zusätzliche Sensoren (Regen, Licht/UV)
- [ ] DWD-API-Integration für Wettervorhersage

## 📄 Lizenz

Privates Lernprojekt.
