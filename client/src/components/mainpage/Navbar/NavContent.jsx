import React from "react"
import './Searchbar.css'
function NavContent(){
    return(
        <nav className="nav">
            <div className="company-name">
                <h4>Never Trash</h4>
            </div>
            <ul className="nav-links">
                <li>Profile</li>
                <li>Saved Items</li>
                <li>Messages</li>
                <li>Logout</li>
            </ul>
        </nav>
    )
}

export default NavContent