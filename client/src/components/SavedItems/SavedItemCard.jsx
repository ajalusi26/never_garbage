import React from "react";
import {useNavigate} from 'react-router-dom'

import '../mainpage/Content/ItemCard.css'


function ItemCard({item, update, setUpdate}){
    const navigate = useNavigate()

    function itemPage(e){
        if(e.target.value !== 'remove-bttn'){
            localStorage.setItem("item", item.id)
            navigate('/item-page')
            setUpdate(!update)
        }
    }

    function remove(){
        fetch(`/saved_items/${item.id}`, {
            method: 'DELETE'
        })
        .then(r => window.location.reload())
    }

    return(
        <div className=" card saved-item" onClick={itemPage}>
            
           <img src={item.image} className="image"></img>
           <h1 className="item-name">{item.short_name}</h1>
           <div className="card-text">
            <p>${item.price}</p>
            <p>{item.city}, {item.zipcode}</p>
            
           </div>
           <button className="remove-bttn" onClick={remove} value={'remove-bttn'}>Remove</button>
         
        </div>
    )
}

export default ItemCard