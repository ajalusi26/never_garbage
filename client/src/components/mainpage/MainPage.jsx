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
    const [zipcode, setZipcode] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('is_logged_in',)
        .then(r => r.json())
        .then(data => {
            if(data.name){
                dispatch(userAdded(data))
                navigator.geolocation.getCurrentPosition(function(position){
                    fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude + '&key=AIzaSyAhjCcVMhl4Sc6MMootJ--iyHifcJcwBX8')
                    .then(r=> r.json())
                    .then(data => setZipcode(data.results[0].address_components[7].long_name))
                })
                
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