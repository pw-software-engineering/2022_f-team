import React from 'react'

interface TextButtonProps {
    text: string
    action: (e: any) => void
}

const TextButton = (props: TextButtonProps) => {
    return (
        <button className='textButton'
            onClick={(e: any) => props.action(e)}
        >
            {props.text}
        </button>
    )
}

export default TextButton