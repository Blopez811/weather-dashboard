var apiKey = "456382b69ba78bc0d18ae825d9b6baff";
var citySearchInput = document.querySelector("#citySearchInput");
var citySearchBtn = document.querySelector("#citySearchBtn");
var presentResultsEl = document.querySelector("#presentResults");
let futureResultsEl = document.querySelector("#futureResults");
let searchHistoryEl = document.querySelector("#searchHistory")
let searchHistory = localStorage.getItem("City");
if (!searchHistory) {
    searchHistory = [];
} else {
    searchHistory = JSON.parse(searchHistory);
}

let buttonFunction = function () {
    userInput = this.textContent;
    citySearchInput.value = userInput;
    getWeatherCity();
    getFiveDays();
    saveSearchHistory();
    console.log(userInput)
}

let displayHistory = function () {
    searchHistoryEl.textContent = "";
    for (i = 0; i < searchHistory.length; i++) {
        let searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.addEventListener("click", buttonFunction)
        searchHistoryBtn.textContent = searchHistory[i];
        searchHistoryEl.appendChild(searchHistoryBtn);
    }
}

displayHistory();
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
            console.log(data)
        });
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

var getFiveDays = function () {
    futureResultsEl.textContent = "";
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput.value + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data, "this is what you need");

            //TODO write a for loop
            for (i = 3; i < data.list.length; i += 8) {

                let dayOneDate = data.list[i].dt_txt
                let dayOneTemp = data.list[i].main.temp
                let dayOneWind = data.list[i].wind.speed
                let dayOneHumidity = data.list[i].main.humidity
                let dayOneText = dayOneDate + " " + "Temp: " + dayOneTemp + " " + "Wind: " + dayOneWind + " " + "Humidity: " + dayOneHumidity;
                let dayOneEl = document.createElement("div");
                dayOneEl.textContent = dayOneText;
                futureResultsEl.appendChild(dayOneEl);
            }



            // console.log(data.list[4].main.temp);
            // console.log(data.list[12].main.temp);
            // console.log(data.list[20].main.temp)
            // console.log(data.list[28].main.temp)
            // console.log(data.list[36].main.temp)
        })
}

var saveSearchHistory = function () {
    searchHistory.push(citySearchInput.value)
    localStorage.setItem("City", JSON.stringify(searchHistory));
    console.log(searchHistory);
    displayHistory();
}
citySearchBtn.addEventListener("click", getWeatherCity)
// citySearchBtn.addEventListener("click", getCurrentWeather)
citySearchBtn.addEventListener("click", getFiveDays);
citySearchBtn.addEventListener("click", saveSearchHistory);