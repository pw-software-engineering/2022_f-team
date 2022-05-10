import React, { useState } from 'react'
import ArrowButton from './ArrowButton'

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
    <div style={{ width: '100%', textAlign: 'center' }}>
      <ArrowButton onClick={onClickAction} rotate={rotate}></ArrowButton>
    </div>
  )
}

export default ExpandMoreButton
