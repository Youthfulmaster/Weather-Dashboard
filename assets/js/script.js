// OpenWeatherMap API Key
const apiKey = '4c29cd470a8ea9bd88e9e1751d0fe31a'; 

// Function to fetch current weather data
// Function to fetch current weather data
function fetchCurrentWeather(city) {
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Add this line to log the API response
            // Handle the API response for current weather data
            // ...
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
