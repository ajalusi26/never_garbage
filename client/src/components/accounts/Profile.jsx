import React from "react";
import {useState, useEffect} from 'react'

import NavContent from '../Navbar/NavContent'
import ItemCard from '../mainpage/Content/ItemCard'
import './Profile.css'
function Profile(){
    // const [isFollowed, setIsFollowed] = useState(false)
    const [userData, setUserData] = useState([])
    const [userItems, setUsersItems] = useState([])
    
    useEffect(() => {
        fetch('/user_profile')
        .then(r => r.json())
        .then(data => {
            console.log('user',data)
            setUserData(data)
            setUsersItems(data.posted_items)
           
        })
    }, [])

    // function followUser (){
    //     setIsFollowed(!isFollowed)
    // }
    // 

    return (
        <div>
            <NavContent/>
            <h1 className="pf-page-header">My Profile</h1>
            <hr className="pf-hr"></hr>
            <div className="profile-header">
                <div className="pfp-container">
                    <img src={userData.profile_pic} className='profile-page-pfp'></img>
                </div>
                <div className="user-info-pf-page">
                    <p className="user-name">{userData.name}</p>
                    {/* <p>{userData.followers</p>  GET FOLLOWER AMOUNT */}
                    {/* <p>{userData.city}, {userData.state}</p> */}
                    <p className='user-location'>{userData.city}, FL</p>
                    <p className='user-flw-amount'>Member since {userData.created}</p>
                    {/* <br></br> */}
                    <p className='user-flw-amount'> Followers: {userData.follower_amount}</p>
                    <span className='amount-sold'>
                        <span>Items sold: {userData.amount_sold}   </span>  
                        <span className='amount-posted'>Items posted: {userData.amount_posted}</span>
                    </span>
                    {/* <button className='follow-bttn' onClick={followUser}>{isFollowed ? "Unfollow" : "Follow"}</button> */}

                   
                </div>
            </div>
            <hr className='pf-items-hr'></hr>
            <h2 className='users-items-h2'> My items</h2>
            <div className={userItems.length > 0 ? 'seller-items-holder-true' : 'seller-items-holder-false'} >
                   {userItems.length > 0 ? userItems.map(item => <ItemCard item={item} key={item.id}/>) : "This seller has no Items posted" }
            </div>
        </div>
    )
}

export default Profile