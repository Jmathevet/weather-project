function currentDayTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} <small class = "currentTime"> |  ${formatHours(timestamp)}</small>`;

}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function currentTempCelsius (response) {
document.querySelector("#current-day").innerHTML = currentDayTime(response.data.dt * 1000);
celsiusTemperature = Math.round(response.data.main.temp);
feelsLikeTemp = Math.round(response.data.main.feels_like);
minTemp = Math.round(response.data.main.temp_min);
maxTemp =  Math.round(response.data.main.temp_max);
document.querySelector("#current-temperature").innerHTML = celsiusTemperature;
document.querySelector("#searched-city").innerHTML = response.data.name;
document.querySelector("#searched-country").innerHTML = response.data.sys.country;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#feels-like").innerHTML = feelsLikeTemp;
document.querySelector("#min").innerHTML = minTemp;
document.querySelector("#max").innerHTML = maxTemp;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#current-icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#sunrise-time").innerHTML = formatHours(response.data.sys.sunrise*1000);
document.querySelector("#sunset-time").innerHTML = formatHours(response.data.sys.sunset*1000);

}

function getForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
     <div class="col-12" id="forecast" >
      <div class="card">
       <div class="card-header"> <span class="forecast-time"> ${formatHours(forecast.dt * 1000)} </span> <span class="forecast-description"> ${forecast.weather[0].main} </span></div>
        <div class="card-body">
        <span class="week-degrees"> <strong> ${Math.round(forecast.main.temp_max)}° </strong>  <small>|  ${Math.round(forecast.main.temp_min)}° </small> </span>
          <img class="icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>      
    </div>
  </div>
  </div>
  `;
  }
}


function searchedCity(city) {
let key = "66c3da230a807013d743b01ba23894fa";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(currentTempCelsius)
  
url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(getForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchedCity(cityInputElement.value);
}

function getTempFahrenheit(event) {
  event.preventDefault();
let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
document.querySelector("#current-temperature").innerHTML = Math.round(fahrenheiTemperature);
document.querySelector("#feels-like").innerHTML = Math.round((feelsLikeTemp * 9) / 5 + 32);
document.querySelector("#min").innerHTML = Math.round((minTemp* 9) / 5 + 32);
document.querySelector("#max").innerHTML = Math.round((maxTemp* 9) / 5 + 32);
document.querySelector("#celsius-label").classList.remove("active");
document.querySelector("#fahrenheit-label").classList.add("active");
}

function getCelsiusTemp(event) {
event.preventDefault();
document.querySelector("#celsius-label").classList.add("active");
document.querySelector("#fahrenheit-label").classList.remove("active");
document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#feels-like").innerHTML = Math.round(feelsLikeTemp);
document.querySelector("#min").innerHTML = Math.round(minTemp);
document.querySelector("#max").innerHTML = Math.round(maxTemp);
}

let celsiusTemperature = null;
let feelsLikeTemp = null;
let minTemp = null;
let maxTemp =null;
let forecastMin = null;
let forecastMax = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitDegrees = document.querySelector("#fahrenheit-label");
fahrenheitDegrees.addEventListener("click", getTempFahrenheit);

let celsiusDegrees = document.querySelector("#celsius-label");
celsiusDegrees.addEventListener("click", getCelsiusTemp);


function showTemp(response) {
let city = response.data.name;
searchedCity(city)
}

function showPosition(position) {
  let key = "66c3da230a807013d743b01ba23894fa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showTemp);
}

function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");

button.addEventListener("click", getCurrentPosition);

searchedCity("Paris")
