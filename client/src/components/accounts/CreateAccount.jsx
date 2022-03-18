import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function CreateAccount(){
    const [loaded, setLoaded] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
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
            }
        })
    }, [])

    function createAccount(e){
        e.preventDefault()
        let data = {
            name: username, 
            email: email, 
            password: password
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