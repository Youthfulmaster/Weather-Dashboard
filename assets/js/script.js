// OpenWeatherMap API Key
const apiKey = '4c29cd470a8ea9bd88e9e1751d0fe31a'; 

// Function to fetch current weather data
function fetchCurrentWeather(city) {
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response for current weather data
            const cityNameElement = document.getElementById('cityName');
            const dateElement = document.getElementById('date');
            const temperatureElement = document.getElementById('temperature');
            const humidityElement = document.getElementById('humidity');
            const windSpeedElement = document.getElementById('windSpeed');

            cityNameElement.textContent = `City: ${data.name}`;
            dateElement.textContent = `Date: ${new Date(data.dt * 1000).toLocaleDateString()}`;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}




function fetchFiveDayForecast(city) {
    const fiveDayForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(fiveDayForecastApiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response for 5-day forecast data
            const forecastList = document.querySelector('.forecast-list');
            forecastList.innerHTML = ''; // Clear previous forecast data

            // Initialize an object to group forecasts by day
            const groupedForecasts = {};

            // Loop through the data to group forecasts by day
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });

                // Only add the first forecast for each day
                if (!groupedForecasts[day]) {
                    const temperature = forecast.main.temp;
                    const humidity = forecast.main.humidity;
                    const windSpeed = forecast.wind.speed;

                    // Create a forecast card for the day
                    const forecastCard = document.createElement('div');
                    forecastCard.classList.add('forecast-card');
                    forecastCard.innerHTML = `
                        <p>${day}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;

                    // Append the forecast card to the forecast list
                    forecastList.appendChild(forecastCard);

                    // Store this forecast in the groupedForecasts object
                    groupedForecasts[day] = true;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
        });
}



// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    fetchCurrentWeather(cityInput); // Call the fetchCurrentWeather function
    fetchFiveDayForecast(cityInput); // Call the fetchFiveDayForecast function
});

