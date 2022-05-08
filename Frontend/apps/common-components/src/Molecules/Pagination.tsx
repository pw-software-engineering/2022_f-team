import React from 'react'
import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface PaginationProps {
  index: number
  pageCount: number
  onPreviousClick: () => void
  onNumberClick: (index: number) => void
  onNextClick: () => void
}

const Pagination = (props: PaginationProps) => {
  const indexes = Array.from(Array(props.pageCount).keys())

  return (
    <div className='pagination'>
      <ArrowButton
        onClick={props.index <= 0 ? undefined : props.onPreviousClick}
        rotate={'rotate(90deg)'}
      />
      {indexes.map((i: number) => (
        <button
          type={'submit'}
          key={`page-${i}`}
          className={`textButton ${i == props.index ? 'selected' : ''}`}
          onClick={() => props.onNumberClick(i)}
        >
          {i}
        </button>
      ))}
      <ArrowButton
        onClick={
          props.index >= props.pageCount - 1 ? undefined : props.onNextClick
        }
        rotate={'rotate(270deg)'}
      />
    </div>
  )
}

export default Pagination
