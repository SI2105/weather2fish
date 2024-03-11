import './assets/Header.css';
function Header({city, handleSubmit, handleInputChange}) {
    return (
      <div class="header">
            <a href="#weather">Weather to Fish</a>
            <form class="search-container" onSubmit={handleSubmit}>
                <input onChange={handleInputChange} value={city} type="search" placeholder="Search a Location..." />
                <button type="submit" class="search-icon">&#128269;</button>
            </form>
            <button type="button">SEND SOS</button>
        </div>
    );
  }
  
  export default Header;  