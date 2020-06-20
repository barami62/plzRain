const weather = document.getElementById("weather");
const weatherKey = 'bfebc285607853a00e5d7cb88e7045e7';
const COORDS = 'coords';
const CNT = 16;

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
    } else {
        return '무풍';
    }
};

const getWeather = (lat, lng) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${weatherKey}&units=metric&lang=kr&cnt=${CNT}`
    ).then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
        let date = new Date();
        

        const createPOne = document.createElement('p');
        createPOne.textContent = `지역 : ${json.city.name}`
        weather.appendChild(createPOne);
        
        for(let i = 0; i < CNT; i++) {
            date.setTime(json.list[i].dt * 1000);

            let weatherText = {
                '시간': date,
                '기온': (json.list[i].main.temp).toFixed(1) + "°C",
                '최고 기온': (json.list[i].main.temp_max).toFixed(1),
                '최저 기온': (json.list[i].main.temp_min).toFixed(1),
                '기압': json.list[i].main.pressure + "hPa",
                '습도': json.list[i].main.humidity + "%",
                '날씨': json.list[i].weather[0].description,
                '풍속': json.list[i].wind.speed + "m/s",
                '풍향': degree(json.list[i].wind.deg),
                '구름': json.list[i].clouds.all + "%",
            };

            const createDiv = document.createElement('div');

            Object.keys(weatherText).map(key => {
                const createP = document.createElement('p');
                createP.textContent = `${key} : ${weatherText[key]}`
                createDiv.appendChild(createP);
                weather.appendChild(createDiv);
            });
        }
        
    });
};

const saveCoords = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

const handleGeoError = () => {
    console.log("위치 정보를 가져올 수 없습니다.");
};

const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
};

const init = () => {
    loadCoords();
};

init();