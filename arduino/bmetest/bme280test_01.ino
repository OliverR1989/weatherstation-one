#include <Wire.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("Starte BME280-Test...");

  if (!bme.begin(0x76)) {
    Serial.println("BME280 nicht gefunden! Verkablung prüfen.");
    while (1) delay(10);
  }

  Serial.println("BME280 gefunden!");

}

void loop () {
  Serial.print("Temperatur: ");
  Serial.print(bme.readTemperature());
  Serial.println(" °C");

  Serial.print("Luftfeuchtigkeit: ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  Serial.print("Luftdruckt: ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");

  Serial.println("---");
  delay(2000);
}


