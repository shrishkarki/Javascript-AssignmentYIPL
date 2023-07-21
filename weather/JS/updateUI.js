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
  