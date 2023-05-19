let block = document.querySelector('.block');
let inp = document.querySelector('.inp');
let btn = document.querySelector('.btn');

document.addEventListener('keydown', enter);

let city = 'Chisinau';

function enter(e) {
    if (e.key === 'Enter') {
        city = inp.value;
        getWeather(xhr)
        inp.value = ""
    } 
}

function getWeather(xhr) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e53ad7453f1c96b0ee25a9ac7204074e`
    xhr.open('GET', url);
    xhr.send();
}


let xhr = new XMLHttpRequest();

xhr.responseType = 'json';

xhr.onload = () => {
    let res = xhr.response
    let temp = Math.floor(res.main.temp - 273.15);
    let tempMax = Math.floor(res.main.temp_max - 273.15);
    let tempMin = Math.floor(res.main.temp_min - 273.15);
    let iconCod = res.weather[0].icon;
    let visibility = res.visibility;

    let list = `
    <div class="dataBlock">
        <h3>${res.name}</h3>
        <img src="./img/${iconCod}.png" alt="">
        <p>Temp. <b>${temp}</b>℃</p> 
        <p>Max: <b>${tempMax}</b>℃ Min: <b>${tempMin}</b>℃</p>
        <br/>
        <p>Visibility on the road, ft: <b>${visibility}</b></p>
        <p>Humidity: <b>${res.main.humidity}</b></p> 
        <p>Pressure, inHg: <b>${res.main.pressure}</b></p> 
        <p>Wind speed, mph: <b>${res.wind.speed}</b></p> 
    </div>
    `
    block.innerHTML = list
}

getWeather(xhr)