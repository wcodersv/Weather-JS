
function getCoordinates() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const getWeatherData = async () => {
    try {
        const position = await getCoordinates();

        const apiKey = '9d50b8efe66d09bd318745385322968f'; // API-ключ
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Обработайте полученные данные о погоде здесь
        console.log(data);
    } catch (error) {
        console.log('Произошла ошибка:', error);
    }
};

getWeatherData();
