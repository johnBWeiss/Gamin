import React from 'react'
import './SideNav.css'
import logos from '../../assets/logos/logoController'
import { gameByCategory } from '../../utils/axiosPaths';
import { changeOptions } from '../../store/gameSlice';
import { useDispatch, useSelector } from 'react-redux';


export const SideNav = () => {
    const { shooter, racing, strategy, sports, zombie, martialArts, home } = logos
    const logoArray = [home, shooter, strategy, racing, sports, zombie, martialArts]

    const dispatch = useDispatch()

    const dispatchCategoryHandler = (v) => {
        dispatch(changeOptions({ ...gameByCategory, params: { category: v.title } }))
    }
    return (


        <div className='SideNavContainer'>
            <div className='SideNavInnerContainer'>
                {logoArray.map((v, i) => (

                    <img
                        onClick={() => { dispatchCategoryHandler(v) }}
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