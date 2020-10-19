let now = new Date();

function currentDayTime() {
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

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${day}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour} : ${minute}`;
}

currentDayTime();

function searchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = city.value;
}

function currentTempCelsius (response) {
let temperature = Math.round(response.data.main.temp);
document.querySelector("#current-temperature").innerHTML = temperature;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
let celsiusLabel = document.querySelector("#celsius-label");
let fahrenheitLabel = document.querySelector("#fahrenheit-label");
celsiusLabel.classList.add("active");
fahrenheitLabel.classList.remove("active");
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
  let celsiusLabel = document.querySelector("#celsius-label");
  let fahrenheitLabel = document.querySelector("#fahrenheit-label");
  fahrenheitLabel.classList.add("active");
  celsiusLabel.classList.remove("active");
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
