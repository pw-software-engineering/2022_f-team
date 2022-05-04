<select name="pets" id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>


import React from 'react'
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface SelectProps {
    children: React.ReactNode,
    onChange: (value: string) => void
}

const Select = (props: SelectProps) => {
    return (
        <select style={{
            height: '53px',
            width: '100%',
            fontSize: '20px',
            border: '2px solid #333',
            borderRadius: '10px',
        }} onChange={(e) => props.onChange(e.target.value)}>
            {props.children}
        </select>
    )
}

export default Select;