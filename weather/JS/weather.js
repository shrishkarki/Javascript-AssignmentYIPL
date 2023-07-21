const key = "3vjq3cYh1QXkiQ2VGu8GsxXrjaTNbUl4";



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
  const getCityApiParams = new URLSearchParams();
  getCityApiParams.append('apikey', key);
  getCityApiParams.append('q', city);
  const paramsString = getCityApiParams.toString();
  const apiUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search?' + paramsString;

  // const baseUrlCity = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  const response = await fetch(apiUrl);
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
  
  
        const baseCurrentPosition = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${latitude},${longitude}`;
  
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