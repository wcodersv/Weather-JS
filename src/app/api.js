const API_KEY_OW = '9d50b8efe66d09bd318745385322968f'; // API-ключ OpenWeatherMap
const API_KEY_GEO = 'at_YNCHaC6VCEJMx8XereOGTuzgkkajk'; // API-ключ IP Geolocation API

//Запрашивает разрешение на определение местоположения
function getCoordinates() {
    return new Promise(function (resolve, reject) {
        if (!navigator.geolocation) {
            reject('');
            return
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Получение данных о погоде 
async function getWeatherData() {
    try {// разрешено определение местоположения
        const position = await getCoordinates();
        const API_URL_OW = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY_OW}&units=metric`;
        const response = await fetch(API_URL_OW);
        const dataWeather = await response.json();

        return dataWeather
    } catch (error) {// запрещено определение местоположения (по ip)
        const city = await getCity();
        return await getWeatherByCity(city);
    }
};

// Получение данных о погоде через ГОРОД
async function getWeatherByCity(city) {
    const API_URL_OW = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OW}&units=metric`;
    const response = await fetch(API_URL_OW);
    const dataWeather = await response.json();

    return dataWeather;
}

//!IP
//Получить IP адресс
async function getIPAddress() {
    const API_URL_IP = 'https://api.ipify.org?format=json'
    const response = await fetch(API_URL_IP);
    const ip = await response.json();

    return ip
}

//Получить город по IP адрессу
async function getCity() {
    try {
        const IPAddress = await getIPAddress();
        const API_URL_GEO = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_GEO}&ipAddress=${IPAddress.ip}`
        const response = await fetch(API_URL_GEO);
        const city = await response.json();

        return city;
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

export { getWeatherData, getWeatherByCity }