import loadingGif from '../assets/images/loading.gif'

import { useState } from 'react'
import { getWeatherInfo } from '../utils/weatherCode'
import { formatDate } from '../utils/formatDate'
import {getCoordinates,getCurrentWeather} from '../services/weatherApi'
import {weatherImages,backgroundImages} from '../constants/weatherTheme'
import SearchBar from './SearchBar'

import './WheatherApp.css'

const WheatherApp = () => {
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChanges = (e) => {
      setLocation(e.target.value)
  }

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        search(location)
      }
  }

  const search = async (city) => {
    const normalizedCity = city.trim()

    if (!normalizedCity) {
      setError('Enter a city name')
      return
    }

    try {
      setLoading(true)
      setError('')

      const coordinates = await getCoordinates(normalizedCity)

      if (!coordinates) {
        setError('City not found')
        setData(null)
        return
      }

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
      setError('Unable to load weather data')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const weatherInfo = data
  ? getWeatherInfo(data.weatherCode)
  : null

  const weatherImage = weatherInfo
  ? weatherImages[weatherInfo.type]
  : sunny

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">
              {data ? data.city : 'Search a city'}
            </div>
          </div>

          <SearchBar
            location={location}
            handleInputChanges={handleInputChanges}
            handleKeyDown={handleKeyDown}
            search={search}
            city={data?.city}
          />
        </div>

        {loading ? (
          <div className="loading">
            <img src={loadingGif} alt="Loading weather" className="loading-gif" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="not-found">{error}</div>
        ) : data ? (
          <>
            <div className="weather">
              <img
                src={weatherImage}
                alt={weatherInfo?.description || 'Weather'}
              />
              <div className="weather-type">
                {weatherInfo ? weatherInfo.description : '--'}
              </div>
              <div className="temp">
                {data ? `${Math.round(data.temperature)}°` : '--'}
              </div>
            </div>

            <div className="weather-date">
              <p>{data ? formatDate(data.time) : '--'}</p>
            </div>

            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {data ? `${data.humidity}%` : '--'}
                </div>
              </div>

              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {data ? `${data.windSpeed} km/h` : '--'}
                </div>
              </div>
            </div>
          </>
        ): null }
      </div>
    </div>
  )
}

export default WheatherApp