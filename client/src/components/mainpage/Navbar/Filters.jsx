import React from "react";
import './Searchbar.css'
import {zipRadius, itemsToDisplay} from '../../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'


function Filters(){
    const userZip = useSelector((state) => state.items.zipcode)
    const zipRadius = useSelector((state) => state.items.zipcodes_in_radius)
    const dispatch = useDispatch()
    let allItems = useSelector((state) => state.items.items)
    let items = useSelector((state) => state.items.itemsDisplayed)
    function distance(e){
        if(e.target.value === "none"){
            dispatch(itemsToDisplay(allItems))
        }else{
        let data = {
            distance: e.target.value, 
            user_zip: userZip[0]
        }
        fetch('/items_in_radius',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            dispatch(itemsToDisplay(data))
        })}
    }


    return (
        <div className='filters-container'>
            <select name="miles" className='dropdown' onChange={distance}>
                <option value="none"> Filter by distance</option>
                <option value="10">Within 10 miles</option>
                <option value="20">Within 20 miles</option>
                <option value="30">Within 30 miles</option>
            </select>
            <select name="categories" className='dropdown' >
                <option value=""> Filter by category</option>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
            </select>        
            {console.log('display',items)}   
        </div>
    )
}

export default Filters;