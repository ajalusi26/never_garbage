import React from "react"
import './Searchbar.css'
import {useNavigate} from 'react-router-dom'


import {fetchItems, itemAdded} from '../../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'

function NavContent(){
    const dispatch = useDispatch() 

    let navigate = useNavigate()
    function logout(){
        fetch('/logout')
        .then(r => navigate('/'))
    }

    function newState(){
        dispatch(itemAdded({payload:"more stuff"}))
    }
    return(
        <nav className="nav">
            <div className="company-name">
                <h4>Never Trash</h4>
            </div>
            <ul className="nav-links">
                <li>Profile</li>
                <li onClick={newState}>Saved Items</li>
                <li>Messages</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </nav>
    )
}

export default NavContent