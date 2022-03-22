import React from "react"
import {useState, useEffect} from 'react'
import {fetchItems, userAdded, zipAdded} from '../../redux/itemSlice'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
//Components
import Navbar from './Navbar/Navbar'
import ItemContainer from './Content/ItemContainer'
import Filters from './Navbar/Filters'
//CSS
import './MainPage.css'


function MainPage(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('is_logged_in',)
        .then(r => r.json())
        .then(data => {
            if(data){
                dispatch(userAdded(data))
                navigator.geolocation.getCurrentPosition(function(position){
                    fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude + '&key=AIzaSyAhjCcVMhl4Sc6MMootJ--iyHifcJcwBX8')
                    .then(r=> r.json())
                    .then(data => {
                        dispatch(zipAdded(data.results[0].address_components[data.results[0].address_components.length - 1 ].long_name))
                        console.log(data.results[0].address_components[data.results[0].address_components.length - 1 ].long_name)
                    })
                })      
            }else{
                navigate('/')
            }
        })
    }, [])

    return (
        <>
        <Navbar/>
        <div className="app">
            <Filters/>
           <ItemContainer/>
        </div>
        </>
    )
}

export default MainPage