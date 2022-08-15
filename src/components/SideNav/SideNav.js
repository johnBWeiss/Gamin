import React from 'react'
import './SideNav.css'
import logos from '../../assets/logos/logoController'
import { gameByCategory, getAllGamesOptions } from '../../utils/axiosPaths';
import { changeOptions } from '../../store/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'



export const SideNav = ({ resetReffHandler }) => {
    const stateOptions = useSelector(state => state.gameSlice.gameOptions)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shooter, racing, strategy, sports, zombie, martialArts, home, controller } = logos
    const logoArray = [home, controller, shooter, strategy, racing, sports, zombie, martialArts]

    /*
     the dispatchCategoryHandler function is triggered by an icon being clicked in the SideNav component.

     it then updates the thunk in the redux store/slice that pulls information from the api,
     telling it which category of games to return, according to what was clicked.

     there is one exceptions to this rule:
     - if the home icon is clicked, the user is redirected to the homepage
    */
    const dispatchCategoryHandler = (v) => {

        /* 
        The resetReffHandler function emits the event to its father component, ultimately 
        resetting the current index of games so that it will always start from 0 with every new search.
      */
        resetReffHandler()

        if (v.title === 'home') {
            navigate('/', { replace: true })
            return
        }
        if (v.title === 'All') {
            dispatch(changeOptions(getAllGamesOptions))
        }
        else {
            // this condition is to prevent calling the api again for the same category
            if (stateOptions.params?.category !== v.title) {
                dispatch(changeOptions({ ...gameByCategory, params: { category: v.title } }))
            }
        }
    }
    return (

        <div className='SideNavContainer'>
            <div className='SideNavInnerContainer'>
                {logoArray.map((v, i) => (
                    <img
                        onClick={() => { dispatchCategoryHandler(v) }}
                        key={v.title}
                        src={v.src}
                        alt={v.title}
                        title={v.title}
                        className='SideNavLogo'
                        style={v.title === 'home' ? { borderBottom: '2px solid white', paddingBottom: '10px' } : { borderBottom: 'none' }}
                    />
                ))}
            </div>
        </div>
    )
}

export default SideNav