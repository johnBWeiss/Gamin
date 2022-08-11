import './App.css';
import Home from './pages/Home/Home';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import SideNav from './components/SideNav/SideNav'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <div className="app">
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path="/" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
