const key = "GnlyNJuYnBIQLajB7vQGAYQahsFqYMTS";



const cityForm = document.querySelector("form");
const cityInput = document.getElementById("user__input");
const container = document.querySelector(".container-day");

const body = document.querySelector('body');





const weatherDetails = document.querySelector(".weather__details");
const weatherPrediction = document.querySelector(".weather__prediction");
const weatherIcon = document.querySelector(".weather__icon");
const eachHour = document.querySelector(".each__hour");
const hourly = document.querySelector(".hourly");

const hourlyForecast = document.querySelector(".hourly__forecast");

const days = document.querySelector(".days");

const daysForecast = document.querySelector(".days__forecast");
console.log(weatherDetails.innerHTML);

// if(weatherDetails.innerHTML){




const fahrenheitToCelsius = (fahrenheit) => {
  var celsius = (fahrenheit - 32) * 5 / 9;
  return celsius.toFixed(1);
}


const getCity = async (city) => {
  // const getCityApiParams = new URLSearchParams();
  // getCityApiParams.append('apikey', key);
  // getCityApiParams.append('q', city);
  // const paramsString = getCityApiParams.toString();
  // const apiUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search?' + paramsString;

  const baseUrlCity = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  const response = await fetch(baseUrlCity);
  console.log("API called");
  if (response.status !== 200) {
    throw new Error('error found');
  }
  const data = await response.json();


  return data[0];

}

const getWeather = async (id) => {
  const getWeatherApiParams = new URLSearchParams();
  getWeatherApiParams.append('apikey', key);
  getWeatherApiParams.append('details', true);
  const paramsString = getWeatherApiParams.toString();
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${id}?` + paramsString;


  // const baseUrlWeather = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}&details=true`;

  const response = await fetch(apiUrl);
  if (response.status !== 200) {
    throw new Error('error found');
  }
  const data = await response.json();
  weatherDetails.innerHTML = "";

  return data[0];


}
const getHoursWeather = async (city) => {
  const getHoursApiParams = new URLSearchParams();
  getHoursApiParams.append('apikey', key);
  getHoursApiParams.append('details', true);
  const paramsString = getHoursApiParams.toString();
  const apiUrl = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${city}?` + paramsString;


  // const baseUrlHrs = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${city}?apikey=${key}`;

  const response = await fetch(apiUrl);
  if (response.status !== 200) {
    throw new Error('error found');

  }
  const data = await response.json();

  return data;


}

const getDaysWeather = async (city) => {
  const getDaysApiParams = new URLSearchParams();
  getDaysApiParams.append('apikey', key);
  const paramsString = getDaysApiParams.toString();
  const apiUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?` + paramsString;


  // const baseUrlDays=`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${key}`;
  const response = await fetch(apiUrl);
  if (response.status !== 200) {
    throw new Error("error Found");
  }
  const data = await response.json();
  return data;

}



const updateCity = async (city) => {

  const cityInfo = await getCity(city);
  const weatherInfo = await getWeather(cityInfo.Key);
  const weatherHours = await getHoursWeather(cityInfo.Key);
  const daysWeather = await getDaysWeather(cityInfo.Key);


  return {
    cityInfo,
    weatherInfo,
    weatherHours,
    daysWeather
  }

}


// updateting UI

const updataUI = (data) => {
  const { cityInfo, weatherInfo, weatherHours, daysWeather } = data;

  console.log(cityInfo, weatherInfo);
  const next12hrs = weatherHours;
  const next4days = daysWeather.DailyForecasts.slice(1, 5);


  if (cityInfo) {
    weatherDetails.style.visibility = "visible";
    weatherPrediction.style.visibility = "visible";
    hourly.style.display = "block";
    days.style.display = "block";
  }


  hourlyForecast.innerHTML = "";

  daysForecast.innerHTML = "";

  //  console.log(weatherInfo.IsDayTime);
  const backgroundImages = {
    sunnyDay: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/sunny-day.jpg")',
    sunnyNight: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/sunny-night.jpg")',
    cloudyDay: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/cloudy-day.jpg")',
    cloudyNight: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)), url(./assets/cloudy-night.jpg)',
    rainDay: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/rain-day.jpg")',
    rainNight: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/rain-night.jpg")',
    clearDay: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/clear-day.jpg")',
    clearNight: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/clear-night.jpg")',
    thunderDay: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/thunder-day.jpg")',
    thunderNight: 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7)),url("./assets/thunder-night.jpg")',

  };

  const weatherCondition = weatherInfo.WeatherText.toLowerCase();



  const changeBodyBackground = (dayImg, nightImg) => {
    console.log("inside")
    if (weatherInfo.IsDayTime) {


      body.style.backgroundImage = dayImg;
      body.style.height = "100%";
    }
    else {
      body.style.backgroundImage = nightImg;
      body.style.height = "100%";
    }

  }

  // for sunny
  weatherCondition.includes("sun") ?
    changeBodyBackground(backgroundImages.sunnyDay, backgroundImages, backgroundImages.sunnyNight) :
    weatherCondition.includes("cloud") ?
      changeBodyBackground(backgroundImages.cloudyDay, backgroundImages.cloudyNight) :
      weatherCondition.includes("clear") ?
        changeBodyBackground(backgroundImages.clearDay, backgroundImages.clearNight) :
        weatherCondition.includes("rain") ?
          changeBodyBackground(backgroundImages.rainDay, backgroundImages.rainNight) :
          weatherCondition.includes("thunderstorm") ?
            changeBodyBackground(backgroundImages.thunderDay, backgroundImages.thunderNight) : null



  const iconSrc = `icons/${weatherInfo.WeatherIcon}.png`;


  weatherDetails.innerHTML = `
    
           <figure class="weather__icon"><img src=${iconSrc} alt=""></figure>
             <figcaption >${weatherInfo.WeatherText}</figcaption> 
             <h4 class="weather__city"><i class="fa-solid fa-location-dot"></i> ${cityInfo.EnglishName}, ${cityInfo.Country.LocalizedName}</h4> 
             <h2 class="weather__temp">${weatherInfo.Temperature.Metric.Value}&deg; C</h2>
    `;

  weatherPrediction.innerHTML = `
     <li><i class="fa-solid fa-droplet"></i>  Humidity <span>${weatherInfo.RelativeHumidity}%</span></li>
     <li><i class="fa-solid fa-gauge-high"></i>  Pressure  <span>${weatherInfo.Pressure.Imperial.Value} ${weatherInfo.Pressure.Imperial.Unit}</span></li>
     <li><i class="fa-solid fa-wind"></i> WindSpeed <span>${weatherInfo.Wind.Speed.Metric.Value} ${weatherInfo.Wind.Speed.Metric.Unit}</span></li>
    
     <li><i class="fa-brands fa-cloudversify"></i>  Cloud Cover <span>${weatherInfo.CloudCover}% </span></li>
    `;


  //   weatherPrediction.innerHTML=`
  //   <li>Humidity ${weatherInfo.RelativeHumidity}</li>
  //   <li>Humidity ${weatherInfo.RelativeHumidity}</li>

  // <li>Dew Point ${weatherInfo.DewPoint.Metric.Value}%</li>
  // <li>Wind Gust ${weatherInfo.WindGust.Speed.Metric.Value} ${weatherInfo.WindGust.Speed.Metric.Unit}</li>


  //  `;




  // for next eight hours


  next12hrs.forEach((eachItem) => {


    let date = new Date(eachItem.DateTime);
    let hour = date.getHours();
    let period = (hour >= 12) ? 'PM' : 'AM';
    let hourly = hour % 12;



    const iconSrc = `icons/${eachItem.WeatherIcon}.png`;

    const temp = fahrenheitToCelsius(eachItem.Temperature.Value);


    hourlyForecast.innerHTML += `
                   <div class="each__hour">
                    <h3>${hourly === 0 ? hour : hourly} : 00 ${period}</h3>
                    <figure class=""><img src=${iconSrc} alt=""></figure>
                    <h2 class="">${temp}&deg; C</h2>
                    </div>
      `;
  });


  // for next 5 days


  next4days.forEach(eachItem => {
    const currentDate = new Date(eachItem.Date);
    let options = { weekday: 'long' };
    const weekName = currentDate.toLocaleDateString('en-US', options);


    const maxTemp = fahrenheitToCelsius(eachItem.Temperature.Maximum.Value);
    const minTemp = fahrenheitToCelsius(eachItem.Temperature.Minimum.Value);

    const dayIcon = `icons/${eachItem.Day.Icon}.png`;
    const nightIcon = `icons/${eachItem.Night.Icon}.png`;



    daysForecast.innerHTML += `
    <div class="each__days">
    <h2>${weekName}</h2>
    <h4>Min Temp: <span>${minTemp} &deg; C</span></h4>
    <h4>Max Temp: <span>${maxTemp} &deg; C</span></h4>
    <div class="day__night">
        <div>
            <h3>Day</h3>
            <figure class=""><img src=${dayIcon} alt=""></figure>
            <figcaption>${eachItem.Day.IconPhrase}</figcaption>
        </div>
        <div>
            <h3>Night</h3>
            <figure class=""><img src=${nightIcon} alt=""></figure>
            <figcaption>${eachItem.Night.IconPhrase}</figcaption>
        </div>
       
    </div>
</div>
    `
  })

}






// debounce technique
function debounce(func) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, 300);
  };
}

function handleInput(city) {

  updateCity(city).then(data => updataUI(data)).catch(err => console.log(err));
}



const debouncedHandleInput = debounce(handleInput);

cityInput && cityInput.addEventListener('input', (event) => {
  const cityName = event.target.value;
  debouncedHandleInput(cityName);
});





// cityInput.addEventListener('input',(event)=>{
//   if(event.target.value=""){
//     console.log("hello world")
//   }
// })
// if(cityInput.value=" "){
  document.addEventListener('DOMContentLoaded', function () {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Success callback
  
        // const getGeoApiParams = new URLSearchParams();
        // getGeoApiParams.append('apikey', key);
        // getGeoApiParams.append('q', latitude);
        // getGeoApiParams.append('q', longitude);
        // console.log(getGeoApiParams);
        // const params = [];
        // getGeoApiParams.forEach((value, name) => {
        //   console.log(name,value);
        //   if (name === 'q') {
        //     params.push(`${name}=${value}`);
           
        //   } else {
        //     params.push(value.toString());
        //   }
        // });
        // console.log(params)
        // // const paramsString = getGeoApiParams.toString();
        // const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?` + params.join(',');
        // console.log(apiUrl)
  
  
        const baseCurrentPosition = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${latitude},${longitude}`;
  
        const response = await fetch(baseCurrentPosition);
        const data = await response.json();
  
        cityInput.value = data.EnglishName;
        debouncedHandleInput(data.EnglishName);
      },
      error => {
  
        console.log('Error:', error.message);
        window.location.href = '../error.html';
      }
    );
  });
// }

























// cityForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const city = cityInput.value;


  // updateCity(city).then(data => updataUI(data)).catch(err => console.log(err));

// })