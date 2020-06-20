const weather = document.getElementById("weather");
const xhr = new XMLHttpRequest();

let weatherKey = 'bfebc285607853a00e5d7cb88e7045e7';

xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
        let weatherObj = JSON.parse(xhr.responseText);

        const currentTemp = document.createElement('p');
        const currentHumi = document.createElement('p');
        const currentWeather = document.createElement('p');
        const currentWind = document.createElement('p');
        const currentCloud = document.createElement('p');

        currentTemp.textContent = "현재 온도 : " + (weatherObj.main.temp - 273.15).toFixed(1);
        currentHumi.textContent = "현재 습도 : " + weatherObj.main.humidity + "%";
        currentWeather.textContent = "현재 날씨 : " + weatherObj.weather[0].main;
        currentWind.textContent = "현재 풍속 : " + weatherObj.wind.speed + "m/s";
        currentCloud.textContent = "현재 구름 : " + weatherObj.clouds.all + "%";

        weather.appendChild(currentTemp);
        weather.appendChild(currentHumi);
        weather.appendChild(currentWeather);
        weather.appendChild(currentWind);
        weather.appendChild(currentCloud);
    }
};

xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${weatherKey}`);
xhr.send();