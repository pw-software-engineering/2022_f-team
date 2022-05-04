import React from 'react'

const LogoutIcon = () => {
  return (
    <div className='LogoutIcon'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        enableBackground='new 0 0 24 24'
        height='48px'
        viewBox='0 0 24 24'
        width='48px'
        fill='#3b6d6e'
      >
        <g>
          <path d='M0,0h24v24H0V0z' fill='none' />
        </g>
        <g>
          <path d='M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z' />
        </g>
      </svg>
      <p className='LogoutText'>Log out</p>
    </div>
  )
}

export default LogoutIcon
