import React from 'react'
import "./comp.css"
export const LeftsideBar = ({setnewNote,newNote}) => {
    return (
        <div className='leftSideBar'>
            <h2>Clever Notes</h2>

            <div className='leftSideButtons'>
                <p class="plus-container" onClick={()=>setnewNote(!newNote)}>
                    <span class="plus">+</span>
                </p>
        
            </div>
            
        </div>
    )
}
