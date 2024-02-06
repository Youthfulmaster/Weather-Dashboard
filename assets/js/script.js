// Declare the apiKey variable at the top of your script
const apiKey = '4c29cd470a8ea9bd88e9e1751d0fe31a';

// Wrap your JavaScript code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Your fetchCurrentWeather and fetchFiveDayForecast functions here

    // Event listener for the search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput').value;
        fetchCurrentWeather(cityInput); // Call the fetchCurrentWeather function
        fetchFiveDayForecast(cityInput); // Call the fetchFiveDayForecast function
    });
});

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

            const temperatureFahrenheit = (data.main.temp - 273.15) * 9/5 + 32; // Convert from Kelvin to Fahrenheit

            cityNameElement.textContent = `City: ${data.name}`;
            dateElement.textContent = `Date: ${new Date(data.dt * 1000).toLocaleDateString()}`;
            temperatureElement.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F`; // Display with 2 decimal places
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
            const forecastContainer = document.querySelector('.forecast-container');
            if (forecastContainer) {
                forecastContainer.innerHTML = ''; // Clear previous forecast data if forecastContainer exists
            }

            // Initialize an object to group forecasts by day
            const groupedForecasts = {};

            // Loop through the data to group forecasts by day and convert temperature to Fahrenheit
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                // Check if this day's forecast has already been added
                if (!groupedForecasts[day]) {
                    groupedForecasts[day] = true;

                    const temperatureKelvin = forecast.main.temp;
                    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32; // Convert from Kelvin to Fahrenheit
                    const humidity = forecast.main.humidity;
                    const windSpeed = forecast.wind.speed;

                    // Create a forecast card for the day
                    const forecastCard = createForecastCard(day, temperatureFahrenheit, humidity, windSpeed);

                    // Append the forecast card to the forecast container
                    forecastContainer.appendChild(forecastCard);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
        });
}

// Function to create a forecast card
function createForecastCard(day, temperature, humidity, windSpeed) {
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');
    forecastCard.innerHTML = `
        <p>${day}</p>
        <p>Temperature: ${temperature.toFixed(2)}°F</p> <!-- Display with 2 decimal places -->
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    return forecastCard;
}

