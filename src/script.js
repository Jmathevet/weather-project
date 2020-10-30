function currentDayTime() {
  let now = new Date();
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

 document.querySelector("#current-day").innerHTML = `${day}`;
 document.querySelector("#current-time").innerHTML = `${hour} : ${minute}`;
}

currentDayTime();

function formatDate (timestamp) {
let date = new Date (timestamp)
let hours = date.getHours();
let minutes = date.getMinutes();
return `${hours}:${minutes}`;
}


function currentTempCelsius (response) {
celsiusTemperature = Math.round(response.data.main.temp);
document.querySelector("#current-temperature").innerHTML = celsiusTemperature;
document.querySelector("#searched-city").innerHTML = response.data.name;
document.querySelector("#searched-country").innerHTML = response.data.sys.country;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#current-icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#sunrise-time").innerHTML = formatDate(response.data.sys.sunrise*1000);
document.querySelector("#sunset-time").innerHTML = formatDate(response.data.sys.sunset*1000);
}

function searchedCity(city) {
let key = "66c3da230a807013d743b01ba23894fa";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(currentTempCelsius)
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
document.querySelector("#celsius-label").classList.remove("active");
document.querySelector("#fahrenheit-label").classList.add("active");
}

function getCelsiusTemp(event) {
event.preventDefault();
document.querySelector("#celsius-label").classList.add("active");
document.querySelector("#fahrenheit-label").classList.remove("active");
document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitDegrees = document.querySelector("#fahrenheit-label");
fahrenheitDegrees.addEventListener("click", getTempFahrenheit);

let celsiusDegrees = document.querySelector("#celsius-label");
celsiusDegrees.addEventListener("click", getCelsiusTemp);


function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
document.querySelector("#current-temperature").innerHTML = temperature;
document.querySelector("#searched-city").innerHTML = response.data.name;
document.querySelector("#city-input").value = response.data.name;
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
