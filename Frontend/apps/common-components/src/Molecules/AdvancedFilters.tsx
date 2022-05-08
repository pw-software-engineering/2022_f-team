import React from 'react'
import '../styles/DietComponentStyle.css'
import { filterInputStyles } from './FilterInputStyles'

interface FiltersComponentProps {
    children: React.ReactNode
}

export const FiltersComponent = (props: FiltersComponentProps) => {
    return (
        <div>
            <div style={{ height: '10px' }}></div>
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

    const toNumberLimit = (value: string) => {
        return value.length > 0 ? Number(value) : undefined;
    }

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
                    value={props.from ?? ''}
                    style={filterInputStyles}
                    type={'number'}
                    placeholder="From"
                    onKeyPress={(e) => allowOnlyNumbers(e)}
                    onChange={(e) => props.onChange({ from: toNumberLimit(e.target.value), to: props.to })}
                />
                <div style={{ width: '20px' }}></div>
                <input
                    value={props.to ?? ''}
                    style={filterInputStyles}
                    type={'number'}
                    placeholder="To"
                    onKeyPress={(e) => allowOnlyNumbers(e)}
                    onChange={(e) => props.onChange({ from: props.from, to: toNumberLimit(e.target.value) })}
                />
            </div>
        </div>
    )
}