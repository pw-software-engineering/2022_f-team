import React from 'react'
import SubmitButton from '../Atoms/SubmitButton';
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'
import { filterInputStyles } from './FilterInputStyles';

interface SearchComponentProps {
    onSubmitClick: () => void,
    onChange: (value: string) => void,
    value: string,
    label: string,
}

const SearchComponent = (props: SearchComponentProps) => {
    return (
        <div>
            <span style={{
                fontSize: '40px',
            }}>
                {props.label}
            </span>
            <div className='search-wrapper' style={{
                display: 'flex',
                height: '52px',
                paddingTop: '15px'
            }}>
                <input
                    style={{
                        ...filterInputStyles,
                        height: '52px',
                    }}
                    type={'search'}
                    value={props.value}
                    onChange={(e) => {
                        props.onChange(e.target.value);
                    }}
                />
                <div style={{ width: '20px' }} />
                <SubmitButton validateForm={() => true} text='Search' action={() => props.onSubmitClick()} />
            </div>
        </div>
    )
}

export default SearchComponent;