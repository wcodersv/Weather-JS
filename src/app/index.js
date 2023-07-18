import { getWeatherData, getWeatherByCity } from "./api.js";

let ldsEllipsis = document.querySelector('.lds-circle');
let divGeolocation = document.querySelector('.geolocation');
let divError = document.querySelector('.error');


// Отрисовка температуры и города
function renderWeather(dataWeather) {
    activeFirstPage();

    const temperatureGeolocation = document.querySelector('.geolocation-temperature');
    temperatureGeolocation.textContent = `${Math.round(dataWeather.main.temp)}°C`;

    const cityGeolocation = document.querySelector('.geolocation-city');
    cityGeolocation.textContent = `${dataWeather.weather[0].main} in ${dataWeather.name}`;
}

//Загрузка 1 страницы
async function loadFirstPage() {
    try {
        ldsEllipsis.style.display = 'block';
        const dataWeather = await getWeatherData();
        ldsEllipsis.style.display = 'none';
        renderWeather(dataWeather);
    } catch (error) {
        activeChangeCity();
    }
}

loadFirstPage();

//~Change city
// Button - смена города "Change city" 1 maket
let changeCityBtn = document.querySelector('#geo-btn');
let divSelectCity = document.querySelector('.select-city');
let tryAgainBtn = document.querySelector('#error-button')

changeCityBtn.addEventListener('click', activeChangeCity);

// Input - ввод города
let inputCity = document.querySelector('.input-city');
let findCityBtn = document.querySelector('#find-button');

findCityBtn.addEventListener('click', handleFindWeatherByCity)

// Обработчик поиска погоды по городу
async function handleFindWeatherByCity() {
    const city = inputCity.value.trim();
    try {
        const weatherByCity = await getWeatherByCity(city);
        renderWeather(weatherByCity);
    } catch (error) {
        activeChangeErrorPage();
    }
}

//~ Error страница
tryAgainBtn.addEventListener('click', activeChangeCity)


//~CSS стили
// CSS - ативна страница показа погоды
function activeFirstPage() {
    divGeolocation.style.display = 'block';
    divSelectCity.style.display = 'none';
    divError.style.display = 'none';
}

// CSS - ативна страница Ввода города
function activeChangeCity() {
    divGeolocation.style.display = 'none';
    divSelectCity.style.display = 'block';
    divError.style.display = 'none';
    inputCity.value = '';
}

// CSS - ативна страницы Ошибки
function activeChangeErrorPage() {
    divGeolocation.style.display = 'none';
    divSelectCity.style.display = 'none';
    divError.style.display = 'block';
}
