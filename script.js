const weatherQuotes = [
    "Some people feel the rain. Others just get wet.",
    "The sun always shines above the clouds.",
    "Wherever you go, no matter what the weather, always bring your own sunshine.",
    "There’s no such thing as bad weather, only inappropriate clothing.",
    "The storm will pass. The sun will shine again."
];

let quoteIndex = 0;

function updateQuote() {
    const quoteDisplay = document.getElementById('weatherQuote');
    quoteDisplay.innerText = weatherQuotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % weatherQuotes.length;
}

setInterval(updateQuote, 5000); // Change quote every 5 seconds

async function getWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (location === "") {
        alert("Please enter a location.");
        return;
    }

    const apiKey = '5581d1691022455d8d5172459251706';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = "https:" + data.current.condition.icon;
    weatherIcon.style.display = 'block';

    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = `
        <p><strong>Location:</strong> ${data.location.name}, ${data.location.region}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
    `;
}

// Start quote rotation immediately
updateQuote();
