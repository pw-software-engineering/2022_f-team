import React from 'react'

interface FilterCheckboxProps {
    checked: boolean,
    onClick: () => void,
    label: string,
}

const FilterCheckbox = (props: FilterCheckboxProps) => {
    return (
        <div
            style={{
                height: '46px',
                padding: '0px 15px ',
                textAlign: 'center',
                cursor: 'pointer',
                color: 'black',
                fontWeight: '500',
                display: 'table',
                opacity: props.checked ? '1' : '.6',
                border: 'solid 3px #539091',
                backgroundColor: 'white',
                borderRadius: '15px',
                marginRight: '10px',
            }}
            onClick={() => props.onClick()}
        >
            <input style={{
                height: '46px',
                width: '20px',
                marginRight: '7px'
            }} type={'checkbox'} checked={props.checked} onChange={() => { }} />
            <span style={{
                display: 'table-cell',
                verticalAlign: 'middle',
            }}>
                {props.label}
            </span>
        </div>
    )
}

export default FilterCheckbox;


