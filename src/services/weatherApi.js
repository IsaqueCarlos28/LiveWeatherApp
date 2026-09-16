export const getCoordinates = async (cityName) => {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao consultar a Geocoding API')
  }

  const coordinateData = await response.json()

  if (!coordinateData.results || coordinateData.results.length === 0) {
    throw new Error('Cidade não encontrada')
  }

  const city = coordinateData.results[0]

  return {
    latitude: city.latitude,
    longitude: city.longitude,
    name: city.name,
    country: city.country
  }
}

export const getCurrentWeather = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao consultar a Forecast API')
  }

  const weatherData = await response.json()

  return weatherData.current
}