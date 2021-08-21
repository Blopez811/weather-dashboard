var apiKey = "456382b69ba78bc0d18ae825d9b6baff";
var citySearchInput = document.querySelector("#citySearchInput");
var citySearchBtn = document.querySelector("#citySearchBtn");
var presentResultsEl = document.querySelector("#presentResults");
// var getCurrentWeather = function () {
//     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" + apiKey;
//     fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

var getWeatherCity = function () {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=" + apiKey;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var temp = data.main.temp;
            console.log(temp);
            var wind = data.wind.speed;
            var humidity = data.main.humidity

            var tempEl = document.createElement("div")
            tempEl.textContent = "Temp: " + temp;
            presentResultsEl.appendChild(tempEl);

            var windEl = document.createElement("div");
            windEl.textContent = "Wind: " + wind;
            presentResultsEl.appendChild(windEl);

            var humidityEl = document.createElement("div");
            humidityEl.textContent = "Humidity: " + humidity;
            presentResultsEl.appendChild(humidityEl);
        });
}

citySearchBtn.addEventListener("click", getWeatherCity)