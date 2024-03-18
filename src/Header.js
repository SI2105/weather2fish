import { Link } from 'react-router-dom';
import './assets/Header.css';
function Header({city, handleSubmit, handleInputChange}) {
    return (
      <div class="header">
            <Link to="/">Weather to Fish</Link>
            <form class="search-container" onSubmit={handleSubmit}>
                <input onChange={handleInputChange} value={city} type="search" placeholder="Search a Location..." />
                <button type="submit" class="search-icon">&#128269;</button>
            </form>
            <Link to="catch-tracker" >Catch Tracker</Link>
            <Link to="poiMap">Points Of Interest</Link>
        </div>
    );
  }
  
  export default Header;  