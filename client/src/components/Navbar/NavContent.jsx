import React from "react"
import './Searchbar.css'
import {useNavigate} from 'react-router-dom'


// import {fetchItems, itemAdded} from '../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'

function NavContent(){
    const dispatch = useDispatch() 

    let user = useSelector((state) => state.items.current_user)
    let navigate = useNavigate()
    function logout(){
        fetch('/logout')
        .then(r => navigate('/'))
    }

    function homePage(){
       navigate('/main-page')
    }

    function deleteAccount(){
        fetch(`/users/${user.id}` , {
     method: 'DELETE',}
     ).then(r => navigate('/'))
    
console.log(user.id)
    }
    function profile(){
        navigate('/profile')
    }
    return(
        <nav className="nav">
            <div className="company-name" onClick={homePage} >
                <h4 >Never Trash</h4>
            </div>
            <ul className="nav-links">
                <li onClick={profile}>Profile</li>
                {/* <li>Selling</li> */}
                <li >Saved Items</li>
                <li>Messages</li>
                <li onClick={logout}>Logout</li>
                {/* <li onClick={deleteAccount}>Delete account</li> */}
            </ul>
        </nav>
    )
}

export default NavContent