import React from "react";
import {useNavigate} from 'react-router-dom'

import '../mainpage/Content/ItemCard.css'


function ItemCard({item}){
    const navigate = useNavigate()

    function itemPage(){
    localStorage.setItem("item", item.id)
    // {console.log('hi')}
    navigate('/item-page')
    window.location.reload()
    }



    return(
        <div className="card" onClick={itemPage}>
            
           <img src={item.image} className="image"></img>
           <h1 className="item-name">{item.short_name}</h1>
           <div className="card-text">
            <p>${item.price}</p>
            <p>{item.city}, {item.zipcode}</p>
           </div>
        </div>
    )
}

export default ItemCard