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

const fetchWithTimeout = async (url, timeout = 35000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId); 
    return response;
  } catch (error) {
    if (signal.aborted) {
      throw new Error('Request timed out after 35 seconds');
    } else {
      throw error; // Other errors
    }
  }
};

const fetchWeatherData = async () => {
  const weatherDataElement = document.getElementById('weatherData');
  const loadWeatherMessage = 'Fetching weather data';
  const dotAnimation = fetchDotAnimation(weatherDataElement, loadWeatherMessage);

  try {
    const response = await fetchWithTimeout('https://brunocampiol.top/api/Weather/FromContextIpAddress', 10000);
    clearInterval(dotAnimation);

    if (response.status === 200) {
      const data = await response.json();
      const { englishName, countryCode, weatherText, temperature } = data;
      const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
      const flagImage = `<img src="${flagUrl}" alt="${countryCode}" />`;
      const weatherData = `${englishName} - ${flagImage} <br /> ${weatherText} - ${temperature}`;
      weatherDataElement.innerHTML = weatherData;
    } else {
      console.error(`fetchWeatherData -> Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('fetchWeatherData -> An error occurred:', error.message);
  } finally {
    clearInterval(dotAnimation);
  }
};

const fetchFactData = async () => {
  const factDataElement = document.getElementById('factData');
  const loadFactMessage = 'Looking for a random fact';
  const dotAnimation = fetchDotAnimation(factDataElement, loadFactMessage);

  try {
    const response = await fetchWithTimeout('https://fakeresponder.com/?sleep=5000', 10000);
    clearInterval(dotAnimation);

    if (response.status === 200) {
      const data = await response.json();
      const { fact } = data;
      factDataElement.innerHTML = fact;
    } else {
      console.error(`fetchFactData -> Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('fetchFactData -> An error occurred:', error.message);
  } finally {
    clearInterval(dotAnimation);
  }
};

fetchWeatherData();
fetchFactData();