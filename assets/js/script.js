var apiKey = "456382b69ba78bc0d18ae825d9b6baff";
var citySearchInput = document.querySelector("#citySearchInput");
var citySearchBtn = document.querySelector("#citySearchBtn");
var getCurrentWeather = function () {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=" + apiKey;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data));
}
      
citySearchBtn.addEventListener("click", getCurrentWeather)