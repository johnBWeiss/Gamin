import React from 'react'
import './Pagination.css'


const Pagination = (data) => {



    const childPagination = (operator) => {


        //true is pagination forward, false pagination back
        // let current = operator ? index : index - 8;
        // current = current < 0 ? 0 : current;

        //this condition ensures there will be no api call if over or under the limit for the index
        // if (current === index || current >= gameArrayLength) {
        //     return
        // }

        // index = current;

        // dispatch(getAllGames([gameOptions, { indexStart: current }]));

        //send to the father the updated ref
        fatherPagination(operator)
    }

    const { left, right, index, gameArrayLength, fatherPagination } = data
    return (
        <div className='paginationContainer'>
            <img className='paginateButton' src={left.src} alt={left.title} onClick={() => { childPagination(false) }} />
            <div className='indexCurrent'>{index + 1}-{(gameArrayLength < index + 8) ? gameArrayLength : index + 8} / {gameArrayLength}</div>
            <img className='paginateButton' src={right.src} alt={right.title} onClick={() => { childPagination(true) }} />
        </div>)
}
export default Pagination