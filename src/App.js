import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Overview from './Overview';
import Hourly from './Hourly';
import Precipitation from './Precipitation';
import Wind from './Wind';
import Humidity from './Humidity';
function App() {
  return (
    <>
    <Header/>
    <Overview/>
    <Hourly/>
    <Precipitation/>
    <Wind/>
    <Humidity />
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div></>
    
  );
}

export default App;
