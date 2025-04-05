import React from 'react'
import "./comp.css"
import { useSelector } from 'react-redux';
export const LeftsideBar = ({ setnewNote, newNote,handleLogout }) => {
    const user = useSelector((state) => state.user.user);

    return (
        <div className='leftSideBar'>
            <h2>Clever Notes</h2>
            
            <div className='leftSideButtons'>
                <p class="plus-container" onClick={() => setnewNote(!newNote)}>
                    <span class="plus">+</span>
                </p>
            </div>

            <div className='logout_div'>
                    <div className='imageUser'>{user?.displayName[0]}</div>                
                    <p className="logout" onClick={handleLogout}>Logout</p>
               </div>

        </div>
    )
}
