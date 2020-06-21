const weather = document.getElementById("openWeather");
const weatherKey = 'bfebc285607853a00e5d7cb88e7045e7';
const COORDS = 'coords';
const CNT = 16;
let coldColorArr = ["#0000ff", "#4040ff", "#8080ff", "#bfbfff"];
let hotColorArr = ['#ffb9b9', "#ffd1d1", "#ffb9b9", "#ff8b8b", "#ff5d5d", "#ff2e2e", "#ff0000"];

const degree = (deg) => {
    if(deg < 22.5 || deg >= 337.5) {
        return '북풍↓';
    } else if(deg >= 22.5 && deg < 67.5) {
        return '북동풍↙';
    } else if(deg >= 67.5 && deg < 112.5) {
        return '동풍←';
    } else if(deg >= 112.5 && deg < 157.5) {
        return '남동풍↖';
    } else if(deg >= 157.5 && deg < 202.5) {
        return '남풍↑';
    } else if(deg >= 202.5 && deg < 247.5) {
        return '남서풍↗';
    } else if(deg >= 247.5 && deg < 292.5) {
        return '서풍→';
    } else if(deg >= 292.5 && deg < 337.5) {
        return '북서풍↘';
    }
};

const dateToKorean = (date) => {
    let month, day, hour, week;
    let weekday = new Array(7);
    let text;
    weekday[0] = "일";
    weekday[1] = "월";
    weekday[2] = "화";
    weekday[3] = "수";
    weekday[4] = "목";
    weekday[5] = "금";
    weekday[6] = "토";

    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    week = weekday[date.getDay()];

    if (hour < 12) {
        hour = "오전  0" + hour;
    } else if (hour === 12) {
        hour = "오후 " + hour;
    } else {
        hour = "오후  0" + (hour - 12);
    }

    text = `${month}월 ${day}일(${week}) ${hour}시`;
    return text;
};

const addNumberColor = (num, data, dom) => {
    switch(data) {
        case '기온' :
            if(num < -12) {
                dom.style.color = coldColorArr[0];
                return num
            } else if(num < -9) {
                dom.style.color = coldColorArr[1];
                return num
            } else if(num < -6) {
                dom.style.color = coldColorArr[2];
                return num
            } else if(num < -3) {
                dom.style.color = coldColorArr[3];
                return num
            } else if(num < 5) {
                dom.style.color = hotColorArr[0];
                return num
            } else if(num < 10) {
                dom.style.color = hotColorArr[1];
                return num
            } else if(num < 15) {
                dom.style.color = hotColorArr[2];
                return num
            } else if(num < 20) {
                dom.style.color = hotColorArr[3];
                return num
            } else if(num < 25) {
                dom.style.color = hotColorArr[4];
                return num
            } else if(num < 30) {
                dom.style.color = hotColorArr[5];
                return num
            } else if(num >= 30) {
                dom.style.color = hotColorArr[6];
                return num
            }
            break;
        case '습도' :
        case '구름' :

            break;
        case '풍속' :

            break;
    }
};

const alarming = () => {
    setTimeout(() => {
        notify();
    }, 100);
};

const notify = () => {
    if(Notification.permission !== 'granted') {
        alert('알람 기능이 불가능합니다!');
    } else {
        const noti = new Notification('알람 제목', {body:'알람 내용'});
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
        
        let days = date.setTime(json.list[0].dt * 1000);
        days = date.getDate();
        let curDays = 0;

        const createHrOne = document.createElement('hr');
        weather.appendChild(createHrOne);

        const createPTwo = document.createElement('p');
        createPTwo.textContent = dateToKorean(date).slice(0, -7);
        weather.appendChild(createPTwo);

        for(let i = 0; i < CNT; i++) {
            date.setTime(json.list[i].dt * 1000);
            curDays = date.getDate();

            

            if(days !== curDays) {
                const createHr = document.createElement('hr');
                weather.appendChild(createHr);

                const createP = document.createElement('p');
                createP.textContent = dateToKorean(date).slice(0, -7);
                weather.appendChild(createP);
                days = curDays;
            }

            let weatherText = {
                '기온': (json.list[i].main.temp).toFixed(1),
                '습도': json.list[i].main.humidity + "%",
                '날씨': json.list[i].weather[0].description,
                '풍속': json.list[i].wind.speed + "m/s",
                '풍향': degree(json.list[i].wind.deg),
                '구름': json.list[i].clouds.all + "%",
            };

            const createDiv = document.createElement('div');

            const createP = document.createElement('p');
            createP.textContent = dateToKorean(date).slice(-7);
            createP.style.borderBottom = "1px solid black";
            createP.style.marginBottom = "-1px";
            createDiv.appendChild(createP);


            Object.keys(weatherText).map(key => {
                const createP = document.createElement('p');
                
                if(key === '기온') {
                    createP.textContent = `${key} : ${addNumberColor(weatherText[key], key, createP)}°C`
                } else {
                    createP.textContent = `${key} : ${weatherText[key]}`
                }
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
    window.onload = function () {
        if (window.Notification) {
            Notification.requestPermission();
        }
    }
};

init();