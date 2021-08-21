var apiKey = "456382b69ba78bc0d18ae825d9b6baff";
var citySearchInput = document.querySelector("#citySearchInput");
var citySearchBtn = document.querySelector("#citySearchBtn");
var getCurrentWeather = function() {
    console.log("getCurrentWeather fired!")
};

citySearchBtn.addEventListener("click", getCurrentWeather)