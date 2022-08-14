import './App.css';
import Home from './pages/Home/Home';
import background from './assets/images/backgroundSCIFI.jpg'
import LandingPage from './pages/Landing Page/LandingPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <div className="app">
      <img
        className='background'
        src={background}
        alt='background'
      />

      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
