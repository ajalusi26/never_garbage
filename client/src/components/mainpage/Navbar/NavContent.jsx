import React from "react"
import './Searchbar.css'
import {useNavigate} from 'react-router-dom'
function NavContent(){

    let navigate = useNavigate()
    function logout(){
        fetch('/logout')
        .then(r => navigate('/'))
    }
    return(
        <nav className="nav">
            <div className="company-name">
                <h4>Never Trash</h4>
            </div>
            <ul className="nav-links">
                <li>Profile</li>
                <li>Saved Items</li>
                <li>Messages</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </nav>
    )
}

export default NavContent