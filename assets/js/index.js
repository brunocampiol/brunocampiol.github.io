const fetchDotAnimation = (element, message) => {
  element.innerHTML = message;
  let dotCount = 0;
  const dotAnimation = setInterval(() => {
    if (dotCount < 3) {
      element.innerHTML += '.';
      dotCount++;
    } else {
      element.innerHTML = message;
      dotCount = 0;
    }
  }, 200);

  return dotAnimation;
};

const fetchWeatherData = async () => {
  try {
    const weatherDataElement = document.getElementById('weatherData');
    const loadWeatherMessage = 'Fetching weather data';
    const dotAnimation = fetchDotAnimation(weatherDataElement, loadWeatherMessage);

    const response = await fetch('https://brunocampiol.online/api/Weather/FromContextIpAddress');
    clearInterval(dotAnimation); // Stop dot animation

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
    const loadFactMessage = 'Looking for a random fact';
    const dotAnimation = fetchDotAnimation(factDataElement, loadFactMessage);

    const response = await fetch('https://brunocampiol.online/api/Fact/SaveFactAndComputeHash');
    clearInterval(dotAnimation); // Stop dot animation

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
