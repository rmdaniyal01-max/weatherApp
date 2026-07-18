let cityInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
let weather = document.getElementById("weather");
let weatherCard = document.getElementById("weatherCard");


async function getLocation(city) {

    if (city === ""){
        weather.innerHTML = `<p> Please enter a City</p>`
        return;
    }
    
        weather.innerHTML = `<p>Loading....</p>`

    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    let data = await response.json();

    if(!data.results || data.results.length === 0){
        weather.innerHTML = `<p>City not found</p>`
        return;
    }
    let location = data.results[0];

    let weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location
        .latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,relative_humidity_2m&daily=sunrise,sunset&timezone=auto`);
    let weatherData = await weatherResponse.json();
    console.log(weatherData)

    let weatherCode = weatherData.current.weather_code;
    let weatherIcon = "";

    if(weatherCode === 0){
        weatherIcon = "☀";
    }
    else if(weatherCode >= 1 && weatherCode <= 3){
        weatherIcon = "⛅";
    }
    else if(weatherCode >= 51 && weatherCode <= 67){
        weatherIcon = "🌧";
    }
    else if(weatherCode >= 71 && weatherCode <= 77){
        weatherIcon = "❄";
    }
    else if(weatherCode === 95){
        weatherIcon = "⛈";
    }
    else{
        weatherIcon = "🌤";
    }

    if(weatherCode === 0){
        document.body.style.background = 
        "linear-gradient(135deg,#4facfe,#00f2fe)"
    }
    else if(weatherCode >= 1 && weatherCode <= 3){
        document.body.style.background = 
        "linear-gradient(135deg,#a1c4fd,#c2e9fb)"
    }
    else if(weatherCode >=51){
       document.body.style.background = 
        "linear-gradient(135deg,#616161,#9bc5c3)" 
    }

    if(weatherCode === 0){
        weatherCard.style.backgroundColor = 
        "linear-gradient(135deg,#4facfe,#00f2fe)"
    }
    else if(weatherCode >= 1 && weatherCode <= 3){
        weatherCard.style.backgroundColor = 
        "linear-gradient(135deg,#a1c4fd,#c2e9fb)"
    }
    else if(weatherCode >=51){
       weatherCard.style.backgroundColor = 
        "linear-gradient(135deg,#616161,#9bc5c3)" 
    }

    let today = new Date();

    let date = today.toLocaleDateString("en-US",{
        weekday:"long",
        day:"numeric",
        month:"long"
    })

    weather.innerHTML = `
    <div class="weather-icon">${weatherIcon}</div>
    <h2>${location.name}</h2>
    <h5>${location.country}</h5>
    <p class="date">${date}</p>
    <p>Sunrise: ${weatherData.daily.sunrise [0]}</p>
    <p>Sunset: ${weatherData.daily.sunset [0]}</p>
    <div class="weather-details">
        <div class="detail-card">
            <h3>Temperature</h3>
            <p>${weatherData.current.temperature_2m} °C </p>
        </div>
        <div class="detail-card">
            <h3>Real Feel</h3>
            <p>${weatherData.current.apparent_temperature} °C </p>
        </div>
        <div class="detail-card">
            <h3>Wind Speed</h3>
            <p>${weatherData.current.wind_speed_10m} Km/h</p>
        </div>
        <div class="detail-card">
            <h3>Humidity</h3>
            <p>${weatherData.current.relative_humidity_2m} %</p>
        </div>
    </div>`;

}

searchButton.addEventListener("click", () => {
    let city = cityInput.value.trim();
    getLocation(city)
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        searchButton.click();
    };
});