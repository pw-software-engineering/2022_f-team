import React, { useState } from 'react'

interface ExpandMoreButtonProps {
  onClick: () => void
}

const ExpandMoreButton = (props: ExpandMoreButtonProps) => {
  const [rotateChevron, setRotateChevron] = useState(false)

  const handleRotate = () => setRotateChevron(!rotateChevron)

  const rotate = rotateChevron ? 'rotate(180deg)' : 'rotate(0)'

  const onClickAction = () => {
    handleRotate()
    props.onClick()
  }

  return (
    <button
      className='expandMoreButton'
      style={{ transform: rotate, transition: 'all 0.2s linear' }}
      onClick={onClickAction}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='48px'
        viewBox='0 0 24 24'
        width='48px'
        fill='#000000'
      >
        <path d='M24 24H0V0h24v24z' fill='none' opacity='.87' />
        <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z' />
      </svg>
    </button>
  )
}

export default ExpandMoreButton
