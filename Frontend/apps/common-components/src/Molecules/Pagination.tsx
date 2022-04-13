import React from 'react'
import ArrowButton from '../Atoms/ArrowButton'
import '../style/DietComponentStyle.css'

// Wyściguwa
// ___..............._
// __.. ' _'.""""""\\""""""""- .`-._
// ______.-'         (_) |      \\           ` \\`-. _
// /_       --------------'-------\\---....______\\__`.`  -..___
// | T      _.----._           Xxx|x...           |          _.._`--. _
// | |    .' ..--.. `.         XXX|XXXXXXXXXxx==  |       .'.---..`.     -._
// \_j   /  /  __  \  \        XXX|XXXXXXXXXXX==  |      / /  __  \ \        `-.
// _|  |  |  /  \  |  |       XXX|""'            |     / |  /  \  | |          |
// |__\_j  |  \__/  |  L__________|_______________|_____j |  \__/  | L__________J
// `'\ \      / ./__________________________________\ \      / /___________\
// `.`----'.'   dp                                `.`----'.'
// `""""'                                         `""""'

interface PaginationProps {
    index: number,
    pageCount: number,
    onPreviousClick: () => void
    onNumberClick: (index: number) => void
    onNextClick: () => void
}

const Pagination = (props: PaginationProps) => {
    const indexes = Array.from(Array(props.pageCount).keys());


    return (
        <div className='pagination'>
            <ArrowButton onClick={props.onPreviousClick} rotate={'rotate(90deg)'} />
            {indexes.map((i: number) => (
                <button className='textButton' onClick={() => props.onNumberClick(i)}>{i}</button>
            ))}
            <ArrowButton onClick={props.onPreviousClick} rotate={'rotate(270deg)'} />
        </div>
    )
}

export default Pagination