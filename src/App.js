import './App.css';
import Home from './pages/Home/Home';
import background from './assets/images/backgroundSCIFI.jpg'
// import backgroundVid from './assets/images/backgroundVid.mp4'
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
      {/* <video src={backgroundVid} className='background'
        autoPlay loop playsInline muted type='video/mp4' poster={background}></video> */}
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
