import React from 'react'
import ArrowButton from '../Atoms/ArrowButton'
import '../style/DietComponentStyle.css'

interface PaginationProps {
    index: number,
    pageCount: number,
    onPreviousClick: () => void,
    onNumberClick: (index: number) => void,
    onNextClick: () => void
}

const Pagination = (props: PaginationProps) => {
    const indexes = Array.from(Array(props.pageCount).keys());

    return (
        <div className='pagination'>
            <ArrowButton onClick={props.onPreviousClick} rotate={'rotate(90deg)'} />
            {indexes.map((i: number) => (
                <button className='textButton' onClick={() => props.onNumberClick(i)}>{i}</button>
            ))}
            <ArrowButton onClick={props.onPreviousClick} rotate={'rotate(270deg)'} />
        </div>
    )
}

export default Pagination;