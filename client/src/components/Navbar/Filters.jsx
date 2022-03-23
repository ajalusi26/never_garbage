import React from "react";
import {useState} from 'react'
import './Searchbar.css'
import {zipRadius, itemsToDisplay} from '../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'


function Filters(){

    const [category, setCategory] = useState('')

    const userZip = useSelector((state) => state.items.zipcode)
    const zipRadius = useSelector((state) => state.items.zipcodes_in_radius)
    const dispatch = useDispatch()
    let allItems = useSelector((state) => state.items.items)
    let items = useSelector((state) => state.items.itemsDisplayed)
    
    function categoryFilter(e){
        if(e.target.value === "none"){
            dispatch(itemsToDisplay(allItems[0]))
        }else{
            setCategory(e.target.value)
            let data = allItems[0].filter(i => i.category_name === e.target.value)
            dispatch(itemsToDisplay(data))
        }
    }
    function distance(e){
        if(e.target.value === "none"){
            let filteredData = allItems[0].filter(i => i.category_name === category) 
            dispatch(itemsToDisplay(filteredData))
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
            if(category != ""){
                let filteredData = data.filter(i => i.category_name === category)
                dispatch(itemsToDisplay(filteredData))
            }else{
                dispatch(itemsToDisplay(data))
            }
           
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
            <select name="categories" className='dropdown' onChange={categoryFilter} >
                <option value="none"> Filter by category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
            </select>        
            {console.log('display',items)}   
        </div>
    )
}

export default Filters;