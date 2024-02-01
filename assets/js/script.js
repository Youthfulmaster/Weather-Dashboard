// OpenWeatherMap API Key
const apiKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'; 

// Function to fetch current weather data
function fetchCurrentWeather(city) {
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response for current weather data
            const cityName = data.name;
            const date = new Date(data.dt * 1000); // Convert timestamp to date
            const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Update the HTML elements with the weather data
            document.getElementById('cityName').textContent = `City: ${cityName}`;
            document.getElementById('date').textContent = `Date: ${date.toLocaleDateString()}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

// Function to fetch 5-day weather forecast
function fetchFiveDayForecast(city) {
    const fiveDayForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(fiveDayForecastApiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response for 5-day forecast data
            // Parse the data and update the HTML elements for the forecast
            console.log(data); // Log the data for further processing
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
        });
}

// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    fetchCurrentWeather(cityInput);
    fetchFiveDayForecast(cityInput);
});
