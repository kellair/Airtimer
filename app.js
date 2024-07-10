// app.js oder script.js

// DOM-Elemente abrufen
const zeitButton = document.getElementById('zeitButton');
const clearButton = document.getElementById('clearButton');
const timeList = document.getElementById('zeitListe');
const toggleTimezoneBtn = document.getElementById('toggleTimezoneBtn'); // Neu hinzugefügt
let clickCount = 0;
let displayLocalTime = false; // Flag für die Anzeige der Local Time

const buttonLabels = ["Offblock", "Takeoff", "Landing", "Onblock"];

// Event Listener für den Button zum Umschalten der Zeitzone hinzufügen
toggleTimezoneBtn.addEventListener('click', () => {
    displayLocalTime = !displayLocalTime; // Umschalten zwischen LT und UTC

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
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcTimeString = `${utcHours}:${utcMinutes} UTC`;

    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localTimeString = `${localHours}:${localMinutes}`;

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

// Funktion zum Hinzufügen eines Zeitstempels (optional)
function addTimestamp(buttonLabel, timestamp) {
    const listItem = document.createElement('li');
    const utcTimeString = `${timestamp.getUTCHours().toString().padStart(2, '0')}:${timestamp.getUTCMinutes().toString().padStart(2, '0')}`;
    const localTimeString = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`;

    listItem.dataset.buttonLabel = buttonLabel;
    listItem.setAttribute('data-utc-time', `${utcTimeString} UTC`);
    listItem.setAttribute('data-local-time', localTimeString);

    const timeString = displayLocalTime ? localTimeString : `${utcTimeString} UTC`;
    listItem.innerHTML = `<span>${buttonLabel}:</span> ${timeString}`;
    timeList.appendChild(listItem);
}

// Beispiel für das Hinzufügen eines Zeitstempels (optional)
addTimestamp("Offblock", new Date()); // Beispiel für den aktuellen Zeitstempel
