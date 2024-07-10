const zeitButton = document.getElementById('zeitButton');
const clearButton = document.getElementById('clearButton');
const timeList = document.getElementById('zeitListe');
let clickCount = 0;
const buttonLabels = ["Offblock", "Takeoff", "Landing", "Onblock"];

zeitButton.addEventListener('click', () => {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes} UTC`;

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
