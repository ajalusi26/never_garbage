import React from "react";
import {useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import NavContent from '../Navbar/NavContent'
function ItemPage(){

    useEffect(()=>{
        fetch(`items/${localStorage.getItem('item')}`)
        .then(r => r.json())
        .then(data => console.log(data))
    }, [])

    return(
       <>
       <NavContent/>
       </>
    )
}

export default ItemPage;