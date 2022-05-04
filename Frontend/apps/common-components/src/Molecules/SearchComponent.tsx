import React from 'react'
import { useState } from 'react';
import SubmitButton from '../Atoms/SubmitButton';
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface SearchComponentProps {
    onSubmitClick: () => void,
    onFiltersChange: () => void,
    label: string,
}

const SearchComponent = (props: SearchComponentProps) => {
    // const indexes = Array.from(Array(props.pageCount).keys());
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
                <div
                    style={{
                        height: '46px',
                        // width: '70px',
                        padding: '0px 15px ',
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '500',
                        display: 'table',
                        opacity: searchExact ? '1' : '.6',
                        border: 'solid 3px #539091',
                        backgroundColor: 'white',
                        borderRadius: '15px',

                    }}
                    onClick={() => setSearchExact(!searchExact)}
                >
                    <input style={{
                        height: '46px',
                        width: '20px',
                        marginRight: '7px'
                    }} type={'checkbox'} checked={searchExact} />
                    <span style={{
                        display: 'table-cell',
                        verticalAlign: 'middle',
                    }}>
                        Search exact
                    </span>
                </div>
                <div style={{ width: '10px' }} />
                <input
                    style={{
                        flexGrow: 1,
                        height: '52px',
                    }}
                    type={'search'}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div style={{ width: '20px' }} />
                <SubmitButton validateForm={() => true} text='Search' action={() => { console.log(searchValue) }} />
            </div>
        </div>
    )
}

export default SearchComponent;