const apiKey = "4ec1b92f491bd8c00d83d39e06e9776a"; // Replace with your key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const icon = data.weather[0].icon;           // API weather icon
    const description = data.weather[0].description; // full text like "light rain"
    const mainCondition = data.weather[0].main;  // general type: "Rain", "Clouds", "Clear"

    // Change background more precisely
    setBackground(mainCondition, description);

    const weather = `
      <h2><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h2>
      <p><img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="icon"></p>
      <p><strong>${data.main.temp} °C</strong> | ${description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>🌡 Feels Like: ${data.main.feels_like} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
    resultDiv.innerHTML = weather;
  } catch (error) {
    resultDiv.innerHTML = "<p>❌ " + error.message + "</p>";
  }
}

function setBackground(main, description) {
  let bg = "images/default.jpg";

  switch (main) {
    case "Clear":
      bg = "images/sunny.png";
      break;
    case "Clouds":
      // Differentiate few clouds vs overcast
      if (description.includes("few")) bg = "images/partly-cloudy.jpg";
      else bg = "images/cloudy.png";
      break;
    case "Rain":
    case "Drizzle":
      bg = "images/rainy.png";
      break;
    case "Snow":
      bg = "images/snowy.png";
      break;
    case "Thunderstorm":
      bg = "images/storm.png";
      break;
    case "Mist":
    case "Fog":
    case "Haze":
      bg = "images/fog.png";
      break;
  }

  document.body.style.background = `url('${bg}') no-repeat center center/cover`;
}
