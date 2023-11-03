const fetchData = async () => {
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
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

fetchData();