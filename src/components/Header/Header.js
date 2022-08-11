import React from 'react';
import './Header.css';
import profilePic from '../../assets/images/profileS.png'
import threeLines from '../../assets/images/threeLines.png'
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();

  const navLogin = () => {
    navigate('/')
  }

  return (
    <div className='headerContainer'>
      <div className='headerInnerWidth'>
        <div className='workshopHeader'>
          <img
            src={profilePic}
            alt="logo"
            className='headerLogo'
          />
          <div>Yonatan's Assignment</div>
        </div>
        <img
          src={threeLines}
          alt="threeLines"
          className='threeLines'
        />
      </div>
    </div>
  );
};

export default Header;
