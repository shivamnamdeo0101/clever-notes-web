import React from 'react'
import "./comp.css"
import { useSelector } from 'react-redux';

export const Header = ({ handleLogout }) => {
    const user = useSelector((state) => state.user.user);
    return (

        <div className='header'>
            <div>
                <p>{user.displayName}</p>
                <p>{user.email}</p>
            </div>
            <div className='right_header'>
                <div className='imageUser'>{user?.displayName[0]}</div>
                <p onClick={handleLogout}>Logout</p>
            </div>

        </div>
    )
}
