import './Accounts.css'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://127.0.0.1:3000/is_logged_in')
        .then(r => r.json())
        .then(data => {
            if(data.username){
                navigate('/main-page')
                console.log(data)
            }else{
                setLoaded(true)
               console.log(data)
            }
        })
    }, [])


    if (loaded){
        return(
            <div className="wrapper">
            <div className="login-container">
                <h2 >Sign in</h2>
                <form >
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <br></br>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button type="submit" >Login</button>
                    <Link to={"/create-account"} className="link">Dont have an account? Click here to create one!</Link>
                </form>
            </div>
            </div>
        )
    }else {return(<></>)}
}

export default Login