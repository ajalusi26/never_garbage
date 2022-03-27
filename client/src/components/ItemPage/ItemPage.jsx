import React from "react";
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import NavContent from '../Navbar/NavContent'
import ItemCard from '../mainpage/Content/ItemCard'

import './ItemPage.css';

function ItemPage(){
    const [userInfo, setUserInfo] = useState([])
    const [itemInfo, setItemInfo] = useState([])
    const [relatedItems, setRelatedItems] = useState([])
    const [isSaved, setIsSaved] = useState("")

  

        useEffect(()=>{
        fetch(`items/${localStorage.getItem('item')}`)
        .then(r => r.json())
        .then(data => {
            console.log("indiv-item",data)
            setItemInfo(data)
            setUserInfo(data.user)
        })
    }, [])

    useEffect(()=>{
        let data = {
            item_id: localStorage.getItem('item'),
        }
        fetch('/related_items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
        }, 
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
           setRelatedItems(data.items)
           setIsSaved(data.saved)
           console.log(data)
        })
    }, [])

    function saveItem() {
        
        let data = {
            item_id: itemInfo.id
        }
        fetch('/saved_items',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            setIsSaved(!isSaved)
    }
    

    return(
       <>
       <NavContent/>
       <div className="top-container">
           <div className="image-and-description-container">
                <div className='image-container'>
                        <img className='item-page-image' src={itemInfo.image}></img>  
                </div>
                <div className='description-container'>
                    <h1 className='description-h1'>Description:</h1>
                    <p className='description'>{itemInfo.description}</p>
                </div>
            </div>
            <div className='name-and-owner'>
                {/* <hr className='hr' ></hr> */}
                <h1 className='item-name-big'>{itemInfo.name}</h1>
                
                <h2 className='item-price-big'>${itemInfo.price}</h2>
                <hr className='hr' ></hr>
                <p className='info condition'> Condition: {itemInfo.condition}</p>
                <p className='info categoryInfo'> Posted in the category of {itemInfo.category_name}</p>
                <p className='info'>Location: {itemInfo.city}, {itemInfo.zipcode}</p>
                <br></br>
                <br></br>
                <button className='itemPage-bttn bttn-top-margin' onClick={saveItem}>{isSaved ? "Remove from saved" : "Save item"}</button>
                <button className='itemPage-bttn'>Message Seller</button>
                
                <hr className='hr' ></hr>

                <div className='seller-info'> 
                    <div className='inner-seller-info'>
                        <img className='seller-pfp' src={userInfo.profile_pic}></img>
                    </div>
                    <div className='seller-name-container'>
                        <h1 className='seller-name'>{userInfo.name}</h1>
                        <h1 className='seller-location'>{userInfo.city}, {userInfo.state}</h1>
                    </div>
                </div>
            </div>
           
        </div>
        <div className='related-items'>
            <h1 className='related'>Similar items</h1>
            <div className='related-items-holder'>
            {relatedItems.map(item => <ItemCard key={item.id} item={item}/> )}
            {/* {console.log("related", relatedItems)} */}
            </div>
        </div>
       </>
    )
}

export default ItemPage;