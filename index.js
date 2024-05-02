//Inspired to practice by https://www.youtube.com/watch?v=MIYQR-Ybrn4&list=PLjwm_8O3suyOgDS_Z8AWbbq3zpCmR-WE9
import apiKey, { apiUrl } from "./apiKey.js";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to compare Api-data and change icon-src
function checkWeatherIcon(apiData) {
  if (apiData.weather[0].main == "Clouds") {
    weatherIcon.src = "./images/clouds.png";
  } else if (apiData.weather[0].main == "Clear") {
    weatherIcon.src = "./images/clear.png";
  } else if (apiData.weather[0].main == "Rain") {
    weatherIcon.src = "./images/rain.png";
  } else if (apiData.weather[0].main == "Drizzle") {
    weatherIcon.src = "./images/drizzle.png";
  } else if (apiData.weather[0].main == "Mist") {
    weatherIcon.src = "./images/mist.png";
  }
}

// Function to get and display data from Api
function updateData(apiData) {
  document.querySelector(".city").innerHTML = apiData.name;
  document.querySelector(".temp").innerHTML =
    Math.round(apiData.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = apiData.main.humidity + "%";
  document.querySelector(".wind").innerHTML = apiData.wind.speed + "km/h";
}

// Function to checkWeather
async function checkWeather(cityName) {
  const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    //console.log(data);
    updateData(data);

    checkWeatherIcon(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

//TODOS:
//1. check flex error (DONE)
//2. check ApiKey registration  (DONE)
//3. move script into index.js  (DONE)
//4. apiKey is important information move into apiKey.js (DONE)
//5. rewrite index.js (clean code + seperate concerns into functions OOP)  (DONE)
//6. redo styling (add personal touch) ()
//7. create .gitignore  (DONE)
//8. push into gitHub as a practice project (dont forget mentions inspo)
