const api = {
  key: "8dd35f67fcb3042f8ff00c20606c7be5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  if (weather.cod === "404") {
    document.getElementById("main").style.display = "none";
    document.getElementById("not-found").style.display = "flex";
    document.getElementById("not-found").innerHTML = `<h1>CITY NOT FOUND</h1>`;
  } else {
    document.getElementById("not-found").style.display = "none";
    document.getElementById("main").style.display = "flex";
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
      weather.main.temp_max
    )}°c`;

    if (weather.weather[0].main === "Clear") {
      document.body.style.backgroundImage = 'url("./clear.jpg")';
    }
    if (weather.weather[0].main === "Clouds") {
      document.body.style.backgroundImage = 'url("./clouds.jpg")';
    }
    if (weather.weather[0].main === "Rain" ||  weather.weather[0].main ==="Drizzle"|| weather.weather[0].main =="Mist") {
      document.body.style.backgroundImage = 'url("./rain1.jpg")';
    }
    if (weather.weather[0].main === "Haze") {
      document.body.style.backgroundImage = 'url("./haze.jpg")';
    }
    if (weather.weather[0].main == "Snow") {
      document.body.style.backgroundImage = 'url("./snow.jpg")';
    }
  }
}

function dateBuilder(date) {
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
