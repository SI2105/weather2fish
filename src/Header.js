import { Link } from 'react-router-dom';
import './assets/Header.css';
function Header({city, handleSubmit, handleInputChange}) {
    return (
      <div class="header">
        <div className='links'>
            <p>Insert Logo Here</p>
            <Link style={{ textDecoration: 'none' }} className='link2' to="/">Weather to Fish</Link>
            <Link style={{ textDecoration: 'none' }} className='link2' to="catch-tracker" >Catch Tracker</Link>
            <Link style={{ textDecoration: 'none' }} className='link2' to="catch-tracker" >Port Finder</Link>
        </div>
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