import React from 'react'
import { useState } from 'react';
import SubmitButton from '../Atoms/SubmitButton';
// import ArrowButton from '../Atoms/ArrowButton'
import '../styles/DietComponentStyle.css'

interface SearchComponentProps {
    onSubmitClick: () => void,
    onFiltersChange: () => void,
}

const SearchComponent = (props: SearchComponentProps) => {
    // const indexes = Array.from(Array(props.pageCount).keys());
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchExact, setSearchExact] = useState<boolean>(false);



    console.log(props);

    return (
        <div>
            <div className='diet-div'>
                <div className='search-wrapper' style={{
                    display: 'flex',
                    height: '52px'
                }}>
                    <input
                        style={{
                            flexGrow: 1,
                            height: '52px',
                        }}
                        type={'checkbox'}
                    // onChange={(e) => setSearchExact(e.target.value)}
                    />
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
                    <SubmitButton validateForm={() => searchValue.length > 0} text='Search' action={() => { console.log(searchValue) }} />
                    {/* <ArrowButton onClick={props.index <= 0 ? undefined : props.onPreviousClick} rotate={'rotate(90deg)'} />
                {indexes.map((i: number) => (
                    <button type={'submit'} key={`page-${i}`} className={`textButton ${i == props.index ? 'selected' : ''}`} onClick={() => props.onNumberClick(i)}>{i}</button>
                ))}
                <ArrowButton onClick={props.index >= props.pageCount - 1 ? undefined : props.onNextClick} rotate={'rotate(270deg)'} /> */}
                </div>
            </div>
            <div className='filters-div'>
                <div className='filters-list'>

                </div>
            </div>
        </div>
    )
}

export default SearchComponent;