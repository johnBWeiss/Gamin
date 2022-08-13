import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router'



const LandingPage = () => {

    const navigate = useNavigate()
    return (
        <div className='LandingPageContainer'>
            <div className='LandingPageInnerContainer'>
                <div className='LandingPageTitle'>Welcome To Gamin'</div>
                <div className='LandingPageSubTitle'>Your source for the best free-to-play games</div>
                <div className='LandingPageButton' onClick={() => navigate('/home')} >
                    <div className='LandingPageButtonText'
                    >Start browsin' games!</div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage