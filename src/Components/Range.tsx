import React from 'react'
import './Range.css'

interface Props {
    title:string
    min:number;
    max:number;
    value:number;
    increment:number;
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const Range: React.FC<Props> = (props) => {
    return (
        <div className='wrapper'>
            <div className='topSect'>
                <div className='title'>{props.title}</div>
                <div className='value'>{props.value}
                </div>
            </div>
            <input type='range' min={props.min} max={props.max} value={props.value} onChange={(event)=>{props.handleChange(event)}} step={props.increment} ></input>
        </div>
    )
}

export default Range