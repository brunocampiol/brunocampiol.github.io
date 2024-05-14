const fetchWeatherData = async () => {
  try {
    const weatherDataElement = document.getElementById('weatherData');
    const loadWeatherMessage = 'loading weather data ';

    // Dot loading animation
    weatherDataElement.innerHTML = loadWeatherMessage;
    let dotCount = 0;
    const dotAnimationInterval = setInterval(() => {
      if (dotCount < 3) {
        weatherDataElement.innerHTML += '.';
        dotCount++;
      } else {
        weatherDataElement.innerHTML = loadWeatherMessage;
        dotCount = 0;
      }
    }, 200);

    const response = await fetch('https://brunocampiol.online/api/Weather/FromContextIpAddress');
    clearInterval(dotAnimationInterval); // Stop dot animation

    if (response.status === 200) {
      const data = await response.json();
      const { englishName, countryCode, weatherText, temperature  } = data;
      const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
      const flagImage = `<img src="${flagUrl}" alt="${countryCode}" />`;
      const weatherData = `${englishName} - ${flagImage} <br /> ${weatherText} - ${temperature}`;
      weatherDataElement.innerHTML = weatherData;
    } else {
      console.error(`fetchWeatherData -> Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('fetchWeatherData -> An error occurred while fetching data:', error);
  }
};

const fetchFactData = async () => {
  try {
    const factDataElement = document.getElementById('factData');
    const loadFactMessage = 'Looking for a random fact ';

    // Dot loading animation
    factDataElement.innerHTML = loadFactMessage;
    let dotCount = 0;
    const dotAnimationInterval = setInterval(() => {
      if (dotCount < 3) {
        factDataElement.innerHTML += '.';
        dotCount++;
      } else {
        factDataElement.innerHTML = loadFactMessage;
        dotCount = 0;
      }
    }, 200);

    const response = await fetch('https://brunocampiol.online/api/Fact/SaveFactAndComputeHash');
    clearInterval(dotAnimationInterval); // Stop dot animation

    if (response.status === 200) {
      const data = await response.json();
      const { fact } = data;
      factDataElement.innerHTML = fact;
    } else {
      console.error(`fetchFactData -> Request failed with status: ${response.status}`);
      factDataElement.innerHTML = 'Failed to retrieve a random fact :('
    }
  } catch (error) {
    console.error('fetchFactData -> An error occurred while fetching data:', error);
    factDataElement.innerHTML = 'Failed to retrieve a random fact :('
  }
};

fetchWeatherData();
fetchFactData();