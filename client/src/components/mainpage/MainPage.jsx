import React from "react"
import {useState, useEffect} from 'react'
import {fetchItems, userAdded} from '../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
//Components
import Navbar from './Navbar/Navbar'
import ItemContainer from './Content/ItemContainer'
//CSS
import './MainPage.css'


function MainPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        fetch('is_logged_in',)
        .then(r => r.json())
        .then(data => {
            if(data.name){
                dispatch(userAdded(data))
            }else{
                navigate('/')
            }
        })
    })

    return (
        <>
        <Navbar/>
        <div className="app">
           <ItemContainer/>
        </div>
        </>
    )
}

export default MainPage