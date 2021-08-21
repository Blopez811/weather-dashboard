var apiKey = "456382b69ba78bc0d18ae825d9b6baff";
var citySearchInput = document.querySelector("#citySearchInput");
var citySearchBtn = document.querySelector("#citySearchBtn");
var presentResultsEl = document.querySelector("#presentResults");
var getCurrentWeather = function (coord) {
    let coordLat = coord.lat;
    let coordLon = coord.lon;
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon + "&exclude=hourly,daily&appid=" + apiKey;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
     var uvi = data.current.uvi;
     var uviEl = document.createElement("div");
     uviEl.textContent = "UV Index: " + uvi   
     presentResultsEl.appendChild(uviEl);
    console.log(data)});
}

var getWeatherCity = function () {
    presentResultsEl.textContent = "";
    console.log(citySearchInput.value);
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput.value + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let currentDate = new Date().toLocaleDateString();
            let currentCity = data.name
            var currentCityEl = document.createElement("div");
            currentCityEl.textContent = currentCity + " " + "(" + currentDate + ")";
            presentResultsEl.appendChild(currentCityEl);

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
            let coord = data.coord;
            return coord;
        }).then(coord => getCurrentWeather(coord))
}

var getFiveDays = function() {
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput.value + "&appid=" + apiKey;
    fetch(apiUrl)
    .then(response => response.json())
    .then( data => {
        console.log(data, "this is what you need");
        for(i=0; i<data.list.length; i++) {
            console.log(data.list[i].dt_txt) 
        }
    }) 
}
citySearchBtn.addEventListener("click", getWeatherCity)
// citySearchBtn.addEventListener("click", getCurrentWeather)
citySearchBtn.addEventListener("click", getFiveDays);