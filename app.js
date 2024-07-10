// app.js oder script.js

// DOM-Elemente abrufen
const zeitButton = document.getElementById('zeitButton');
const clearButton = document.getElementById('clearButton');
const timeList = document.getElementById('zeitListe');
const switchInput = document.getElementById('timeToggle'); // Neu hinzugefügt
let clickCount = 0;
let displayLocalTime = false; // Flag für die Anzeige der Local Time

const buttonLabels = ["Offblock", "Takeoff", "Landing", "Onblock"];

// Funktion zur Umstellung der Zeitzone
function getTimeString(date, local) {
    if (local) {
        const options = { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleTimeString('de-CH', options);
    } else {
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}

// Event Listener für den Toggle-Switch hinzufügen
switchInput.addEventListener('change', () => {
    displayLocalTime = switchInput.checked;

    // Aktualisiere die Anzeige der Zeiten basierend auf der ausgewählten Zeitzone
    const listItems = timeList.querySelectorAll('li');
    listItems.forEach(item => {
        const timeString = item.getAttribute(displayLocalTime ? 'data-local-time' : 'data-utc-time');
        item.innerHTML = `<span>${item.dataset.buttonLabel}:</span> ${timeString}`;
    });
});

// Event Listener für den Zeitstempel-Button hinzufügen
zeitButton.addEventListener('click', () => {
    const now = new Date();
    const utcTimeString = getTimeString(now, false) + " UTC";
    const localTimeString = getTimeString(now, true);

    const listItem = document.createElement('li');
    listItem.dataset.buttonLabel = buttonLabels[clickCount];
    listItem.setAttribute('data-utc-time', utcTimeString);
    listItem.setAttribute('data-local-time', localTimeString);

    const timeString = displayLocalTime ? localTimeString : utcTimeString;
    listItem.innerHTML = `<span>${buttonLabels[clickCount]}:</span> ${timeString}`;
    timeList.appendChild(listItem);

    clickCount = (clickCount + 1) % buttonLabels.length;
    zeitButton.textContent = buttonLabels[clickCount];
});

// Event Listener für den Clear-Button hinzufügen
clearButton.addEventListener('click', () => {
    timeList.innerHTML = '';
    clickCount = 0;
    zeitButton.textContent = buttonLabels[clickCount];
});

// Service Worker registrieren
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
