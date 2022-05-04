import React from 'react'
import '../styles/DietComponentStyle.css'

interface FiltersComponentProps {
    children: React.ReactNode
}

export const FiltersComponent = (props: FiltersComponentProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export interface RangeFilterOnChangeProps {
    from?: number,
    to?: number
}

interface RangeFilterProps {
    label: string,
    from?: number
    to?: number
    onChange: (props: RangeFilterOnChangeProps) => void,
}

export const RangeFilter = (props: RangeFilterProps) => {
    const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <div style={{
            paddingBottom: '20px',
        }}>
            <span style={{
                fontSize: '30px',
            }}>
                {props.label}
            </span>
            <div style={{
                display: 'flex',
                height: '52px',
                paddingTop: '10px',
            }}><input
                    style={{
                        flexGrow: 1,
                        paddingLeft: '5px'
                    }}
                    type={'number'}
                    placeholder="From"
                    onKeyPress={(e) => allowOnlyNumbers(e)}
                    onChange={(e) => props.onChange({ from: Number(e.target.value), to: props.to })}
                />
                <div style={{ width: '20px' }}></div>
                <input
                    style={{
                        flexGrow: 1,
                        paddingLeft: '5px'
                    }}
                    type={'number'}
                    placeholder="To"
                    onKeyPress={(e) => allowOnlyNumbers(e)}
                    onChange={(e) => props.onChange({ from: props.from, to: Number(e.target.value) })}
                />
            </div>
        </div>
    )
}