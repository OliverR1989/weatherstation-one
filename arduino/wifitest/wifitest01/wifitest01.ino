#include <WiFi.h>

const char* ssid = "FRITZ!Box 6850 QA";
const char* password = "74618075661974735055";

void setup() {
  WiFi.setTxPower(WIFI_POWER_11dBm);
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.print("Verbinde mit WLAN: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WLAN verbunden!");
  Serial.print("IP-Adresse: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // erstmal leer, wir testen nur die Verbindung
}
