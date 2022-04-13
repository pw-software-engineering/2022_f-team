import React from 'react'
import ArrowButton from '../Atoms/ArrowButton'
import '../style/DietComponentStyle.css'

interface PaginationProps {
    index: number,
    pageCount: number,
    onPreviousClick: () => void
    onNumberClick: (index: number) => void
    onNextClick: () => void
}

const Pagination = (props: PaginationProps) => {
    const indexes = Array.from(Array(props.pageCount).keys());

    return (
        <div className='pagination'>
            <ArrowButton onClick={() => props.onPreviousClick()} rotate={'rotate(90deg)'} />
            {indexes.map((i: number) => (
                <button key={i} className={`textButton ${i == props.index ? 'selected' : ''}`} onClick={() => props.onNumberClick(i)}>{i + 1}</button>
            ))}
            <ArrowButton onClick={() => props.onNextClick()} rotate={'rotate(270deg)'} />
        </div>
    )
}

export default Pagination