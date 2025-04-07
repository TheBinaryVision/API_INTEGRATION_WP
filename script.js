// Replace with your actual OpenWeatherMap API key
const weatherApiKey = "6faa45cbef82c4344f1bb5f82f5c67dc";
const newsApiKey = "6c9e97233fb14b3caaf361284202b705";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.success === false || !data.current) {
      document.getElementById("weatherResult").innerHTML = `<p>City not found or error in fetching.</p>`;
      return;
    }

    const weatherHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temperature} °C</p>
      <p><strong>Weather:</strong> ${data.current.weather_descriptions[0]}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
    `;
    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (err) {
    console.error(err);
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

// Fetch News Data
async function getNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok" || !data.articles.length) {
      document.getElementById("newsResult").innerHTML = `<p>No news available right now.</p>`;
      return;
    }

    const articles = data.articles.slice(0, 5); // Top 5 news
    let newsHTML = "";

    articles.forEach(article => {
      newsHTML += `
        <div class="news-card">
          <h4>${article.title}</h4>
          <p>${article.description || ""}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `;
    });

    document.getElementById("newsResult").innerHTML = newsHTML;
  } catch (err) {
    console.error(err);
    document.getElementById("newsResult").innerHTML = `<p>Error fetching news.</p>`;
  }
}

