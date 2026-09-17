import { formatDate } from '../utils/formatDate'

const WeatherCard = ({ data, weatherInfo, weatherImage }) => {
  if (!data) {
    return null
  }

  return (
    <>
      <div className="weather">
        <img
          src={weatherImage}
          alt={weatherInfo?.description || 'Weather'}
        />

        <div className="weather-type">
          {weatherInfo?.description || '--'}
        </div>

        <div className="temp">
          {`${Math.round(data.temperature)}°`}
        </div>
      </div>

      <div className="weather-date">
        <p>{formatDate(data.time)}</p>
      </div>
    </>
  )
}

export default WeatherCard