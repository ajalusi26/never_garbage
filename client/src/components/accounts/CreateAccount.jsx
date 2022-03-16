import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function CreateAccount(){
    const [loaded, setLoaded] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
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

    if(loaded){
        return(
            <div className="wrapper">
            <div className="login-container">
                <h2 >Create Account</h2>
                <form >
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                   
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                 
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button type="submit" className='button-login'>Create </button>
                    <br></br>
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