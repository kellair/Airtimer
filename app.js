const zeitButton = document.getElementById('zeitButton');
const clearButton = document.getElementById('clearButton');
const switchInput = document.getElementById('timeToggle');
const timeList = document.getElementById('zeitListe');
let clickCount = 0;
let useLocalTime = false; // Variable zur Bestimmung, ob lokale Zeit verwendet werden soll
const buttonLabels = ["Offblock", "Takeoff", "Landing", "Onblock"];

zeitButton.addEventListener('click', () => {
    const now = useLocalTime ? new Date() : new Date(new Date().toUTCString()); // Umstellung auf die lokale Zeit
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes} ${useLocalTime ? 'LT' : 'UTC'}`; // Anzeige der umgestellten Zeit.

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
