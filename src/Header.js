//Importing required files
import { Link } from 'react-router-dom';
import './assets/css/Header.css';
import logo from './assets/images/logo.jpeg';
function Header({city, handleSubmit, handleInputChange}) {
    return (
        <div>
            <div className='header'> {/* Main header container */}
                <div className='logo'> {/* Logo container */} 
                    <img src={logo} alt="logo" style={{width:'100%', height:'100%', objectFit:'contain'}} />
                </div>

                <div className='links'> {/* Navigation links container */}
                    <Link style={{ textDecoration: 'none'}} className='link2' to="/">Weather Details</Link>
                    <Link style={{ textDecoration: 'none' }} className='link2' to="catch-tracker" >Catch Tracker</Link>
                    <Link style={{ textDecoration: 'none' }} className='link2' to="poiMap" >Port Finder</Link>
                </div>

                <div className='search'> {/* Search bar container */}
                    <form class="search-container" onSubmit={handleSubmit}>
                        {/* Input field for searching a location */}
                        <input onChange={handleInputChange} value={city} type="search" placeholder="Search a Location..." />
                        {/* Submit button for searching */}
                        <button type="submit" class="search-icon">&#128269;</button>
                    </form>
                </div>

            </div>
                <Link style={{ display: 'none' }}to="catch-tracker" >Catch Tracker</Link>
                <Link style={{ display: 'none' }}to="poiMap">Points Of Interest</Link>
        </div>
    );
  }
  
  export default Header;  