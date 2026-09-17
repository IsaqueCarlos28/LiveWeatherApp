const SearchBar = ({
  location,
  handleInputChanges,
  handleKeyDown,
  search,
  city
}) => {
  return (
    <div className="search">
      <div className="search-top">
        <i className="fa-solid fa-location-dot"></i>

        <div className="location">
          {city || 'London'}
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={handleInputChanges}
          onKeyDown={handleKeyDown}
        />

        <i
          className="fa-solid fa-magnifying-glass"
          onClick={() => search(location)}
        ></i>
      </div>
    </div>
  )
}

export default SearchBar