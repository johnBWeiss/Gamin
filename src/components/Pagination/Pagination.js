import React from 'react'
import './Pagination.css'


const Pagination = (data) => {

    //emits an event to the father component when clicked
    const childPagination = (operator) => {
        fatherPagination(operator)
    }
    const { left, right, index, gameArrayLength, fatherPagination } = data

    return (
        <div className='paginationContainer'>
            <img className='paginateButton' title='back' src={left.src} alt={left.title} onClick={() => { childPagination(false) }} />
            <div className='indexCurrent'>{index + 1}-{(gameArrayLength < index + 8) ? gameArrayLength : index + 8} / {gameArrayLength}</div>
            <img className='paginateButton' title='next' src={right.src} alt={right.title} onClick={() => { childPagination(true) }} />
        </div>)
}
export default Pagination