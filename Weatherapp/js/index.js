let searchInput = document.querySelector("#search");
let findBtn = document.querySelector("#submit");
let navItem = document.querySelector("li");
function addClicked() {
   navItem.classList.add("clicked")
}
navItem.addEventListener("click", addClicked)
getData("Cairo")
async function getData(city) {
   let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=4182358d996446b7af1144213241109&q=${city}`);
   let res = await data.json();
   let data2 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4182358d996446b7af1144213241109&q=${city}&days=2`)
   let res2 = await data2.json(); 
   let location = res.location;
   let weather = res.current;
   let tomorrowWeather = res2.forecast.forecastday[1].day;
   let tomorrowWeathers = res2.forecast.forecastday;
   console.log(res);
   showTodayData(weather, location);
   showTomorrowData(tomorrowWeather,location )
}
findBtn.addEventListener("click", function () { getData(searchInput.value); });
document.addEventListener("keyup", function (event) { if (event.key == "Enter") { getData(searchInput.value); } });
function showTodayData(weather, location) {
   let dateandtime = `<p>${location.localtime}</p>`;
   let cartona = `
                     <div class="img position-relative">
                     <img src="${weather.condition.icon}" alt=""> 
                     </div>
                     <div class="info">
                     <h1>${weather.temp_c}° C</h1>
                     <p>Feels ${weather.feelslike_c}° C</p>
                     <h2  class="text-white">${location.country}</h2>
                     <h2 class="text-white">${location.name}</h2>
                     <h3>${weather.condition.text} day</h3>
                     <p><i class="fa-solid fa-wind"></i> Wind Speed ${weather.wind_kph} K/h</p>
                     <p><i class="fa-solid fa-droplet"></i> Humidity ${weather.humidity}%</p>
                     <p><i class="fa-solid fa-compass"></i> Wind direction ${weather.wind_dir}</p>
                     </div>
`;
   document.querySelector("#content").innerHTML = cartona;
   document.querySelector("#day-date").innerHTML = dateandtime;
};
function showTomorrowData(weather ,location){
   let dateandtime = `<p class="text-white">Tomorrow's Weather</p>`
   let cartona = `   
                     <div class="img position-relative">
                     <img src="${weather.condition.icon}" alt=""> 
                     </div>
                     <div class="info">
                     <h1>${weather.avgtemp_c}° C</h1>
                     <p> <i class="fa-solid fa-temperature-high px-1"></i> ${weather.maxtemp_c}° C</p>
                     <h2  class="text-white">${location.country}</h2>
                     <h2 class="text-white">${location.name}</h2>
                     <h3>${weather.condition.text} day</h3> 
                     <p><i class="fa-solid fa-wind"></i> Wind Speed ${weather.maxwind_kph} K/h</p>
                     <p><i class="fa-solid fa-droplet"></i> Humidity ${weather.avghumidity}%</p>
                     <p><i class="fa-solid fa-cloud-showers-heavy"></i> Chance of rain ${weather.daily_chance_of_rain}%</p>
                     </div>`;
                     document.querySelector("#t-content").innerHTML = cartona;
                     document.querySelector("#t-day-date").innerHTML = dateandtime;
};