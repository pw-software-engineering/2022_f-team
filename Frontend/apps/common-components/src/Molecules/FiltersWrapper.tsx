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
            <div className='diet-div'>
                {(props.search)}
                <div style={{ height: '10px' }}></div>
                <ExpandMoreButton onClick={props.onClick} />
                {props.filters}
            </div>
        </div>
    );
}

export default FiltersWrapper;