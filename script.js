const API_KEY = "2c3eee65e9588eb7e0241be8ab6f595d";

{
    let name = document.getElementById('city');
    name.value = '';
    let date = document.getElementById('date');
    let day = document.getElementById('day');
    date.innerText = new Date().toLocaleDateString();
    let idx = new Date().getDay();
    let days = ['Monday' , 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    day.innerText = days[idx];
}

async function renderLeftData(city, descrip, temperature, weather, feels_like, humidity, clouds, visible){ 

    let cityDisplay = document.getElementById('cityName');
    let temp = document.getElementById("temp");
    let description = document.getElementById('weather-description');

    
    // Retrieving the ids Four Properties
    let feels = document.getElementById('feels-like');
    let humid = document.getElementById("humid");
    let cloud = document.getElementById('cloud');
    let visibility = document.getElementById('visibility');
    
    console.log(weather);
    
    // change the background according to weather
    let wrapper = document.getElementById('wrapper');

    if(weather == 'Clear'){
        wrapper.style.backgroundImage = await `url(/images/clear.jpg)`;
    }
    else if(weather == 'Rain'){
        wrapper.style.backgroundImage = await `url(/images/rain.jpg)`;
    }
    else if(weather == 'Clouds'){
        wrapper.style.backgroundImage = await `url(/images/clouds.jpg)`;
    }
    else if(weather == 'Snow'){
        wrapper.style.backgroundImage = await `url(/images/snow.jpg)`;
    }
    else if(weather == 'Thunderstorm'){
        wrapper.style.backgroundImage = await `url(/images/thunderstorm.jpg)`;
    }
    else if(weather == 'Haze'){
        wrapper.style.backgroundImage = await `url(/images/haze.jpg)`;
    }
    
    // remove the hidden property from UI
    let cityDetails = document.getElementById('cityDetails');
    await cityDetails.classList.remove('hidden');
    
    // adding city name, temp, description
    cityDisplay.innerText = await `${city}`;
    temp.innerText = await temperature;
    description.innerText = await `${descrip}`;
        
    // adding temp, humid, feels-like, clouds
    humid.innerText = await humidity;
    feels.innerText = await feels_like;
    cloud.innerText = await clouds;
    visibility.innerText = await visible;
    
    // remove the text from search bar
    name.value = "";
    
}

async function renderRightData(windspeed, gustspeed, min_temp, max_temp){
    
    let wind = document.getElementById("wind");
    let gust = document.getElementById("gust");
    let temp_min = document.getElementById('temp_min');
    let temp_max = document.getElementById('temp_max');
    
    wind.innerText = await windspeed;
    gust.innerText = await gustspeed;
    temp_min.innerText = await min_temp;
    temp_max.innerText = await max_temp;
}

async function changeUI(){

    // remove day and date UI
    let UI1 = document.getElementById('UI1');
    await UI1.classList.add('hidden');
    
}

async function fetchWeather(){
    let name = document.getElementById('city');
    city = name.value;
    try{
        const city = name.value;
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        // console.log(data);
        
        // all data fetched through api

        // Left Top
        // city name and temp
        let descrip = data.list[0].weather[0].description;
        let temperature = Math.round(data.list[0].main.temp.toFixed(1))/10;

        // weather name
        let weather = data.list[0].weather[0].main;

        // left bottom sectioon
        let feels_like = Math.round(data.list[0].main.feels_like.toFixed(2))/10;
        let humidity = data.list[0].main.humidity;
        let clouds = data.list[0].clouds.all;
        let visible = data.list[0].visibility/1000;


        // Right Bottom
        // min max temp
        let min_temp = Math.round(data.list[0].main.temp_min.toFixed(1))/10;
        let max_temp = Math.round(data.list[0].main.temp_max.toFixed(1))/10;

        // wind and gust
        let windspeed = data.list[0].wind.speed;
        let gust = data.list[0].wind.gust;
               
        renderLeftData(city, descrip, temperature, weather, feels_like, humidity, clouds, visible);
        renderRightData(windspeed, gust, min_temp, max_temp);
        changeUI();

        renderHourlyForecast(data);

        render5DayForecast();
    }
    catch(error){
        console.log("Error found", error);
    }
    name.value = '';
}

function renderHourlyForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = ''; // Clear existing content

    // weather icon in left section
    const weatherIcon = data.list[0].weather[0].icon;
    let icon = document.getElementById('weather-icon');
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" class="w-14 h-14">`;
    
    // Loop through the list of weather, 12 hours data
    for(let hrs = 0; hrs < 12; hrs++){
        let item = data.list[hrs];
        const dateTime = new Date(item.dt * 1000);
        const hours = dateTime.getHours().toString().padStart(2, '0') + ":00";
        const temp = Math.round(item.main.temp.toFixed(2))/10;
        const weatherIcon = item.weather[0].icon;

        // Create a new div for each forecast entry
        const forecastCard = document.createElement('div');
        forecastCard.className = 'flex flex-col gap-1 items-center justify-center';

        forecastCard.innerHTML = `
            <p>${hours}</p>
            <p>${temp}°C</p>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" class="w-10 h-10">
        `;

        // Append the card to the container
        forecastContainer.appendChild(forecastCard);
    }
}

function render5DayForecast(data){

}

// const locationBtn = document.getElementById('locations');

// locationBtn.addEventListener('click', function() {
    
// });