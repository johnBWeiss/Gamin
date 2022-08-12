import React from 'react'
import './SideNav.css'
import logos from '../../assets/logos/logoController'

export const SideNav = () => {
    const { shooter, racing, strategy, sports, zombie, martialArts, home } = logos
    const logoArray = [home, shooter, strategy, racing, sports, zombie, martialArts]

    return (
        <div className='SideNavContainer'>
            <div className='SideNavInnerContainer'>
                {logoArray.map((v, i) => (

                    <img
                        key={v.title}
                        src={v.src}
                        alt='logo'
                        title={v.title}
                        className='SideNavLogo'
                    />
                ))}








            </div>
        </div>

    )
}

export default SideNav