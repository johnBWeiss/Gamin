import React from 'react'
import gear from '../../assets/images/Gear.png';
import './Spinner.css'


const CustomSpinner = () => {
    return (
        <img src={gear} alt={'spinner'} className='spinner' />
    )
}

export default CustomSpinner