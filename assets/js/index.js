const fetchWeatherData = async () => {
  try {
    const response = await fetch('https://brunocampiol.online/api/Weather/FromContextIpAddress');
    
    if (response.status === 200) {
      const data = await response.json();
      const { englishName, countryCode, weatherText, temperature  } = data;
      const flagUrl = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
      const flagImage = `<img src="${flagUrl}" alt="${countryCode}" />`;
      const weatherData = `${englishName} - ${flagImage} <br /> ${weatherText} - ${temperature}`;
      document.getElementById('weatherData').innerHTML = weatherData;
    } else {
      console.error(`fetchWeatherData -> Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('fetchWeatherData -> An error occurred while fetching data:', error);
  }
};

const fetchFactData = async () => {
  try {
    const response = await fetch('https://brunocampiol.online/api/Fact/SaveFactAndComputeHash');
    
    if (response.status === 200) {
      const data = await response.json();
      const { fact } = data;
      document.getElementById('factData').innerHTML = fact;
    } else {
      console.error(`fetchFactData -> Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('fetchFactData -> An error occurred while fetching data:', error);
  }
};

fetchWeatherData();
fetchFactData();