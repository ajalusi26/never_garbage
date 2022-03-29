import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function CreateAccount(){
    const [loaded, setLoaded] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [zip, setZip] = useState("")
    const [state, setState] = useState('')
    const [city, setCity] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/is_logged_in')
        .then(r => r.json())
        .then(data => {
            if(data.username){
                setLoaded(false)
                navigate('/main-page')
            }else{
                setLoaded(true)
                navigator.geolocation.getCurrentPosition(function(position){
                    fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude + '&key=AIzaSyAhjCcVMhl4Sc6MMootJ--iyHifcJcwBX8')
                    .then(r=> r.json())
                    .then(data => {
                        setCity(data.results[0].address_components[data.results[0].address_components.length - 5 ].long_name)
                        setState(data.results[0].address_components[data.results[0].address_components.length - 3 ].short_name)
                        setZip(data.results[0].address_components[data.results[0].address_components.length - 1 ].long_name)
                    })
                })      
            }
        })
    }, [])

    function createAccount(e){
        e.preventDefault()
        
        navigator.geolocation.getCurrentPosition(function(position){
            fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude + '&key=AIzaSyAhjCcVMhl4Sc6MMootJ--iyHifcJcwBX8')
            .then(r=> r.json())
            .then(data => {
                setZip(data.results[0].address_components[data.results[0].address_components.length - 1 ].long_name)
            })
        })      
        
        let data = {
            name: username, 
            email: email, 
            password: password,
            zipcode: zip, 
            state: state, 
            city: city
        }

        fetch('/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            if(data.errors){   
                    let liList = document.querySelectorAll('li')
                    liList.forEach(li => li.remove())
                    data.errors.forEach(error => {
                        let li = document.createElement('li')
                        li.className = 'errors'
                        li.textContent = error
                        document.querySelector('ul').appendChild(li)
                    })
                    setErrorMessage(true)
            }else{
                navigate('/main-page')
            }
        })
    }

    if(loaded){
        return(
            <div className="wrapper">
            <div className="login-container">
                <h2 >Create Account</h2>
                <form >
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                   
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                 
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button type="submit" className='button-login' onClick={createAccount}>Create </button>
                    <br></br>
                    <br></br>
                    <ul className='errors-holder'></ul>
                    <br></br>
                    <Link to={"/"} className="create-account">ALready have an account? Click here to Sign in</Link>
    
                </form>
            </div>
            <ul className="bg-bubbles"> </ul>
            </div>
        )
    }else{return(
        <div className="wrapper"></div>
    )}
   

}

export default CreateAccount