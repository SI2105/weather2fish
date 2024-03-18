import { Link } from 'react-router-dom';
import './assets/Header.css';
function Header({city, handleSubmit, handleInputChange}) {
    return (
        <div>
            <div className='header'>
                <div className='links'>
                    <p>Insert Logo Here</p>
                    <Link style={{ textDecoration: 'none' }} className='link2' to="/">Weather Details</Link>
                    <Link style={{ textDecoration: 'none' }} className='link2' to="catch-tracker" >Catch Tracker</Link>
                    <Link style={{ textDecoration: 'none' }} className='link2' to="poiMap" >Port Finder</Link>
                </div>
                    <form class="search-container" onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} value={city} type="search" placeholder="Search a Location..." />
                        <button type="submit" class="search-icon">&#128269;</button>
                    </form>
            </div>
                <Link style={{ display: 'none' }}to="catch-tracker" >Catch Tracker</Link>
                <Link style={{ display: 'none' }}to="poiMap">Points Of Interest</Link>
        </div>
    );
  }
  
  export default Header;  