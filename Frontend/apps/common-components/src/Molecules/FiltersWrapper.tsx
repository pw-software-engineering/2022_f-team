import React from 'react'
import ExpandMoreButton from '../Atoms/ExpandMoreButton';
import '../styles/DietComponentStyle.css'

interface FiltersWrapperProps {
    search: React.ReactNode,
    filters: React.ReactNode,
    onClick: () => any,
}

const FiltersWrapper = (props: FiltersWrapperProps) => {

    return (
        <div>
            <div className='filter-div'>
                {(props.search)}
                <ExpandMoreButton onClick={props.onClick} />
                {props.filters}
            </div>
        </div>
    );
}

export default FiltersWrapper;