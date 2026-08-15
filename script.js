async function ladeMessdaten() {
  const url = 'https://jljhqmyyggnzapinpohc.supabase.co/rest/v1/messungen?order=created_at.desc&limit=1';

  try {
    const response = await fetch(url, {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsamhxbXl5Z2duemFwaW5wb2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDIyODcsImV4cCI6MjEwMTc3ODI4N30.M7367sm8PncClNGrlo9P5gkONkqVzwh2EXjD2V-O7Ms'
      }
    });

    const daten = await response.json();
    const neuesteMessung = daten[0];

    document.querySelector('.temperature-underline .principal-value').textContent = `${neuesteMessung.temperatur} Grad`;
    document.querySelector('.humidity-underline .principal-value').textContent = `${neuesteMessung.luftfeuchtigkeit} %`;
    document.querySelector('.air-pressure-underline .principal-value').textContent = `${neuesteMessung.luftdruck} hPa`;

  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
  }
}

setInterval(ladeMessdaten, 60000);
