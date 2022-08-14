import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router'
import SideNav from '../../components/SideNav/SideNav'



const LandingPage = () => {

    const navigate = useNavigate()
    return (
        <div className='LandingPageContainer'>
            <div className='LandingPageInnerContainer'>
                <div className='LandingPageTitle'>Gamin</div>
                <div className='LandingPageSubTitle'>the best free-to-play games</div>
                <div className='LandingPageButton' onClick={() => navigate('/home')} >
                    <div className='LandingPageButtonText'
                    >Start browsin' games!</div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage