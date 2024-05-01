fetch("config.json")
	.then((response) => response.json())
	.then((config) => {
		const { city, apiKey } = config;
		fetchWeatherData(city, apiKey);
		setInterval(() => fetchWeatherData(city, apiKey), 3600000);
	})
	.catch((error) => {
		console.error(
			"Erreur lors du chargement du fichier de configuration:",
			error
		);
	});

function fetchWeatherData(city, apiKey) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("La ville n'a pas été trouvée.");
			}
			return response.json();
		})
		.then((data) => updateWeatherInfo(data))
		.catch((error) => {
			console.error(
				"Erreur lors de la récupération des données météo:",
				error
			);
		});
}

function updateWeatherInfo(weatherData) {
	const weatherInfo = document.getElementById("weatherInfo");
	const temperatureCelsius = weatherData.main.temp;
	const weatherDescription = weatherData.weather[0].description;
	weatherInfo.innerHTML = `
        <div class="weather-card">
            <div class="weather-info">
                <h2>${weatherData.name}</h2>
                <p>Température: ${temperatureCelsius}°C</p>
                <p>Description: ${weatherDescription}</p>
            </div>
        </div>
    `;
}
