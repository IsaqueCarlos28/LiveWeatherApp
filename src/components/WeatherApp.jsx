import { useState } from 'react'
import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'
import WeatherDetails from './WeatherDetails'
import NotFound from './NotFound'
import { getCoordinates, getCurrentWeather } from '../services/weatherApi'
import { getWeatherInfo } from '../utils/weatherCode'
import { weatherImages, backgroundImages } from '../constants/weatherTheme'
import './WeatherApp.css'

const WeatherApp = () => {
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChanges = (event) => {
    setLocation(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search(location)
    }
  }

  const search = async (cityName) => {
    const normalizedCity = cityName.trim()

    if (!normalizedCity) {
      setError('Enter a city name')
      return
    }

    try {
      setLoading(true)
      setError('')

      const coordinates = await getCoordinates(normalizedCity)
      const currentWeather = await getCurrentWeather(
        coordinates.latitude,
        coordinates.longitude
      )

      setData({
        city: coordinates.name,
        country: coordinates.country,
        temperature: currentWeather.temperature_2m,
        humidity: currentWeather.relative_humidity_2m,
        windSpeed: currentWeather.wind_speed_10m,
        weatherCode: currentWeather.weather_code,
        time: currentWeather.time
      })

      setLocation('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unable to load weather data')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const weatherInfo = data
    ? getWeatherInfo(data.weatherCode)
    : null

  const weatherType = weatherInfo?.type || 'sunny'
  const weatherImage = weatherImages[weatherType]
  const backgroundImage = backgroundImages[weatherType]

  return (
    <div
      className="container"
      style={{ backgroundImage }}
    >
      <div
        className="weather-app"
        style={{
          backgroundImage: backgroundImage.replace(
            'to right',
            'to top'
          )
        }}
      >
        <SearchBar
          location={location}
          handleInputChanges={handleInputChanges}
          handleKeyDown={handleKeyDown}
          search={search}
          city={data?.city}
        />

        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <NotFound message={error} />
        ) : data ? (
          <>
            <WeatherCard
              data={data}
              weatherInfo={weatherInfo}
              weatherImage={weatherImage}
            />
            <WeatherDetails data={data} />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default WeatherApp