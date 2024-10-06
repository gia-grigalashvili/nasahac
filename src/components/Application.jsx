import './application.css';
import { useState } from 'react';

export default function Application() {

  const [inputValues, setInputValues] = useState({
    variety: '',
    plantname: '',
    problem: '',
  });
  const [thinking, setThinking] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dotIndex, setDotIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const AnswersDuplicateAi = [
    {
      id: 1,
      answer: "To manage black rot disease in grape plants, it is important to remove infected grapes to prevent further spreading. If possible, rotate your grapevines with other crops that are not susceptible to the disease to break the cycle.  Apply Fungicides: Use fungicides labeled for black rot. Products containing active ingredients like myclobutanil or azoxystrobin can be effective. Some fungicides containing these active ingredients available for purchase in Georgia include Rally, Nova, and Abound."
    },
    {
      id: 2,
      answer: "Water melons need deep, infrequent watering, checking soil moisture about 6-8 inches down. Water early to minimize evaporation and avoid wet leaves. Use mulch for moisture retention and ensure good soil drainage to prevent rot and promote healthy growth."
    },
    {
      id: 3,
      answer: "Yes, it is an ideal time to plant corn this week. Corn is most commonly planted in early October, as it has the highest success rate. The next 10-day forecast is also favorable—temperatures for the next 7 days will range from 9°C to 22°C, which is within the normal range. There are no rainstorms or droughts to interfere with its planting. Additionally, there are no signs of any diseases, insects, or environmental problems that could affect its growth."
    }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value, 
    }));
  };

  const handleCounter = () => {
    setThinking(true);
    setDotIndex(0);
    setDisplayText('');

    // Show dots one by one
    const dotInterval = setInterval(() => {
      setDisplayText((prevText) => prevText + "."); 
      setDotIndex((prevIndex) => {
        if (prevIndex < 2) {
          return prevIndex + 1; 
        } else {
          clearInterval(dotInterval); 
          return prevIndex; 
        }
      });
    }, 500); 

    // Show answer text after dots
    setTimeout(() => {
      setThinking(false); 
      const plantNames = inputValues.plantname.toLowerCase().split(',').map(name => name.trim());
      const filteredAnswers = AnswersDuplicateAi.filter(answer => 
        plantNames.some(plant => answer.answer.toLowerCase().includes(plant))
      );

      if (filteredAnswers.length > 0) {
        setDisplayText(filteredAnswers.map(answer => answer.answer).join('\n'));
      } else {
        setDisplayText("No relevant information found for the given plant names.");
      }
    }, 2000); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCounter();
  };








  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const openCageApiKey = 'db019854b9aa46a0b97347bbc27fa9de';
  const fetchSuggestions = async (query) => {
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${openCageApiKey}`;
      try {
          const response = await fetch(geocodeUrl);
          if (!response.ok) throw new Error('Unable to get suggestions');
          const data = await response.json();
          setSuggestions(data.results);
      } catch (error) {
          console.error('Error fetching suggestions:', error);
      }
  };

  const fetchCoordinates = async (location) => {
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageApiKey}`;
      try {
          const response = await fetch(geocodeUrl);
          if (!response.ok) throw new Error('Unable to get coordinates');
          const data = await response.json();
          if (data.results.length === 0) throw new Error('No results found');
          const { lat: latitude, lng: longitude } = data.results[0].geometry;
          fetchWeather(latitude, longitude);
      } catch (error) {
          setWeatherData({ error: error.message });
      }
  };

  const fetchWeather = async (latitude, longitude) => {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setWeatherData(data);
      } catch (error) {
          setWeatherData({ error: error.message });
      }
  };

  const handleLocationChange = (event) => {
      const value = event.target.value;
      setLocation(value);
      if (value.length > 0) {
          fetchSuggestions(value);
      } else {
          setSuggestions([]);
      }
  };

  const handleSuggestionClick = (suggestion) => {
      setLocation(suggestion.formatted);
      setSuggestions([]);
  };

  const handleGetWeather = () => {
      fetchCoordinates(location);
  };

  const getWeatherDescription = (code) => {
      switch (code) {
          case 0: return '☀️';
          case 1: return '🌤️';
          case 2: return '⛅';
          case 3: return '☁️';
          case 45: return '🌫️';
          case 48: return '🌫️';
          case 61: return '🌦️';
          case 63: return '🌧️';
          case 65: return '☔';
          case 80: return '🌧️';
          case 81: return '🌧️';
          case 71: return '🌨️';
          case 73: return '❄️';
          case 75: return '🌨️';
          case 95: return '⛈️';
          case 99: return '⛈️';
          default: return 'Unknown';
      }
  };
  return (
    <div className='informations'>

          <div className='information-weather'>
            <div className='isz'>
            <h1>FIND YOUR LOCATION</h1>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter your location"
            />
                 <div className='sugest' id="suggestions" style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', display: suggestions.length > 0 ? 'block' : 'none' }}>
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.formatted}
                        className="suggestion"
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ padding: '10px', cursor: 'pointer' }}
                    >
                       {`${suggestion.formatted}; (${suggestion.components.city || suggestion.components.town})`}
                        
                    </div>
                ))}
            </div>
            <button onClick={handleGetWeather} className='getweather'>Get Weather</button>
            </div>
         
       
            <div className='wheathereror' id="weather">
                {weatherData ? (
                    weatherData.error ? (
                        <p >Error: {weatherData.error}</p>
                    ) : (
                        <div className='Wheater-Cards-Main'>
                            {weatherData.daily.time.slice(0, 5).map((date, index) => (
                                <div key={date} className='Wheater-Card'>
                                    <div className="Dark-Card">
                                        <strong>{date}</strong>
                                        <p>Max Temp: {weatherData.daily.temperature_2m_max[index]} °C</p>
                                        <p>Min Temp: {weatherData.daily.temperature_2m_min[index]} °C</p>
                                        <p>Condition: {getWeatherDescription(weatherData.daily.weathercode[index])}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : null}
            </div>
        </div>
  
    <div className='maindivs'>
      <div className='application-positions'> 
        <div className='background-transparent'>  
          <div className='artificial-intelligence'>
            <h2>GrowAI</h2>
            <p className='ai-text'>
              {thinking ? displayText : displayText}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='main'>
            <div className='main-background'>
              <div className='container-inputs'>
                <input 
                  type="text" 
                  placeholder='Enter plant variety' 
                  className='input-plant'
                  name="variety" 
                  value={inputValues.variety} 
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  placeholder='Enter plant name (e.g., grape, watermelon, corn)' 
                  className='input-plant' 
                  name="plantname" 
                  value={inputValues.plantname}
                  onChange={handleChange}
                />
              </div>
              <textarea 
                placeholder="How can I help you?" 
                className='textarea-problem'
                name="problem" 
                value={inputValues.problem}
                onChange={handleChange}
              ></textarea>
              
              <div className='submit-class-border'>
                <button type="submit" className='submit-class'>Find Problem</button>
              </div>
            </div>
          </div> 
        </form>
      </div>
    </div>
    </div>
  );
}