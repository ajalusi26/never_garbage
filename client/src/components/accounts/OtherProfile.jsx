
import React from "react";
import {useState, useEffect} from 'react'

import NavContent from '../Navbar/NavContent'
import ItemCard from '../mainpage/Content/ItemCard'
import './Profile.css'

function OtherProfile(){
    const [isFollowed, setIsFollowed] = useState(false)
    const [userData, setUserData] = useState([])
    const [userItems, setUsersItems] = useState([])
    const [followerAmount, setFollowerAmount] = useState(0)
    
    useEffect(() => {
        fetch(`/users/${localStorage.getItem('seller_selected')}`)
        .then(r => r.json())
        .then(data => {
            console.log('user',data)
            setUserData(data)
            setUsersItems(data.posted_items)
            setFollowerAmount(data.follower_amount)
            let current_user_id = parseInt(localStorage.getItem('current_user'))
           if(data.followers_ids.includes(current_user_id)){
                setIsFollowed(true)
           }else{
               setIsFollowed(false)
           }
        })
    }, [])

    function followUser (){

        let data = {
            followed_user_id: userData.id
        }

        fetch('/follows', {
            method: 'POST', 
            headers:{
                 'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(data)
        })
        .then(r => {
            if(r.status == "200"){
                setIsFollowed(true)
                setFollowerAmount(followerAmount + 1)
            }else if(r.status == "204"){ 
                setFollowerAmount(followerAmount - 1)
                setIsFollowed(false)
            }
        })
    }
    // 

    return (
        <div>
            <NavContent/>
            <h1 className="pf-page-header">Seller Profile</h1>
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
                    <p className='user-flw-amount'>Member since:  {userData.created}</p>
                    {/* <br></br> */}
                    <p className='user-flw-amount'> Followers: {followerAmount}</p>
                    <span className='amount-sold'>
                        <span>Items sold: {userData.amount_sold}   </span>  
                        <span className='amount-posted'>Items posted: {userData.amount_posted}</span>
                    </span>
                    <button className='follow-bttn' onClick={followUser}>{isFollowed ? "Unfollow" : "Follow"}</button>

                   
                </div>
            </div>
            <hr className='pf-items-hr'></hr>
            <h2 className='users-items-h2'> Items from this seller</h2>
            <div className={userItems.length > 0 ? 'seller-items-holder-true' : 'seller-items-holder-false'} >
                   {userItems.length > 0 ? userItems.map(item => <ItemCard item={item} key={item.id}/>) : "This seller has no Items posted" }
            </div>
        </div>
    )
}

export default OtherProfile