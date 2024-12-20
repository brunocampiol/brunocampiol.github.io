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
      throw new Error(`Request timed out after ${timeout/1000} seconds`);
    } else {
      throw error;
    }
  }
};

const fetchWeatherData = async () => {
  const weatherDataElement = document.getElementById('weatherData');
  const loadWeatherMessage = 'Fetching weather data';
  const dotAnimation = fetchDotAnimation(weatherDataElement, loadWeatherMessage);

  try {
    const response = await fetchWithTimeout('https://brunocampiol.top/api/Weather/FromContextIpAddress');
    clearInterval(dotAnimation);

    if (response.status === 200) {
      const data = await response.json();
      const { englishName, countryCode, weatherText, temperature } = data;
      const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
      const flagImage = `<img src="${flagUrl}" alt="${countryCode}" />`;
      const weatherData = `${englishName} - ${flagImage} <br /> ${weatherText} - ${temperature}`;
      weatherDataElement.innerHTML = weatherData;
    } else {
      const errorMessage = 'fetchWeatherData -> Expecting HTTP 200 OK but received ' +
                            `${response.status}. Content: '${await response.text()}'`;
      console.error(errorMessage);
    }
  } catch (error) {
    console.error(`fetchWeatherData -> Error message: ${error.message}`);
    console.error(error);
    weatherDataElement.innerHTML = '';
  } finally {
    clearInterval(dotAnimation);
  }
};

const fetchFactData = async () => {
  const factDataElement = document.getElementById('factData');
  const loadFactMessage = 'Looking for a random fact';
  const dotAnimation = fetchDotAnimation(factDataElement, loadFactMessage);
  const primaryUrl = 'https://brunocampiol.top/api/Fact/SaveFactAndComputeHash';
  const fallbackUrl = 'https://tunnel.bruno-campiol.workers.dev/api/Fact/SaveFactAndComputeHash';

  try {
    let response = await fetchWithTimeout(primaryUrl);
    if (response.status !== 200) {
      throw new Error(`Primary endpoint failed with status ${response.status}`);
    }
    const data = await response.json();
    const { fact } = data;
    factDataElement.innerHTML = fact;
  } catch (error) {
    console.error(`fetchFactData -> Primary endpoint error: ${error.message}`);
    try {
      let response = await fetchWithTimeout(fallbackUrl);
      if (response.status === 200) {
        const data = await response.json();
        const { fact } = data;
        factDataElement.innerHTML = fact;
      } else {
        const errorMessage = 'fetchFactData -> Fallback endpoint failed with status ' +
                              `${response.status}. Content: '${await response.text()}'`;
        console.error(errorMessage);
      }
    } catch (fallbackError) {
      console.error(`fetchFactData -> Fallback endpoint error: ${fallbackError.message}`);
      factDataElement.innerHTML = '';
    }
  } finally {
    clearInterval(dotAnimation);
  }
};

fetchWeatherData();
fetchFactData();