const zeitButton = document.getElementById('zeitButton');
const clearButton = document.getElementById('clearButton');
const switchInput = document.getElementById('timeToggle');
const timeList = document.getElementById('zeitListe');
let clickCount = 0;
let useLocalTime = false; // Variable zur Bestimmung, ob lokale Zeit verwendet werden soll
const buttonLabels = ["Offblock", "Takeoff", "Landing", "Onblock"];

// Initialisierung des Labels des Zeit-Erfassen-Buttons
function initializeZeitButtonLabel() {
    zeitButton.textContent = buttonLabels[clickCount];
}

zeitButton.addEventListener('click', () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcTimeString = `${utcHours}:${utcMinutes} UTC`;

    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localTimeString = `${localHours}:${localMinutes} LT`;

    const timeString = useLocalTime ? localTimeString : utcTimeString;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${buttonLabels[clickCount]}:</span> ${timeString}`;
    timeList.appendChild(listItem);

    clickCount = (clickCount + 1) % buttonLabels.length;
    zeitButton.textContent = buttonLabels[clickCount];
});

clearButton.addEventListener('click', () => {
    timeList.innerHTML = '';
    clickCount = 0;
    zeitButton.textContent = buttonLabels[clickCount];
});

switchInput.addEventListener('change', () => {
    useLocalTime = switchInput.checked; // Umstellung zwischen UTC und der Lokalzeit.
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

// Initialisiere das Label des Zeit-Erfassen-Buttons beim Laden der Seite
window.addEventListener('load', initializeZeitButtonLabel);
