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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecastIcon() {
  let forecastIcon = document.querySelector("#forecast-icon");
  let forecastIconAPI = response.data.daily.weather[0].icon;
  forecastIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`
  );

  if (forecastIconAPI === "01d" || forecastIconAPI === "01n") {
    forecastIcon.setAttribute("src", `./images/sunny.svg`);
  } else if (forecastIconAPI === "02d" || forecastIconAPI === "02n") {
    forecastIcon.setAttribute("src", `./images/mostlyCloudy.svg`);
  } else if (forecastIconAPI === "03d" || forecastIconAPI === "03n") {
    forecastIcon.setAttribute("src", `./images/cloudy.svg`);
  } else if (forecastIconAPI === "04d" || forecastIconAPI === "04n") {
    forecastIcon.setAttribute("src", `./images/brokenClouds.svg`);
  } else if (forecastIconAPI === "09d" || forecastIconAPI === "09n") {
    forecastIcon.setAttribute("src", `./images/rain.svg`);
  } else if (forecastIconAPI === "10d" || forecastIconAPI === "10n") {
    forecastIcon.setAttribute("src", `./images/mostlyRainy.svg`);
  } else if (forecastIconAPI === "11d" || forecastIconAPI === "11n") {
    forecastIcon.setAttribute("src", `./images/thunderstorm.svg`);
  } else if (forecastIconAPI === "13d" || forecastIconAPI === "13n") {
    forecastIcon.setAttribute("src", `./images/snow.svg`);
  } else if (forecastIconAPI === "50d" || forecastIconAPI === "50n") {
    forecastIcon.setAttribute("src", `./images/mist.svg`);
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2">
                <div class="weater-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  "${showForecastIcon}"
                  alt="mostly cloudy"
                  class="weater-forecast-img"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-farecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-farecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let correntTemperature = document.querySelector("#corrent-temperature");
  let description = document.querySelector("#description");
  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(celsiusTemp);
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

  getForecast(response.data.coord);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputPassword2");
  let city = document.querySelector("#change-city");
  city.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

cityButton = document.querySelector("#city-button");
cityButton.addEventListener("click", changeCity);

searchCity("Kyiv");
