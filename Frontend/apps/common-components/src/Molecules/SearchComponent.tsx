import React from 'react'
import { useState } from 'react';
import FilterCheckbox from '../Atoms/FilterCheckbox';
import SubmitButton from '../Atoms/SubmitButton';
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface SearchComponentProps {
    onSubmitClick: () => void,
    onChange: (value: string, exact: boolean) => void,
    label: string,
}

const SearchComponent = (props: SearchComponentProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchExact, setSearchExact] = useState<boolean>(false);

    console.log(props);

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
                <FilterCheckbox
                    checked={searchExact}
                    onClick={() => {
                        props.onChange(searchValue, !searchExact);
                        setSearchExact(!searchExact)
                    }}
                    label={'Search exact'}
                />
                <div style={{ width: '20px' }} />
                <input
                    style={{
                        flexGrow: 1,
                        height: '52px',
                    }}
                    type={'search'}
                    onChange={(e) => {
                        props.onChange(e.target.value, searchExact);
                        setSearchValue(e.target.value);
                    }}
                />
                <div style={{ width: '20px' }} />
                <SubmitButton validateForm={() => true} text='Search' action={() => props.onSubmitClick()} />
            </div>
        </div>
    )
}

export default SearchComponent;