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


function searchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
 document.querySelector("#searched-city").innerHTML = city.value;
}

function currentTempCelsius (response) {
let temperature = Math.round(response.data.main.temp);
document.querySelector("#current-temperature").innerHTML = temperature;
document.querySelector("#searched-country").innerHTML = response.data.sys.country;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#current-icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
document.querySelector("#celsius-label").classList.add("active");
document.querySelector("#fahrenheit-label").classList.remove("active");
document.querySelector("#description").innerHTML = response.data.weather[0].description;
let unixSunrise = response.data.sys.sunrise
let sunriseDate = new Date (unixSunrise*1000)
let sunriseHours = sunriseDate.getHours();
let sunriseMinutes = sunriseDate.getMinutes();
let formattedSunrise = `${sunriseHours}:${sunriseMinutes}`;
document.querySelector("#sunrise-time").innerHTML = formattedSunrise;
let unixSunset = response.data.sys.sunset;
let sunsetDate = new Date (unixSunset*1000);
let sunsetHours = sunsetDate.getHours();
let sunsetMinutes = sunsetDate.getMinutes();
let formattedSunset = `${sunsetHours}:${sunsetMinutes}`;
document.querySelector("#sunset-time").innerHTML = formattedSunset;
}

function getTempCelsius() {
let city = document.querySelector("#city-input").value;
let key = "66c3da230a807013d743b01ba23894fa";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(currentTempCelsius)
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", searchedCity);

form.addEventListener("submit", getTempCelsius);

let celsiusDegrees = document.querySelector("#celsius-label");

celsiusDegrees.addEventListener("click", getTempCelsius);

function currentTempFahrenheit (response) {
let temperature = Math.round(response.data.main.temp);
document.querySelector("#current-temperature").innerHTML = temperature;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#celsius-label").classList.remove("active");
document.querySelector("#fahrenheit-label").classList.add("active");

}

function getTempFahrenheit() {
let city = document.querySelector("#city-input").value;
let key = "66c3da230a807013d743b01ba23894fa";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
axios.get(url).then(currentTempFahrenheit)
}

let fahrenheitDegrees = document.querySelector("#fahrenheit-label");

fahrenheitDegrees.addEventListener("click", getTempFahrenheit);


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
