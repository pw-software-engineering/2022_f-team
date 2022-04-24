import React from 'react'
import { css } from '@emotion/react'
import RingLoader from 'react-spinners/RingLoader'

export const LoadingComponent = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #3b6d6e;
  `

  return (
    <RingLoader color={'#3b6d6e'} loading={true} css={override} size={50} />
  )
}
