let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saterday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 0) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let correctTime = document.querySelector(".time");
correctTime.innerHTML = `${day}, ${hour}:${minute}`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputPassword2");
  let city = document.querySelector("#change-city");
  city.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let correntTemperature = document.querySelector("#corrent-temperature");
  let description = document.querySelector("#description");
  celsiusLink = response.data.main.temp;

  let temperature = Math.round(celsiusLink);
  correntTemperature.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector(`#icon`);
  let iconElementAPI = response.data.weather[0].icon;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElementAPI}@2x.png`
  );

  if (iconElementAPI === "01d" || iconElementAPI === "01n") {
    iconElement.setAttribute("src", `./images/sunny.svg`);
  } else if (iconElementAPI === "02d" || iconElementAPI === "02n") {
    iconElement.setAttribute("src", `./images/mostlyCloudy.svg`);
  } else if (iconElementAPI === "03d" || iconElementAPI === "03n") {
    iconElement.setAttribute("src", `./images/cloudy.svg`);
  } else if (iconElementAPI === "04d" || iconElementAPI === "04n") {
    iconElement.setAttribute("src", `./images/brokenClouds.svg`);
  } else if (iconElementAPI === "09d" || iconElementAPI === "09n") {
    iconElement.setAttribute("src", `./images/rain.svg`);
  } else if (iconElementAPI === "10d" || iconElementAPI === "10n") {
    iconElement.setAttribute("src", `./images/mostlyRainy.svg`);
  } else if (iconElementAPI === "11d" || iconElementAPI === "11n") {
    iconElement.setAttribute("src", `./images/thunderstorm.svg`);
  } else if (iconElementAPI === "13d" || iconElementAPI === "13n") {
    iconElement.setAttribute("src", `./images/snow.svg`);
  } else if (iconElementAPI === "50d" || iconElementAPI === "50n") {
    iconElement.setAttribute("src", `./images/mist.svg`);
  }
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function fahrenheitLink() {
  let correntTemperature = document.querySelector("#corrent-temperature");
  correntTemperature.innerHTML = Math.round(celsiusLink * 1.8 + 32);
}

let celsiusLink = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitLink);

let cityButton = document.querySelector("#city-button");
cityButton.addEventListener("click", changeCity);
