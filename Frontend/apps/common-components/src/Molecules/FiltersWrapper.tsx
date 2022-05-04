import React from 'react'
import { useState } from 'react';
import ExpandMoreButton from '../Atoms/ExpandMoreButton';
import '../styles/DietComponentStyle.css'

interface FiltersWrapperProps {
    search: React.ReactNode,
    filters: React.ReactNode,
}

const FiltersWrapper = (props: FiltersWrapperProps) => {
    const [showFilters, setShowFilters] = useState<boolean>(false);


    return (
        <div>
            <div className='diet-div'>
                {(props.search)}
                <div style={{ height: '10px' }}></div>
                <ExpandMoreButton onClick={() => setShowFilters(!showFilters)} />
                {showFilters && (props.filters)}
            </div>
        </div>
    );
}

export default FiltersWrapper;