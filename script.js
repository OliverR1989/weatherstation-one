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
    const zeitpunkt = new Date(neuesteMessung.created_at);

    document.querySelector('.temperature-underline .principal-value').textContent = `${neuesteMessung.temperatur} Grad`;
    document.querySelector('.humidity-underline .principal-value').textContent = `${neuesteMessung.luftfeuchtigkeit} %`;
    document.querySelector('.air-pressure-underline .principal-value').textContent = `${neuesteMessung.luftdruck} hPa`;
    document.getElementById('timestamp').textContent = `last update at ${zeitpunkt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;

  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
  }
}

async function ladeVerlaufdaten() {
  const url = 'https://jljhqmyyggnzapinpohc.supabase.co/rest/v1/messungen?order=created_at.desc&limit=20';
  try {
    const response = await fetch(url, {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsamhxbXl5Z2duemFwaW5wb2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDIyODcsImV4cCI6MjEwMTc3ODI4N30.M7367sm8PncClNGrlo9P5gkONkqVzwh2EXjD2V-O7Ms'
      }
    });
    const daten = await response.json();
    const uhrzeiten = daten.map(eintrag => {
      const zeitpunkt = new Date(eintrag.created_at);
      return zeitpunkt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    });

    const temperaturWerte = daten.map(eintrag => eintrag.temperatur);

    new Chart(document.getElementById('temperatureChart'), {
      type: 'line',
      data: {
        labels: uhrzeiten,
        datasets: [{
          label: 'Temperatur',
          data: temperaturWerte,
          borderColor: '#E8A33D',
          backgroundColor: '#E8A33D33',
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: 'rgba(27,42,58,0.06)' }
          }
        }
      }
    });

  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
  }
};

async function ladeTabelle() {
  const url = 'https://jljhqmyyggnzapinpohc.supabase.co/rest/v1/messungen?order=created_at.desc&limit=5';

  try {
    const response = await fetch(url, {
      headers: { apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsamhxbXl5Z2duemFwaW5wb2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDIyODcsImV4cCI6MjEwMTc3ODI4N30.M7367sm8PncClNGrlo9P5gkONkqVzwh2EXjD2V-O7Ms' }
    });

    const daten = await response.json();

    const tbody = document.getElementById('messungenTabelle');
    tbody.innerHTML = ''; // alte Zeilen entfernen

    daten.forEach(eintrag => {
      const zeitpunkt = new Date(eintrag.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      const zeile = document.createElement('tr');
      zeile.innerHTML = `<td>${zeitpunkt}</td><td>${eintrag.temperatur}</td><td>${eintrag.luftfeuchtigkeit}</td><td>${eintrag.luftdruck}</td>`;
      tbody.appendChild(zeile);
    })

  } catch (error) {
    console.error('Fehler beim Laden der Tabelle:', error);
  }
}

ladeVerlaufdaten();
ladeMessdaten();
ladeTabelle()
setInterval(ladeVerlaufdaten, 60000);
setInterval(ladeMessdaten, 60000);
setInterval(ladeTabelle, 60000);
