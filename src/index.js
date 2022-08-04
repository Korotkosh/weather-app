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
let minute = now.getMinutes();
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
  console.log(response.data);
  let correntTemperature = document.querySelector("#corrent-temperature");
  let temperature = Math.round(response.data.main.temp);
  correntTemperature.innerHTML = `${temperature}`;
}

let cityButton = document.querySelector("#city-button");
cityButton.addEventListener("click", changeCity);
