import React from 'react'
import './SideNav.css'
import logos from '../../assets/logos/logoController'

export const SideNav = () => {
    const { shooter, racing, strategy, sports, zombie, martialArts } = logos
    const logoArray = [shooter, strategy, racing, sports, zombie, martialArts]

    return (
        <div className='SideNavContainer'>
            <div className='SideNavInnerContainer'>
                {logoArray.map((v, i) => (

                    <img
                        src={v.src}
                        alt='logo'
                        className='SideNavLogo'
                    />
                ))}








            </div>
        </div>

    )
}

export default SideNav