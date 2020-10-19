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

function currentTemp (response) {
let temperature = Math.round(response.data.main.temp);
let currentTemperature = document.querySelector("#current-temperature");
currentTemperature.innerHTML = temperature;
}

function getTemp() {
let cityInput = document.querySelector("#city-input");
let city = cityInput.value;
let key = "66c3da230a807013d743b01ba23894fa";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
axios.get(url).then(currentTemp)
}


let form = document.querySelector("#search-form");

form.addEventListener("submit", searchedCity);

form.addEventListener("submit", getTemp);

function celsius() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `13`;
  let celsiusLabel = document.querySelector("#celsius-label");
  let fahrenheitLabel = document.querySelector("#fahrenheit-label");
  celsiusLabel.classList.add("active");
  fahrenheitLabel.classList.remove("active");
}

let celsiusDegrees = document.querySelector("#celsius-label");

celsiusDegrees.addEventListener("click", celsius);

function fahrenheit() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `46`;
  let celsiusLabel = document.querySelector("#celsius-label");
  let fahrenheitLabel = document.querySelector("#fahrenheit-label");
  fahrenheitLabel.classList.add("active");
  celsiusLabel.classList.remove("active");
}

let fahrenheitDegrees = document.querySelector("#fahrenheit-label");

fahrenheitDegrees.addEventListener("click", fahrenheit);

function showTemp(response) {
let currentTemperature = document.querySelector("#current-temperature");
let temperature = Math.round(response.data.main.temp);
currentTemperature.innerHTML = temperature;
let currentCity = document.querySelector("#searched-city");
currentCity.innerHTML = response.data.name;
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
