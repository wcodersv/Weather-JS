
function getCoordinates() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Получение данных о погоде
async function getWeatherData() {
    try {
        const position = await getCoordinates();

        const API_KEY_OW = '9d50b8efe66d09bd318745385322968f'; // API-ключ OpenWeatherMap
        const API_URL_OW = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY_OW}&units=metric`;

        const response = await fetch(API_URL_OW);
        const dataWeather = await response.json();
        console.log(dataWeather)
        return dataWeather;
    } catch (error) {
        console.log('Произошла ошибка:', error);
    }
};


//Получение данных о местоположении
async function getCityData() {
    try {
        const API_KEY_GEO = 'at_YNCHaC6VCEJMx8XereOGTuzgkkajk'; // API-ключ IP Geolocation API
        const API_URL_GEO = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_GEO}`;

        const response = await fetch(API_URL_GEO);
        const dataCity = await response.json();

        console.log(dataCity)
        return dataCity;
    } catch (error) {
        console.log('Произошла ошибка:', error);
    }

}

let ldsEllipsis = document.querySelector('.lds-circle');
let divGeolocation = document.querySelector('.geolocation')


// Когда получена геолокация для ТЕМПЕРАТУРЫ
async function renderTemperatureGeolocation() {
    try {
        ldsEllipsis.style.display = 'block';

        const dataWeather = await getWeatherData();
        ldsEllipsis.style.display = 'none';
        divGeolocation.style.display = 'block'
        let temperatureGeolocation = document.querySelector('.geolocation-temperature');
        temperatureGeolocation.textContent = `${Math.round(dataWeather.main.temp)}°C`;
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}
renderTemperatureGeolocation()


// Когда получена геолокация для ГОРОДА
async function renderCityGeolocation() {
    try {
        const dataWeather = await getWeatherData();
        let cityGeolocation = document.querySelector('.geolocation-city');
        cityGeolocation.textContent = `${dataWeather.weather[0].main} in ${dataWeather.name}`

    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

renderCityGeolocation()


// Когда получена геолокация для 

let selectCityGeolocation = document.querySelector('.geolocation-select');
