import React from 'react'
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface SelectProps {
    children: React.ReactNode,
    value: string,
    onChange: (value: string) => void
}

const Select = (props: SelectProps) => {
    return (
        <select
            value={props.value}
            style={{
                height: '36px',
                width: '100%',
                fontSize: '18px',
                border: '2px solid #333',
                borderRadius: '10px',
                margin: 0,
            }} onChange={(e) => props.onChange(e.target.value)}>
            {props.children}
        </select>
    )
}

export default Select;