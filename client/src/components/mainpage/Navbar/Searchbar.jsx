import React from "react";
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { itemsToDisplay } from '../../../redux/itemSlice';
import './Searchbar.css'


function Searchbar(){

    const dispatch = useDispatch()
    let allItems = useSelector((state) => state.items.items)
    const [searchText, setSearchText] = useState('')

    function search(){
        let searchResults = []
        allItems[0].map(i => i["name"].toLowerCase().includes(searchText.toLowerCase()) ? searchResults.push(i) : "" )
        
        dispatch(itemsToDisplay(searchResults))
        setSearchText("")   
    }
    return(
        <div className="nav">
                <span className="searchbar-holder" >
                <input className="search" type="text" placeholder="search" size="50" value={searchText} onChange={(e)=> setSearchText(e.target.value)}></input>
                <button className='search-bttn' onClick={search}> Search</button>
                </span>
            </div>
    )

}

export default Searchbar

