const weather = document.getElementById("weather");
const xhr = new XMLHttpRequest();

let weatherKey = 'bfebc285607853a00e5d7cb88e7045e7';

xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 201) {
        let weatherObj = JSON.parse(xhr.responseText);
        console.log(weatherObj);

        let weatherText = {
            '기온': (weatherObj.main.temp - 273.15).toFixed(1),
            '최고 기온': (weatherObj.main.temp_max - 273.15).toFixed(1),
            '최저 기온': (weatherObj.main.temp_min - 273.15).toFixed(1),
            '기압': weatherObj.main.pressure + "hPa",
            '습도': weatherObj.main.humidity + "%",
            '날씨': weatherObj.weather[0].main,
            '풍속': weatherObj.wind.speed + "m/s",
            '풍향': degree(weatherObj.wind.deg),
            '구름': weatherObj.clouds.all + "%",
        };

        Object.keys(weatherText).map(key => {
            const createP = document.createElement('p');
            createP.textContent = `${key} : ${weatherText[key]}`
            weather.appendChild(createP);
        });
    }
};

xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${weatherKey}`);
xhr.send();

const degree = (deg) => {
    if(deg < 22.5 && deg >= 337.5) {
        return '북풍';
    } else if(deg >= 22.5 && deg < 67.5) {
        return '북동풍';
    } else if(deg >= 67.5 && deg < 112.5) {
        return '동풍';
    } else if(deg >= 112.5 && deg < 157.5) {
        return '남동풍';
    } else if(deg >= 157.5 && deg < 202.5) {
        return '남풍';
    } else if(deg >= 202.5 && deg < 247.5) {
        return '남서풍';
    } else if(deg >= 247.5 && deg < 292.5) {
        return '서풍';
    } else if(deg >= 292.5 && deg < 337.5) {
        return '북서풍';
    }
};